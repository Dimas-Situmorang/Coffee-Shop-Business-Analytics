# Coffee Shop Business Analytics Dashboard

Dashboard interaktif untuk menganalisis performa bisnis coffee shop berdasarkan data transaksi penjualan. Project ini berfokus pada **Data Analytics** dan **Business Intelligence**, dengan tujuan mengubah data transaksi mentah menjadi insight bisnis yang mudah dipahami oleh owner atau pengambil keputusan.

Project ini dibuat menggunakan **Next.js, TypeScript, Tailwind CSS, shadcn/ui-style components, Recharts, Python, dan Pandas**.

---

## Ringkasan Project

Coffee shop memiliki pola penjualan yang sangat dipengaruhi oleh waktu, produk, kategori, dan lokasi cabang. Tanpa analisis data yang rapi, owner sering mengambil keputusan berdasarkan intuisi, bukan berdasarkan pola penjualan yang sebenarnya.

Dashboard ini dibuat untuk membantu menjawab pertanyaan bisnis seperti:

* Bagaimana tren revenue coffee shop dari Januari sampai Juni 2023?
* Produk dan kategori apa yang paling berkontribusi terhadap revenue?
* Jam berapa penjualan paling ramai?
* Cabang mana yang memiliki performa terbaik?
* Insight apa yang bisa digunakan untuk mendukung keputusan operasional?

Project ini **tidak membahas Machine Learning atau forecasting**. Fokus utama project ini adalah visualisasi data, analisis bisnis, dan penyajian insight melalui dashboard interaktif.

---

## Sumber Dataset

Dataset yang digunakan adalah **Coffee Shop Sales** dari Maven Analytics Data Playground.

Sumber dataset:
https://mavenanalytics.io/data-playground/coffee-shop-sales

Dataset ini berisi data transaksi dari **Maven Roasters**, yaitu coffee shop fiktif dengan tiga lokasi cabang di New York City. Data mencakup informasi transaksi, tanggal, waktu, lokasi toko, produk, kategori produk, jumlah item terjual, dan harga satuan.

---

## Informasi Dataset

| Keterangan     | Detail                                              |
| -------------- | --------------------------------------------------- |
| Nama Dataset   | Coffee Shop Sales                                   |
| Sumber         | Maven Analytics Data Playground                     |
| Domain Bisnis  | Food & Beverage / Retail                            |
| Periode Data   | Januari 2023 - Juni 2023                            |
| Jumlah Data    | 149.116 transaksi                                   |
| Jumlah Kolom   | 11 kolom                                            |
| Jumlah Cabang  | 3 lokasi                                            |
| Fokus Analisis | Penjualan, produk, kategori, cabang, dan pola waktu |

---

## Kolom Dataset

Dataset awal memiliki kolom utama sebagai berikut:

| Kolom              | Keterangan               |
| ------------------ | ------------------------ |
| `transaction_id`   | ID unik transaksi        |
| `transaction_date` | Tanggal transaksi        |
| `transaction_time` | Waktu transaksi          |
| `transaction_qty`  | Jumlah item yang terjual |
| `store_id`         | ID cabang                |
| `store_location`   | Lokasi cabang            |
| `product_id`       | ID produk                |
| `unit_price`       | Harga satuan produk      |
| `product_category` | Kategori produk          |
| `product_type`     | Tipe produk              |
| `product_detail`   | Nama/detail produk       |

---

## Tujuan Analisis

Tujuan utama dari project ini adalah membangun dashboard Business Intelligence yang dapat membantu owner coffee shop memahami kondisi bisnis secara cepat dan jelas.

Analisis difokuskan pada beberapa area utama:

1. **Revenue Analysis**
   Melihat tren revenue dari bulan ke bulan.

2. **Product Performance Analysis**
   Mengidentifikasi produk dengan kontribusi revenue dan quantity terbesar.

3. **Category Analysis**
   Mengetahui kategori produk yang menjadi revenue driver.

4. **Store Performance Analysis**
   Membandingkan performa revenue antar cabang.

5. **Time Pattern Analysis**
   Menganalisis jam dan hari dengan penjualan tertinggi.

6. **Business Insight Storytelling**
   Mengubah hasil analisis menjadi rekomendasi bisnis yang mudah dipahami.

---

## Masalah Bisnis

Owner coffee shop sering menghadapi tantangan seperti:

