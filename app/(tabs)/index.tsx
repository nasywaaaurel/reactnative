import { Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

// ======================
// IMPORT FONT GOOGLE
// ======================
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import {
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) return null;

  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ecdde7ff', dark: '#13282eff' }}
      headerImage={
        <Image
          source={require('@/assets/images/headerr.png')}
          style={styles.headerImage}
        />
      }
    >
      {/* Hero Section */}
      <ThemedView style={styles.heroContainer}>
        <Image
          source={require('@/assets/images/headerr.png')}
          style={styles.heroBackground}
          resizeMode="cover"
        />
        <ThemedView style={styles.heroOverlay} />
        <ThemedView style={styles.heroContent}>

          <ThemedText type="title" style={styles.heroTitle}>
            YUK JELAJAH SEMARANG !
          </ThemedText>

          <ThemedText type="subtitle" style={styles.heroSubtitle}>
            Temukan destinasi budaya, wisata, dan kuliner terbaik
          </ThemedText>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/mapwebview')}
          >
            <ThemedText style={styles.heroButtonText}>Mulai Eksplorasi</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* SECTION DESKRIPSI SEMARANG */}
      <ThemedView style={styles.descContainer}>
        <ThemedText type="subtitle" style={styles.descTitle}>
          Selamat Datang di Kota Semarang !
        </ThemedText>
        <ThemedText style={styles.descText}>
          Semarang adalah kota bersejarah yang memadukan pesona budaya, arsitektur kolonial,
          serta kekayaan kuliner yang unik. Dari megahnya Lawang Sewu hingga suasana klasik
          Kota Lama, setiap sudut menghadirkan pengalaman berbeda yang sayang untuk dilewatkan.
        </ThemedText>
        <ThemedText style={styles.descText}>
          Jelajahi keindahan alam, situs budaya, wisata religius, hingga kuliner legendaris
          seperti lumpia dan tahu gimbal. Aplikasi ini membantu Anda menemukan destinasi-destinasi
          terbaik di Semarang secara mudah dan interaktif.
        </ThemedText>
      </ThemedView>

      {/* Preview Destinasi */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Tempat Wisata Populer
        </ThemedText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewScroll}>
          <ThemedView style={styles.card}>
            <Image source={require('@/assets/images/lawangsewu.jpg')} style={styles.cardImage} />
            <ThemedText style={styles.cardTitle}>Lawang Sewu</ThemedText>
          </ThemedView>
          <ThemedView style={styles.card}>
            <Image source={require('@/assets/images/sampookong.jpg')} style={styles.cardImage} />
            <ThemedText style={styles.cardTitle}>Sampookong</ThemedText>
          </ThemedView>
          <ThemedView style={styles.card}>
            <Image source={require('@/assets/images/kotalama.jpg')} style={styles.cardImage} />
            <ThemedText style={styles.cardTitle}>Kota Lama</ThemedText>
          </ThemedView>
          <ThemedView style={styles.card}>
            <Image source={require('@/assets/images/gedongsongo.jpg')} style={styles.cardImage} />
            <ThemedText style={styles.cardTitle}>Candi Gedongsongo</ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>

      {/* SECTION EVENT TERDEKAT */}
      <ThemedView style={styles.eventContainer}>
        <ThemedText type="subtitle" style={styles.eventTitle}>
          Event Terdekat: Gelegar Malam Tahun Baru 2025
        </ThemedText>

        <ThemedView style={styles.eventCard}>
          <Image
            source={require('@/assets/images/fireworks.jpg')}
            style={styles.eventImage}
          />
          <ThemedView style={styles.eventContent}>
            <ThemedText style={styles.eventSubtitle}>
              31 Desember 2025
            </ThemedText>
            <ThemedText style={styles.eventDescription}>
              Rayakan malam pergantian tahun dengan kembang api, live music, dan festival
              kuliner di tiga lokasi spesial di Kota Semarang: Awancosta POJ City, Pantai Marina,
              dan Bukit Gombel. Nikmati suasana meriah dan panorama malam tahun baru yang tak terlupakan.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 400,
    height: 215,
    bottom: 0,
    left: -25,
    position: 'absolute',
  },
  heroContainer: {
    height: 150,
    position: 'relative',
    marginBottom: 0,
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ecdde7ff',
    textAlign: 'center',
    marginBottom: 3,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#a4c4d2ff',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins_500Medium',
  },
  heroButton: {
    backgroundColor: '#f1b6ceff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 10,
  },
  previewScroll: {
    paddingLeft: 10,
  },
  card: {
    width: 160,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f1b6ceff',
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 100 },
  cardTitle: { fontWeight: 'bold', textAlign: 'center', padding: 4 },
  descContainer: {
    backgroundColor: '#133754ff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 12,
  },
  descTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8, textAlign: 'center' },
  descText: { color: '#fff', fontSize: 14, lineHeight: 20, textAlign: 'justify', marginBottom: 8 },
  eventContainer: {
    backgroundColor: '#133754ff',
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  eventTitle: {
    color: '#f1b6ceff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  eventCard: { backgroundColor: '#f1b6ceff', borderRadius: 14, overflow: 'hidden' },
  eventImage: { width: '100%', height: 180, resizeMode: 'cover', opacity: 0.9 },
  eventContent: { padding: 12 },
  eventSubtitle: { color: '#f1b6ceff', fontWeight: '700', fontSize: 15, marginBottom: 6 },
  eventDescription: { color: '#f1b6ceff', fontSize: 14, lineHeight: 19, textAlign: 'justify' },
});
