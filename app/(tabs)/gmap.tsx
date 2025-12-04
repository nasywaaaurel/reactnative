import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAu6V-Dhm83Df7ku-oD55yRDEli6WpjQAM",
    authDomain: "reactnative-2025-f08a8.firebaseapp.com",
    databaseURL: "https://reactnative-2025-f08a8-default-rtdb.firebaseio.com",
    projectId: "reactnative-2025-f08a8",
    storageBucket: "reactnative-2025-f08a8.firebasestorage.app",
    messagingSenderId: "916430534243",
    appId: "1:916430534243:web:865b31053b1afdf723aa56"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Google Maps API key untuk Directions
const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export default function MapScreen() {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);
    const mapRef = useRef(null);

    // Fetch markers dari Firebase
    useEffect(() => {
        const pointsRef = ref(db, 'points/');
        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedMarkers = Object.keys(data)
                    .map(key => {
                        const point = data[key];
                        if (!point.coordinates) return null;
                        const [latitude, longitude] = point.coordinates.split(',').map(Number);
                        if (isNaN(latitude) || isNaN(longitude)) return null;
                        return { id: key, name: point.name, latitude, longitude };
                    })
                    .filter(Boolean);
                setMarkers(parsedMarkers);
            } else {
                setMarkers([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Current location
    const goToCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
        setCurrentLocation(coords);
        mapRef.current.animateToRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 1000);
    };

    // Search marker dan zoom
    useEffect(() => {
        if (searchText.trim() === '') return;
        const match = markers.find(m => m.name.toLowerCase().includes(searchText.toLowerCase()));
        if (match && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: match.latitude,
                longitude: match.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }, 1000);
        }
    }, [searchText, markers]);

    // Pilih marker untuk multi-route
    const handleMarkerPress = (marker) => {
        // toggle marker selection
        const exists = routeCoords.find(c => c.latitude === marker.latitude && c.longitude === marker.longitude);
        if (exists) {
            setRouteCoords(prev => prev.filter(c => c !== exists));
        } else {
            setRouteCoords(prev => [...prev, { latitude: marker.latitude, longitude: marker.longitude }]);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading map data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: -6.9667,
                    longitude: 110.4167,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                zoomControlEnabled={true}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.name}
                        onPress={() => handleMarkerPress(marker)}
                        pinColor={routeCoords.some(c => c.latitude === marker.latitude && c.longitude === marker.longitude) ? 'blue' : 'red'}
                    />
                ))}

                {/* Multi-segment route */}
                {routeCoords.length > 1 && routeCoords.map((coord, index) => {
                    if (index === routeCoords.length - 1) return null;
                    return (
                        <MapViewDirections
                            key={index}
                            origin={routeCoords[index]}
                            destination={routeCoords[index + 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="blue"
                        />
                    );
                })}

                {currentLocation && (
                    <Marker
                        coordinate={currentLocation}
                        title="Lokasi Kamu"
                        pinColor="green"
                    />
                )}
            </MapView>

            <TextInput
                style={styles.searchBox}
                placeholder="Search marker..."
                value={searchText}
                onChangeText={setSearchText}
            />

            <TouchableOpacity style={styles.fab} onPress={goToCurrentLocation}>
                <FontAwesome name="location-arrow" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    fab: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#0275d8',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    searchBox: {
        position: 'absolute',
        top: 40,
        left: 12,
        right: 12,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 4,
    },
});
