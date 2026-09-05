# Hizmetlerimiz (`hizmetler.html`)

Bkz. [[Home]], [[Mimari]], [[Tasarim_Sistemi]].

## Amaç

Sunulan hizmetleri listeleyen, tamamen statik bir sayfa.

## Bölümler

1. Standart navbar (aktif: "Hizmetlerimiz") + `.prime-banner` ("A'dan Z'ye
   Profesyonel Danışmanlık").
2. **Servis Grid** (`.services-grid`, 3 sütun → mobilde 1 sütun) — 6
   hardcoded hizmet kartı:
   - Ücretsiz Gayrimenkul Ekspertiz & Değerleme
   - Lüks Konut & Mülk Satış / Kiralama
   - Ticari Gayrimenkul & Yatırım Danışmanlığı
   - Hukuki, Tapu & Kredi Süreç Yönetimi
   - Maksimum İlan Görünürlüğü & Dijital Pazarlama
   - Yabancı Yatırımcı & Vatandaşlık Danışmanlığı

## JS

- `toggleMenu()` — mobil menü.
- Her kartın "Hizmet Talebi Oluştur" butonu `onclick="alert('Talebiniz
  alınmıştır.')"` çağırıyor — **gerçek bir form gönderimi/backend
  entegrasyonu yok**, sadece bir tarayıcı `alert()` kutusu gösteriliyor.
  Herhangi bir e-posta, veritabanı kaydı veya bildirim tetiklenmiyor.

## Not

Bu sayfa [[Ana_Sayfa]]'daki "HEMEN BİLGİ AL" ve "ÜCRETSİZ DEĞERLEME TALEP
ET" CTA'larının hedefi.
