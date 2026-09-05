# Danışmanlarımız (`danismanlar.html`)

> **Özet:** Ekip kadrosunu kart grid'i olarak gösteren, `localStorage`'daki `remax_agents` verisini (yoksa hardcoded `defaultAgents`'i) okuyan dinamik sayfadır. Veri [[Admin_Paneli]] üzerinden yönetilir; modal/detay görünümü yoktur.
> **Kütüphaneler:** HTML5, CSS3 (Grid), Vanilla JavaScript, Font Awesome 6.
> **Bağlantılar:** [[Navbar]], [[Footer]], [[Prime_Banner]], [[Kart_Bileseni]] (`.agent-card`), [[LocalStorage_Semasi]], [[Medya_Varliklari]]

Bkz. [[Index]], [[Mimari]], [[LocalStorage_Semasi]], [[Admin_Paneli]],
[[Tasarim_Sistemi]], [[Medya_Varliklari]].

## Amaç

Ekip kadrosunu kart grid'i olarak gösteren, **`localStorage`'dan veri
okuyan** dinamik sayfa.

## Bölümler

1. Standart navbar (aktif: "Danışmanlarımız") + `.prime-banner` ("Uzman
   Danışman Kadromuz").
2. **Ekip Grid** (`#agent-container.team-grid`, 3 sütun → mobilde 1 sütun)
   — `renderAgents()` tarafından doldurulur. Her kart: portre fotoğrafı
   (üstte kırmızı 3px kenarlık), isim, unvan, telefon, (varsa) e-posta.

## Veri Kaynağı

```js
var defaultAgents = [
  { id: 1, name: "Kaan Kısa", title: "Kentsel Dönüşüm Uzmanı", ... , image: "remax_prime_yeni_danisman_reklam_v2.png" },
  { id: 2, name: "Alper Sarıalp", title: "Broker", ... , image: "remax_prime_deneyimli_danisman_reklam_v2.png" }
];
var stored = JSON.parse(localStorage.getItem('remax_agents'));
var agents = (stored && stored.length > 0) ? stored : defaultAgents;
```

- Varsayılan görseller depo kökündeki reklam görselleri
  (`remax_prime_*_reklam_v2.png`) — bkz. [[Medya_Varliklari]]. Bu görseller
  aslında reklam/pazarlama amaçlı üretilmiş olabilir ama burada geçici
  profil fotoğrafı olarak kullanılıyor.
- Gerçek veri şeması: [[LocalStorage_Semasi]].
- Veri [[Admin_Paneli]] üzerinden eklenir/düzenlenir/silinir.

## Fonksiyonlar

| Fonksiyon | Görev |
|---|---|
| `renderAgents()` | `agents` dizisini kart grid'ine render eder |

Modal/detay sayfası yok — [[Ilanlar]]'ın aksine kart tıklanabilir değil,
sadece bilgi kartı olarak gösteriliyor.

## Not

`renderAgents()` de [[Ilanlar]]'daki gibi kaçışlanmamış `innerHTML` string
birleştirmesi kullanıyor (bkz. [[Guvenlik_Notlari]]).