* Sulit mengetahui produk mana yang benar-benar mendorong revenue.
* Tidak mengetahui jam operasional yang paling penting.
* Kesulitan membandingkan performa antar cabang.
* Pengambilan keputusan stok, promosi, dan operasional masih berdasarkan intuisi.
* Data transaksi tersedia, tetapi belum diolah menjadi insight bisnis.

Dashboard ini membantu menyelesaikan masalah tersebut dengan menyajikan data dalam bentuk visual yang lebih mudah dibaca dan dipakai untuk pengambilan keputusan.

---

## Dampak Bisnis

Dashboard ini dapat membantu owner coffee shop untuk:

* Memantau total revenue, jumlah transaksi, quantity terjual, dan average order value.
* Mengidentifikasi kategori dan produk dengan kontribusi terbesar terhadap revenue.
* Mengetahui jam penjualan paling ramai untuk mendukung pengaturan shift dan persiapan operasional.
* Membandingkan performa setiap cabang secara objektif.
* Menentukan produk prioritas untuk display menu, bundling, promosi, dan pengelolaan stok.
* Mengubah data transaksi menjadi insight bisnis yang praktis dan mudah dipahami.

---

## Insight Utama

Beberapa insight utama dari hasil analisis:

1. **Revenue mengalami pertumbuhan kuat dari Januari sampai Juni 2023.**
   Hal ini menunjukkan adanya momentum pertumbuhan bisnis selama periode analisis.

2. **Coffee dan Tea menjadi kategori utama penyumbang revenue.**
   Dua kategori ini perlu menjadi prioritas dalam kualitas produk, ketersediaan bahan, dan strategi menu.

3. **Jam pagi menjadi periode penjualan yang sangat penting.**
   Penjualan tertinggi terjadi pada jam operasional pagi, sehingga persiapan bahan, produk, dan karyawan perlu dilakukan sebelum peak hour.

4. **Performa antar cabang relatif seimbang.**
   Ketiga cabang memiliki kontribusi revenue yang tidak terlalu jauh, sehingga setiap cabang tetap memiliki peran penting terhadap performa bisnis secara keseluruhan.

---

## Tools dan Teknologi

### Data Preparation

| Tools           | Fungsi                                                              |
| --------------- | ------------------------------------------------------------------- |
| Microsoft Excel | Format awal dataset dan inspeksi awal                               |
| Python          | Pemrosesan data                                                     |
| Pandas          | Cleaning, transformasi, agregasi, dan pembuatan data siap dashboard |
| JSON            | Format data akhir yang digunakan oleh dashboard                     |
| CSV             | Format pendukung untuk hasil agregasi data                          |

### Dashboard Development

| Tools                      | Fungsi                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| Next.js                    | Framework React untuk membangun dashboard                        |
| TypeScript                 | Membantu penulisan kode frontend yang lebih aman dan terstruktur |
| Tailwind CSS               | Styling dan layout responsif                                     |
| shadcn/ui-style components | Komponen UI seperti card, tabs, button, dan layout dashboard     |
| Recharts                   | Visualisasi data interaktif                                      |
| Lucide React               | Ikon dashboard                                                   |
| GitHub                     | Version control dan dokumentasi project                          |

---

## Proses Analisis Data

Alur pengerjaan project ini adalah sebagai berikut:

### 1. Data Understanding

Memahami struktur dataset, jumlah transaksi, periode data, kolom yang tersedia, lokasi cabang, kategori produk, dan detail transaksi.

### 2. Data Cleaning

Melakukan pengecekan terhadap:

* Missing value
* Duplicate data
* Format tanggal
* Format waktu
* Kolom numerik
* Konsistensi nama produk dan kategori

### 3. Feature Engineering

Membuat kolom tambahan untuk kebutuhan analisis:

* `revenue`
* `month`
* `month_label`
* `weekday`
* `hour`
* `hour_label`

Kolom `revenue` dihitung dengan rumus:

```text
revenue = transaction_qty × unit_price
```

### 4. Data Aggregation

Data transaksi mentah diolah menjadi beberapa agregasi utama:

* Revenue bulanan
* Revenue per kategori
* Revenue per cabang
* Revenue per jam
* Revenue per hari
* Ranking produk berdasarkan revenue
* Ranking produk berdasarkan quantity
* Heatmap hari dan jam penjualan

### 5. Dashboard Development

Data hasil olahan dikonversi ke format `dashboard-data.json`, lalu digunakan oleh dashboard Next.js untuk menampilkan KPI, grafik, tabel, filter, dan insight bisnis.

