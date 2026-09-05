# Modal (İlan Detay Penceresi)

> **Özet:** [[Ilanlar]] sayfasına özgü, bir ilan kartına tıklandığında açılan tam ekran karartmalı detay penceresidir; ana görsel, galeri thumbnail'leri ve ilan özelliklerini gösterir. Sitede modal deseni sadece bu sayfada kullanılır.
> **Kütüphaneler:** HTML5, CSS3 (`position:fixed`, flexbox ile ortalama), Vanilla JavaScript.
> **Bağlantılar:** [[Kart_Bileseni]], [[Ilanlar]], [[Iletisim]], [[LocalStorage_Semasi]], [[Tasarim_Sistemi]]

## Yapı ve Davranış

- Varsayılan `display:none`; `openModal(index)` çağrılınca
  `display:flex` yapılarak `rgba(0,0,0,0.8)` karartma zemini üzerinde
  ortalanır.
- İçerik: başlık, fiyat, ana görsel (`#mMainImg`), galeri thumbnail şeridi
  (`#mThumbs`), 2x2 detay grid'i (kategori/tip/konum/oda sayısı) ve
  [[Iletisim]]'e giden "Bu İlan İçin İletişime Geçin" butonu.
- `changeMainImg(url, el)` — bir thumbnail'e tıklanınca ana görseli
  değiştirir ve `.active` sınıfını günceller.
- `closeModal()` — `.close-btn` (×) tıklanınca `display:none` yaparak
  kapatır.

## Veri Bağımlılığı

Modal içeriği [[Ilanlar]] sayfasındaki `properties` dizisinden
(`localStorage['remax_properties']` veya `defaultProperties` fallback'i —
bkz. [[LocalStorage_Semasi]]) doldurulur; kendi başına bir veri kaynağı
yoktur.

## Kısıtlar

- Klavye ile kapatma (Escape tuşu) veya dış alana tıklayınca kapatma
  desteklenmiyor — sadece `.close-btn`'e tıklanarak kapatılabilir.
- URL'e state yansıtılmıyor (modal açıkken sayfa yenilenirse modal kaybolur,
  ilan linki paylaşılamaz).
