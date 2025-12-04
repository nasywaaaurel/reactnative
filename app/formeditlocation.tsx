import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import { Picker } from '@react-native-picker/picker';

const App = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id, name: initialName, coordinates: initialCoordinates, accuration: initialAccuration, type: initialType, openHour: initialOpenHour, description: initialDescription } = params;

    const [name, setName] = useState(initialName);
    const [location, setLocation] = useState(initialCoordinates);
    const [accuration, setAccuration] = useState(initialAccuration);
    const [type, setType] = useState(initialType || 'wisata');
    const [openHour, setOpenHour] = useState(initialOpenHour || '');
    const [description, setDescription] = useState(initialDescription || '');

    // Get current location
    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        const coords = loc.coords.latitude + ',' + loc.coords.longitude;
        setLocation(coords);
        setAccuration(loc.coords.accuracy + ' m');
    };

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

    const createOneButtonAlert = (callback) =>
        Alert.alert('Success', 'Berhasil memperbarui data', [
            { text: 'OK', onPress: callback },
        ]);

    const handleUpdate = () => {
        if (!id) {
            Alert.alert("Error", "ID lokasi tidak ditemukan.");
            return;
        }
        const pointRef = ref(db, `points/${id}`);
        update(pointRef, {
            name,
            coordinates: location,
            accuration,
            type,
            openHour,
            description
        }).then(() => {
            createOneButtonAlert(() => {
                router.back();
            });
        }).catch((e) => {
            console.error("Error updating document: ", e);
            Alert.alert("Error", "Gagal memperbarui data");
        });
    };

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Screen options={{ title: 'Edit Lokasi' }} />
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <Text style={styles.inputTitle}>Nama</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Isikan nama objek'
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.inputTitle}>Deskripsi</Text>
                    <TextInput
                        style={styles.inputSmall}
                        placeholder="Deskripsi singkat"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <Text style={styles.inputTitle}>Jam Buka</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="08.00 - 17.00"
                        value={openHour}
                        onChangeText={setOpenHour}
                    />

                    <Text style={styles.inputTitle}>Koordinat</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-6.200000,106.816666"
                        value={location}
                        onChangeText={setLocation}
                    />

                    <Text style={styles.inputTitle}>Akurasi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="contoh: 5 meter"
                        value={accuration}
                        onChangeText={setAccuration}
                    />

                    <Text style={styles.inputTitle}>Tipe</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                            style={styles.picker}
                            itemStyle={{ fontSize: 14 }}
                        >
                            <Picker.Item label="Wisata" value="wisata" />
                            <Picker.Item label="Kuliner" value="kuliner" />
                        </Picker>
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Get Current Location"
                            onPress={getCoordinates}
                            color="#570a0aff"
                        />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Save Changes"
                            onPress={handleUpdate}
                            color="#570a0aff"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
        marginTop: 8,
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
    },
    inputSmall: {
        height: 60,
        marginHorizontal: 12,
        marginTop: 8,
        borderWidth: 1,
        padding: 8,
        borderRadius: 12,
    },
    inputTitle: {
        marginLeft: 12,
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
    },
    pickerContainer: {
        marginHorizontal: 12,
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    pickerSmall: {
        height: 35,
        width: '100%',
    },
    button: {
        margin: 12,
        borderRadius: 15,
    },
});

export default App;
