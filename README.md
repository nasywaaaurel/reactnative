# <p align="center">EXPLORE SEMARANG</p>

## 📝 Deskripsi Produk
Explore Semarang merupakan aplikasi mobile yang dirancang untuk memudahkan masyarakat maupun wisatawan dalam menemukan berbagai lokasi menarik di Kota Semarang, seperti tempat wisata, kuliner, ruang publik, serta event yang sedang berlangsung. Aplikasi ini menyajikan informasi lokasi dalam bentuk daftar dan peta interaktif, sehingga pengguna dapat menjelajahi kota dengan lebih mudah, cepat, dan informatif.

Explore Semarang menyediakan beberapa fitur utama, di antaranya:
- Menampilkan lokasi wisata dan kuliner dalam bentuk daftar serta marker pada peta interaktif
- Menampilkan event terdekat pada halaman beranda
- Menyediakan detail informasi lengkap untuk setiap lokasi
- Menyediakan fitur heatmap untuk mengetahui kepadatan lokasi
- Menandai lokasi favorit pengguna
- Menampilkan rute menuju lokasi menggunakan Google Maps
- Sistem Active Layer pada peta (memilih layer Wisata / Kuliner)
- Pencarian lokasi berdasarkan nama tempat

Produk ini ditujukan untuk mempermudah eksplorasi Kota Semarang secara praktis, memberikan pengalaman navigasi yang nyaman, serta membantu pengguna menemukan tempat terbaik sesuai preferensi mereka.

## 🛠 Komponen Pembangun Produk

*Frontend / UI*

- React Native (untuk aplikasi mobile)
- Expo Router
- Komponen UI khusus (ThemedView, ThemedText, HapticTab)
- Leaflet JS melalui WebView untuk peta interaktif
- react-native-reanimated untuk animasi menu dan transisi halaman

*Backend / Database*

- Firebase Realtime Database untuk penyimpanan data wisata, kuliner, event, dan favorit pengguna
- Firebase Authentication (opsional) untuk pengelolaan identitas pengguna

*Fitur Khusus*

- Active Layer pada peta (Wisata / Kuliner)
- Fitur Heatmap
- Bookmark / Favorite lokasi
- Popup marker yang menampilkan detail ringkas
- Navigasi langsung ke Google Maps
- Event Terdekat di halaman beranda
- Pencarian lokasi berdasarkan nama

## 📊 Sumber Data

- Data lokasi wisata: Google Maps
- Data kuliner: Google Maps
- Informasi detail lokasi: Website resmi wisata, Google, dan beberapa portal informasi Semarang

## 📸 Tangkapan Layar Komponen Penting Produk

<table>
  <tr>
    <td align="center"><b>Home</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/homee.jpg" width="300"/></td>
    <td align="center"><b>Explore</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/explore.jpg" width="300"/></td>
  </tr>
  <tr>
    <td align="center"><b>HeatMap</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/heatmapp.jpg" width="300"/></td>
    <td align="center"><b>Gmap API</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/rute.jpg" width="300"/></td>
  </tr>
  <tr>
    <td align="center"><b>Daftar Lokasi</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/list.jpg" width="300"/></td>
    <td align="center"><b>Bookmark</b><br><img src="https://github.com/nasywaaaurel/reactnative/blob/6dc900e0ca29ab98c192e266f86b1672a94939fe/bookmark.jpg" width="300"/></td>
  </tr>
</table>
