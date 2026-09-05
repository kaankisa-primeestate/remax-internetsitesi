# Kurumsal & Ofisimiz (`kurumsal.html`)

Bkz. [[Home]], [[Mimari]], [[Tasarim_Sistemi]], [[Medya_Varliklari]].

## Amaç

Fiziksel ofisi tanıtan, tamamen statik (localStorage'a bağımlı olmayan) bir
galeri + "Hakkımızda" sayfası.

## Bölümler

1. Standart navbar (aktif link: "Kurumsal & Ofisimiz") + `.prime-banner`
   ("Ofisimiz & Prestijli Çalışma Alanımız").
2. **Galeri Grid** (`.gallery-grid`) — 6 sabit (hardcoded) görsel + başlık
   kartı: Resepsiyon, Lounge, Toplantı Masası, Açık Ofis, Kafe Bar,
   Dinlenme Alanı. Görseller depodaki `WhatsApp Image *.jpeg` dosyalarına
   doğrudan dosya adıyla referans veriyor (bkz. [[Medya_Varliklari]]).
3. **Hakkımızda Kutusu** (`.about-box`) — Bostancı Tavukçuoğlu İş Merkezi
   adresine ve ofis konseptine dair kısa açıklama metni.

## JS

Sadece `toggleMenu()`. Dinamik/`localStorage` verisi kullanılmıyor — bu
sayfadaki içerik tamamen HTML içine hardcoded.

## Not

Galeri görsellerinin dosya adları anlamsal değil (`WhatsApp Image
2026-08-23 at 16.36.19 (3).jpeg` gibi otomatik telefon dosya adları).
Görsellerden biri (`...16.36.19 (3).jpeg`) [[Ilanlar]] sayfasındaki
`defaultProperties` içinde de "Bostancı Sahilde Kiralık Prestijli Ofis"
ilanının kapak fotoğrafı olarak tekrar kullanılıyor — yani aynı dosya iki
farklı bağlamda (ofis resepsiyonu / ilan fotoğrafı) paylaşılıyor.
