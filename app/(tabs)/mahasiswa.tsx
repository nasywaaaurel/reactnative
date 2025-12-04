import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

interface BookmarkItem {
    id: string;
    name: string;
    type?: string;
    category?: string;
    openHour?: string;
    description?: string;
    coordinates?: string;
}

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = firebase.database().ref('/bookmarks');
        ref.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setBookmarks(list);
            } else setBookmarks([]);
            setLoading(false);
        });

        return () => ref.off();
    }, []);

    const deleteBookmark = (id: string, name: string) => {
        Alert.alert(
            "Hapus Bookmark",
            `Yakin ingin menghapus "${name}" dari bookmark?`,
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: () => firebase.database().ref(`/bookmarks/${id}`).remove()
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: BookmarkItem }) => {
        const isWisata = (item.type || '').toLowerCase() === 'wisata';
        return (
            <View style={[styles.item, { backgroundColor: isWisata ? '#133754ff' : '#f1b6ceff' }]}>
                <View style={styles.itemHeader}>
                    {isWisata ?
                        <FontAwesome5 name="landmark" size={20} color={isWisata ? '#fff' : '#133754ff'} style={{ marginRight: 8 }} /> :
                        <FontAwesome5 name="utensils" size={20} color={isWisata ? '#133754ff' : '#8b1a1a'} style={{ marginRight: 8 }} />
                    }
                    <Text style={[styles.itemName, { color: isWisata ? '#fff' : '#133754ff' }]}>{item.name}</Text>
                </View>
                {item.category && <Text style={[styles.category, { color: isWisata ? '#e0e0e0' : '#133754cc' }]}>Kategori: {item.category}</Text>}
                {item.openHour && <Text style={[styles.category, { color: isWisata ? '#e0e0e0' : '#133754cc' }]}>Jam Buka: {item.openHour}</Text>}
                {item.description && <Text style={[styles.category, { color: isWisata ? '#e0e0e0' : '#133754cc' }]} numberOfLines={2}>Deskripsi: {item.description}</Text>}
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteBookmark(item.id, item.name)}>
                    <FontAwesome name="trash" size={16} color="#fff" />
                    <Text style={{ color: '#fff', marginLeft: 6 }}>Hapus</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;

    const wisataBookmarks = bookmarks.filter(b => (b.type || '').toLowerCase() === 'wisata');
    const kulinerBookmarks = bookmarks.filter(b => (b.type || '').toLowerCase() === 'kuliner');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                <Text style={styles.title}>Bookmark</Text>
                <Text style={styles.subtitle}>Wishlist yang ingin dikunjungi</Text>

                {wisataBookmarks.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Wisata</Text>
                        <FlatList
                            data={wisataBookmarks}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            scrollEnabled={false}
                        />
                    </>
                )}

                {kulinerBookmarks.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Kuliner</Text>
                        <FlatList
                            data={kulinerBookmarks}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            scrollEnabled={false}
                        />
                    </>
                )}

                {wisataBookmarks.length === 0 && kulinerBookmarks.length === 0 && (
                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#555' }}>Belum ada bookmark.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#133754ff', marginBottom: 4 },
    subtitle: { fontSize: 16, color: '#555', marginBottom: 12 },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginVertical: 8 },
    item: {
        padding: 12,
        marginVertical: 6,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    itemName: { fontSize: 18, fontWeight: 'bold' },
    category: { fontSize: 14, marginBottom: 2 },
    deleteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9534f',
        paddingVertical: 6,
        borderRadius: 10,
        marginTop: 8
    }
});

export default Bookmark;
