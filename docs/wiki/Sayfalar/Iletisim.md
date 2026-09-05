# İletişim (`iletisim.html`)

Bkz. [[Home]], [[Mimari]], [[Tasarim_Sistemi]].

## Amaç

Adres, telefon, e-posta bilgileri ve gömülü Google Maps haritası sunan
tamamen statik sayfa. `localStorage` verisi kullanmıyor.

## Bölümler

1. Standart navbar (aktif: "İletişim") + `.prime-banner` ("İletişim & Ofis
   Konumumuz").
2. **`.contact-grid`** — İki sütun (mobilde tek sütun):
   - **`.info-box`**: Açık adres (Bostancı Mah. Tarıkı Has Sk. Tavukçuoğlu
     İş Merkezi No: 2, Bostancı, Kadıköy/İstanbul), telefon
     (`tel:02163727372`), e-posta (`mailto:info@remaxprime.com.tr`) ve
     "Google Maps Yol Tarifi Al" linki (`https://maps.google.com` — genel
     linke gidiyor, spesifik konum parametresi **yok**).
   - **`.map-box`**: Google Maps embed `<iframe>` — sorgu parametresiyle
     ("Bostancı Tavukçuoğlu İş Merkezi") spesifik konumu gösteriyor.

## JS

Sadece `toggleMenu()`.

## Not

- [[Ilanlar]] sayfasındaki modal'daki "Bu İlan İçin İletişime Geçin"
  butonu buraya yönlendiriyor, ancak hangi ilan için iletişime geçildiğine
  dair bir context/parametre taşınmıyor (URL query param yok) — sayfa
  jenerik iletişim formuna/bilgisine düşüyor.
- "Yol Tarifi Al" linki ile harita `<iframe>`'i farklı sorgular kullanıyor
  (biri jenerik `maps.google.com`, diğeri spesifik embed sorgusu) — küçük
  bir tutarsızlık.
