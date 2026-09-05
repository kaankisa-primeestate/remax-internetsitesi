# Portföy / İlanlar (`ilanlar.html`)

Bkz. [[Home]], [[Mimari]], [[LocalStorage_Semasi]], [[Admin_Paneli]],
[[Tasarim_Sistemi]].

## Amaç

Satılık/kiralık gayrimenkul ilanlarını kart grid'i + detay modalı olarak
gösteren, **`localStorage`'dan veri okuyan** dinamik sayfa.

## Bölümler

1. Standart navbar (aktif: "Portföy / İlanlar") + `.prime-banner` ("Güncel
   Gayrimenkul Portföylerimiz").
2. **İlan Grid** (`#listings-container.cards-grid`) — JS ile boş
   `<div>` içine `renderListings()` tarafından doldurulur.
3. **Detay Modalı** (`#detailModal`) — Bir karta tıklanınca açılır; başlık,
   fiyat, ana görsel, galeri thumbnail'leri, kategori/tip/konum/oda sayısı
   detayları ve [[Iletisim]]'e giden "Bu İlan İçin İletişime Geçin" butonu.

## Veri Kaynağı

```js
var defaultProperties = [ /* 2 hardcoded örnek ilan */ ];
var stored = JSON.parse(localStorage.getItem('remax_properties'));
var properties = (stored && stored.length > 0) ? stored : defaultProperties;
```

- `stored` boş/yoksa `defaultProperties` (Bağdat Caddesi 3+1 daire,
  Bostancı sahil ofis) gösterilir.
- Gerçek veri şeması ve alanlar için: [[LocalStorage_Semasi]].
- Veri [[Admin_Paneli]] üzerinden eklenir/düzenlenir/silinir.

## Fonksiyonlar

| Fonksiyon | Görev |
|---|---|
| `renderListings()` | `properties` dizisini kart grid'ine render eder (her karta `onclick="openModal(index)"`) |
| `openModal(index)` | Modalı ilgili ilan verisiyle doldurur ve `display:flex` yapar |
| `changeMainImg(url, el)` | Modal içinde thumbnail tıklanınca ana görseli değiştirir |
| `closeModal()` | Modalı kapatır |

## Not

`renderListings()` ve `openModal()` string birleştirme ile `innerHTML`
yazıyor — kullanıcı girdisi kaçışlanmıyor (bkz. [[Guvenlik_Notlari]]).
