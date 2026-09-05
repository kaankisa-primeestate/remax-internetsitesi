# Medya Varlıkları

> **Özet:** Depo kökünde, alt klasörsüz şekilde duran telefon kaynaklı görseller ve iki büyük reklam PNG'si, [[Kurumsal]], [[Ilanlar]] ve [[Danismanlar]] sayfalarında dosya adıyla doğrudan referans veriliyor. Bir kısmı hiçbir sayfada kullanılmıyor ve reklam görselleri optimize edilmemiş boyutta.
> **Kütüphaneler:** Yok — statik `.jpeg`/`.png`/`.mp4` dosyaları, herhangi bir görsel işleme/CDN kütüphanesi kullanılmıyor.
> **Bağlantılar:** [[Kart_Bileseni]], [[Kurumsal]], [[Ilanlar]], [[Danismanlar]]

Bkz. [[Index]], [[Kurumsal]], [[Ilanlar]], [[Danismanlar]].

Depo kökünde, telefon kaynaklı otomatik dosya adlarıyla (`WhatsApp Image
2026-08-23 at HH.MM.SS (n).jpeg`) 16 adet görsel, 1 adet video ve 2 adet
reklam PNG'si bulunuyor. Hiçbir `assets/` veya `images/` alt klasörü yok —
hepsi kök dizinde ve HTML dosyalarından **göreli dosya adıyla** (yol
olmadan) referans veriliyor.

## Kullanılan Görseller

| Dosya | Kullanıldığı Yer | Bağlam |
|---|---|---|
| `WhatsApp Image 2026-08-23 at 16.36.19 (3).jpeg` | [[Kurumsal]] (Resepsiyon) **ve** [[Ilanlar]] `defaultProperties` (Bostancı ofis ilanı kapak fotoğrafı) | Aynı dosya iki farklı bağlamda kullanılıyor |
| `WhatsApp Image 2026-08-23 at 16.36.20.jpeg` | [[Kurumsal]] (Lounge) | |
| `WhatsApp Image 2026-08-23 at 16.36.18.jpeg` | [[Kurumsal]] (Toplantı Masası) **ve** [[Ilanlar]] `defaultProperties` (Bağdat Cd. ilanı 2. fotoğraf) | Aynı dosya iki farklı bağlamda |
| `WhatsApp Image 2026-08-23 at 16.36.17 (3).jpeg` | [[Kurumsal]] (Açık Ofis) | |
| `WhatsApp Image 2026-08-23 at 16.36.18 (1).jpeg` | [[Kurumsal]] (Kafe Bar) | |
| `WhatsApp Image 2026-08-23 at 16.36.19.jpeg` | [[Kurumsal]] (Dinlenme Alanı) | |
| `WhatsApp Image 2026-08-23 at 16.36.18 (2).jpeg` | [[Ilanlar]] `defaultProperties` (Bağdat Cd. ilanı kapak fotoğrafı) | |
| `remax_prime_yeni_danisman_reklam_v2.png` | [[Danismanlar]] `defaultAgents` (Kaan Kısa profil fotoğrafı) | Aslında bir reklam görseli, profil fotoğrafı olarak yeniden kullanılmış |
| `remax_prime_deneyimli_danisman_reklam_v2.png` | [[Danismanlar]] `defaultAgents` (Alper Sarıalp profil fotoğrafı) | Aynı şekilde reklam görseli |

## Hiçbir HTML Dosyasından Referans Verilmeyen (Kullanılmayan) Dosyalar

Aşağıdaki dosyalar depo kökünde mevcut ama hiçbir `.html` dosyasında
`src=`/`image:`/`url()` olarak geçmiyor — muhtemelen ham/yedek materyal
veya ileride kullanılmak üzere bırakılmış:

- `WhatsApp Image 2026-08-23 at 16.36.14 (1).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.14.jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.16 (1).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.16 (2).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.16.jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.17 (1).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.17 (2).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.17.jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.19 (1).jpeg`
- `WhatsApp Image 2026-08-23 at 16.36.19 (2).jpeg`
- `WhatsApp Video 2026-08-23 at 16.36.20.mp4` (~2.5MB, hiçbir sayfada `<video>`/`<source>` etiketi yok)

## Boyut Notu

`remax_prime_*_reklam_v2.png` dosyaları sırasıyla ~6.5MB ve ~6.4MB —
sıkıştırılmamış/optimize edilmemiş ham PNG boyutunda ve profil fotoğrafı
olarak `<img>` ile doğrudan yükleniyor (herhangi bir `srcset`/lazy-loading/
sıkıştırma yok). Bu, sayfa yükleme performansını olumsuz etkileyebilir.
