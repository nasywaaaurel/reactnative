import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert, Clipboard, RefreshControl, SectionList,
    StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LokasiScreen() {

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

    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');

    const router = useRouter();

    const handleCopy = (coordinates) => {
        Clipboard.setString(coordinates);
        Alert.alert("Tersalin", `Koordinat ${coordinates} telah disalin.`);
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Hapus Lokasi",
            "Apakah Anda yakin ingin menghapus lokasi ini?",
            [
                { text: "Batal", style: "cancel" },
                { text: "Hapus", onPress: () => { remove(ref(db, `points/${id}`)); }, style: "destructive" }
            ]
        );
    }

    const handleEdit = (item) => {
        router.push({
            pathname: "/formeditlocation",
            params: {
                id: item.id,
                name: item.name,
                coordinates: item.coordinates,
                accuration: item.accuration || ''
            }
        });
    };

    useEffect(() => {
        const pointsRef = ref(db, 'points/');
        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pointsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                const formattedData = [{ title: 'Lokasi Tersimpan', data: pointsArray }];
                setSections(formattedData);
            } else {
                setSections([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); }, 1000);
    }, []);

    if (loading) {
        return (
            <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#133754ff" />
            </ThemedView>
        );
    }

    const filteredSections = sections.map(section => ({
        ...section,
        data: section.data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    }));

    return (
        <ThemedView style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder="Cari lokasi..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#999"
            />
            {filteredSections[0].data.length > 0 ? (
                <SectionList
                    sections={filteredSections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <FontAwesome5
                                    name={item.type === 'kuliner' ? 'utensils' : 'landmark'}
                                    size={28}
                                    color={item.type === 'kuliner' ? '#8e44ad' : '#133754ff'}
                                    style={styles.icon}
                                />
                                <View style={{ flex: 1 }}>
                                    <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                    <TouchableOpacity onPress={() => handleCopy(item.coordinates)}>
                                        <ThemedText style={styles.coordinates}>{item.coordinates}</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity onPress={() => handleEdit(item)} style={[styles.actionButton, { backgroundColor: '#ffd580' }]}>
                                        <FontAwesome5 name="pencil-alt" size={18} color="#133754ff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionButton, { backgroundColor: '#ff6b6b' }]}>
                                        <FontAwesome5 name="trash" size={18} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <ThemedText style={styles.header}>{title}</ThemedText>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#133754ff" />
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ThemedText>Tidak ada data lokasi tersimpan.</ThemedText>
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1b6ceff' },
    searchBox: {
        height: 45,
        margin: 12,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#f1f1f1',
        fontSize: 16,
        elevation: 2,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#133754ff',
        color: '#f1b6ceff',
        paddingVertical: 12,
        marginHorizontal: 12,
        borderRadius: 8,
        marginTop: 12,
        overflow: 'hidden'
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardContent: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: 12 },
    itemName: { fontSize: 18, fontWeight: 'bold', color: '#133754ff', marginBottom: 2 },
    coordinates: { color: '#555', fontSize: 14 },
    buttonGroup: { flexDirection: 'row', marginLeft: 8 },
    actionButton: { padding: 8, borderRadius: 50, marginLeft: 8 },
});