### 6. Business Insight Interpretation

Hasil visualisasi diterjemahkan menjadi insight dan rekomendasi bisnis yang lebih mudah dipahami oleh owner coffee shop.

---

## Fitur Dashboard

Dashboard terdiri dari beberapa halaman/tab utama:

### 1. Tentang Dataset

Menjelaskan sumber dataset, latar belakang analisis, alasan pemilihan dataset, tujuan analisis, dan batasan scope project.

### 2. Ringkasan

Menampilkan KPI utama seperti:

* Total revenue
* Total transaksi
* Total produk terjual
* Average order value
* Tren revenue bulanan
* Revenue per kategori
* Revenue per cabang

### 3. Pola Penjualan

Menganalisis pola penjualan berdasarkan waktu:

* Revenue per jam
* Revenue per hari
* Heatmap hari dan jam ramai

### 4. Produk

Menampilkan performa produk berdasarkan:

* Top produk by revenue
* Top produk by quantity
* Revenue share produk
* Kategori produk
* Tipe produk

### 5. Cabang

Membandingkan performa tiga lokasi cabang berdasarkan:

* Total revenue
* Jumlah transaksi
* Average order value
* Kontribusi revenue setiap cabang
* Kategori dominan per cabang

### 6. Insight Bisnis

Merangkum insight utama dan rekomendasi keputusan seperti:

* Prioritas kategori Coffee dan Tea
* Penguatan operasional jam pagi
* Pemanfaatan produk terlaris untuk bundling dan promosi
* Perbandingan performa antar cabang

---

## Struktur Project

```text
coffee-shop-bi-dashboard-final/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── tabs.tsx
│
├── data/
│   ├── dashboard-data.json
│   └── raw/
│       └── Coffee Shop Sales.xlsx
│
├── lib/
│   └── utils.ts
│
├── scripts/
│   └── prepare_data.py
│
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/username/coffee-shop-business-analytics-dashboard.git
cd coffee-shop-business-analytics-dashboard
```

Ganti `username` dengan username GitHub kamu.

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser:

```text
http://localhost:3000
```

### 4. Build Project

```bash
npm run build
```

Jika build berhasil, project siap untuk di-deploy.

---

## Cara Menjalankan Data Preparation

Project ini juga menyediakan script Python untuk memproses dataset mentah menjadi file JSON yang digunakan oleh dashboard.

### 1. Install Dependency Python

```bash
pip install pandas openpyxl
```

### 2. Pastikan Dataset Mentah Ada

Simpan file dataset mentah di:

```text
data/raw/Coffee Shop Sales.xlsx
```

### 3. Jalankan Script

```bash
python scripts/prepare_data.py
```

Script ini akan menghasilkan atau memperbarui file:

```text
data/dashboard-data.json
```

---

## Batasan Project

Project ini memiliki beberapa batasan agar scope tetap jelas:

### Termasuk dalam scope

* Data cleaning
* Data transformation
* Data aggregation
* KPI dashboard
* Visualisasi data
* Business insight
* Rekomendasi keputusan bisnis berbasis analisis deskriptif

### Tidak termasuk dalam scope

* Machine Learning
* Forecasting
* Prediksi stok
* Inventory recommendation
* Backend database
* Real-time data pipeline

Forecasting dan rekomendasi stok sengaja dipisahkan menjadi project kedua agar portfolio lebih terstruktur dan tidak mencampur project Data Analytics dengan Machine Learning.

---

## Hasil Akhir

Hasil akhir dari project ini adalah dashboard interaktif yang membantu memahami performa bisnis coffee shop melalui visualisasi dan insight bisnis.

Dashboard ini menunjukkan kemampuan dalam:

* Membersihkan dan mengolah data transaksi
* Membuat agregasi data bisnis
* Mendesain KPI dan visualisasi interaktif
* Menggunakan dashboard untuk storytelling
* Mengubah data menjadi rekomendasi keputusan bisnis

---

## Kesimpulan

Project ini menunjukkan bagaimana data transaksi coffee shop dapat diolah menjadi dashboard Business Intelligence yang informatif dan mudah digunakan. Dengan visualisasi yang rapi dan insight yang jelas, owner coffee shop dapat lebih mudah memahami performa bisnis, menentukan produk prioritas, melihat pola jam ramai, dan mengambil keputusan operasional berbasis data.
