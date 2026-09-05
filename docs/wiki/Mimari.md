# Mimari

> **Özet:** Site, build sistemi veya framework kullanmayan, her sayfanın kendi `<style>`/`<script>` bloğunu taşıdığı 7 bağımsız statik HTML dosyasından oluşur. Dinamik veri (ilan/danışman) sunucu yerine tarayıcının `localStorage`'ında tutulur ve [[Admin_Paneli]] üzerinden yönetilir.
> **Kütüphaneler:** HTML5, CSS3, Vanilla JavaScript, Font Awesome 6 (CDN) — paket yöneticisi veya bundler yok.
> **Bağlantılar:** [[Navbar]], [[Footer]], [[Prime_Banner]], [[Admin_Paneli]], [[LocalStorage_Semasi]]

Bkz. genel bakış için [[Home]].

## Teknoloji Yığını

- **Framework yok:** React, Vue, jQuery vb. yok. Saf HTML5 + vanilla
  JavaScript (`var`/fonksiyon tabanlı, ES6+ class/module kullanılmıyor).
- **Build sistemi yok:** `package.json`, bundler, transpiler bulunmuyor.
  Depo doğrudan bir statik dosya sunucusundan (ör. GitHub Pages, herhangi bir
  basit web hosting) servis edilecek şekilde tasarlanmış.
- **Tek harici bağımlılık:** [Font Awesome 6.0.0](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css)
  CDN üzerinden her sayfanın `<head>`'inde ayrı ayrı yükleniyor.
- **Veritabanı/backend yok:** Tüm "dinamik" veri (ilanlar, danışmanlar)
  tarayıcı `localStorage`'ında tutuluyor. Bkz. [[LocalStorage_Semasi]].

## Dosya Organizasyonu

Depo kökü düz (flat) yapıdadır — alt klasör (örn. `src/`, `assets/`) yok:

```
remax-internetsitesi/
├── index.html          → [[Ana_Sayfa]]
├── kurumsal.html        → [[Kurumsal]]
├── hizmetler.html       → [[Hizmetler]]
├── ilanlar.html         → [[Ilanlar]]
├── danismanlar.html     → [[Danismanlar]]
├── iletisim.html        → [[Iletisim]]
├── admin.html           → [[Admin_Paneli]]
├── WhatsApp Image *.jpeg / *.mp4   → [[Medya_Varliklari]]
└── remax_prime_*_reklam_v2.png     → [[Medya_Varliklari]]
```

## Sayfa Şablonu (Tekrarlanan Desen)

`admin.html` hariç her genel sayfa aynı iskeleti kopyalar:

1. `<head>` içinde CSS custom property'leri (`--remax-red`, `--remax-blue`,
   `--dark`) tanımlayan bir `:root` bloğu — bkz. [[Tasarim_Sistemi]].
2. Sticky `<header>` + `.navbar` (logo, masaüstü menü, mobil `menu-toggle`
   hamburger butonu, `toggleMenu()` fonksiyonu).
3. Sayfaya özel bir `.prime-banner` (koyu lacivert gradient + kırmızı sol
   kenarlık) başlık bandı — `index.html` hariç tüm iç sayfalarda var.
4. Sayfaya özel içerik (`<main class="container">`).
5. Ortak `<footer>` — `&copy; 2026 RE/MAX Prime. Tüm Hakları Saklıdır.`

**Önemli mimari not:** Bu tekrarlanan HTML/CSS/JS bloğu (navbar, footer,
renk değişkenleri, `toggleMenu()`) **paylaşılan bir dosyada değil**, her
sayfanın kendi `<style>`/`<script>` etiketleri içinde ayrı ayrı
kopyalanmış durumda. Yani navbar linklerinde bir değişiklik yapılacaksa
6 dosyanın da (index, kurumsal, hizmetler, ilanlar, danismanlar, iletisim)
tek tek güncellenmesi gerekir — `admin.html` bu navbar'ı içermez, tamamen
izole bir sayfadır.

## Veri Akışı (Runtime)

```
[admin.html]  --(localStorage.setItem)-->  remax_properties, remax_agents
                                                    │
                                                    ▼
[ilanlar.html]  --(localStorage.getItem, sayfa yüklenirken)-->  render kartlar + modal
[danismanlar.html]  --(localStorage.getItem, sayfa yüklenirken)-->  render ekip kartları
```

- `ilanlar.html` ve `danismanlar.html`, `localStorage`'da veri yoksa veya
  boşsa, dosya içine gömülü `defaultProperties` / `defaultAgents`
  dizilerini (hardcoded 2'şer örnek kayıt) kullanır.
- `localStorage` **tarayıcıya/cihaza özeldir** — admin panelinden bir
  cihazda eklenen ilan/danışman, farklı bir ziyaretçinin tarayıcısında
  görünmez. Bu, gerçek bir çok kullanıcılı içerik yönetim sistemi
  olmadığının kanıtıdır. Ayrıntı ve riskler: [[Guvenlik_Notlari]].

## Yönlendirme (Routing)

Client-side veya server-side router yok; sayfalar arası geçiş klasik
`<a href="dosya.html">` bağlantılarıyla yapılıyor (tam sayfa yeniden
yükleme). `admin.html` hiçbir navbar'da linklenmemiş — sadece URL'i bilenler
erişebilir ("security through obscurity").
