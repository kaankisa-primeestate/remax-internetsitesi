# Tasarım Sistemi

> **Özet:** Sitenin renk paleti (`--remax-red`, `--remax-blue`), tipografisi ve tekrarlanan bileşen görsel dilini tanımlar; her sayfada elle kopyalanan CSS ile tutarlı kılınır, tek bir paylaşılan stylesheet yoktur. Responsive davranış 900px ([[Ana_Sayfa]]) ve 768px (diğer iç sayfalar) kırılma noktalarına dayanır.
> **Kütüphaneler:** CSS3 (Custom Properties, Flexbox, Grid), Font Awesome 6.
> **Bağlantılar:** [[Navbar]], [[Footer]], [[Prime_Banner]], [[Kart_Bileseni]], [[Modal]]

Bkz. [[Home]], [[Mimari]].

Her sayfa kendi `<style>` bloğunu tekrar tanımladığı için burada anlatılan
"sistem" resmi bir paylaşılan stylesheet değil, **sayfalar arasında elle
kopyalanarak tutarlı kılınmış bir kural bütünüdür**.

## Renk Paleti (CSS Custom Properties)

Her sayfanın `:root` bloğunda tanımlı:

| Değişken | Değer | Kullanım |
|---|---|---|
| `--remax-red` | `#dc2626` | Vurgu rengi: butonlar, fiyat etiketleri, ikonlar, aktif nav linki |
| `--remax-blue` | `#002b49` | Marka rengi: başlıklar, footer, header butonları, banner gradient |
| `--dark` | `#1f2937` | Ana metin rengi |
| `--light-bg` | `#f8fafc` | Sadece `index.html`'de tanımlı; açık gri arka plan bölümleri için |

İç sayfaların (`kurumsal`, `hizmetler`, `ilanlar`, `danismanlar`, `iletisim`)
gövde arka planı `#f8fafc`; `index.html` ve `admin.html` beyaz/`#f1f5f9`
kullanır.

## Tipografi

- Font-family: `'Segoe UI', sans-serif` (tüm sayfalarda `*` seçicisi
  üzerinden global uygulanıyor — web font yüklenmiyor, sistem fontuna
  güveniliyor).
- İkon seti: Font Awesome 6 (`fas fa-*` sınıfları).

## Tekrarlanan Bileşenler

- **`.navbar`** — Logo (`RE/MAX` kırmızı + `PRIME` lacivert), yatay menü,
  sağda telefon linki + "BİZE ULAŞIN" butonu (sadece `index.html`'de; iç
  sayfalarda sadece menü var).
- **`.prime-banner`** — Lacivert gradient (`#002b49` → `#00406c`), sol
  kenarlıkta kırmızı 5px şerit, sağda `.prime-badge` (yarı saydam kırmızı
  pill/rozet). Tüm iç sayfalarda (index hariç) sayfa başlığı olarak kullanılır.
- **`.action-card` / `.service-card` / `.agent-card` / `.card`** — Beyaz
  kart, ince gri kenarlık (`#e2e8f0`), hafif gölge (`box-shadow`), yuvarlak
  köşe (`border-radius: 8-10px`). Tüm kart tipleri aynı görsel dilin
  varyasyonları.
- **`.modal`** (sadece [[Ilanlar]]) — Tam ekran karartma + ortalanmış içerik
  kutusu, galeri thumbnail'leri, ilan detayları.
- **`footer`** — Lacivert zemin, beyaz metin, ortalı telif hakkı yazısı.

## Responsive Kırılma Noktaları

- **`index.html`**: `@media (max-width: 900px)` — hero başlık küçülür, dual
  card'lar tek sütuna düşer, feature strip 2 sütuna iner, nav mobil menüye
  dönüşür.
- **Diğer tüm iç sayfalar** (`kurumsal`, `hizmetler`, `ilanlar`,
  `danismanlar`, `iletisim`, admin hariç): `@media (max-width: 768px)` —
  grid'ler tek sütuna iner, `.menu-toggle` görünür olur, `.nav-menu`
  `position:absolute` ile açılır kapanır mobil menüye dönüşür.
- Mobil menü mantığı JS tarafında her sayfada aynı: `toggleMenu()` fonksiyonu
  `#navMenu` elementine `.active` sınıfı ekler/çıkarır.

## Tasarım Sistemi ile İlgili Gözlem

Renk değişkenleri ve bileşen stilleri sayfalar arasında **büyük ölçüde
tutarlı** ama tek bir kaynaktan yönetilmiyor. Yeni bir sayfa eklendiğinde
veya renk paleti değiştirildiğinde tüm `.html` dosyalarında paralel
güncelleme yapılması gerekir (bkz. [[Mimari]] içindeki "Sayfa Şablonu"
bölümü).
