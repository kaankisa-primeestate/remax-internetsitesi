# Ana Sayfa (`index.html`)

> **Özet:** Sitenin giriş sayfasıdır; "satmak isteyenler" ve "kariyer yapmak isteyenler" için iki ayrı CTA sunan, tamamen statik bir pazarlama/tanıtım sayfasıdır. `localStorage` verisine bağımlı değildir ve tek harici bağımlılığı Unsplash hero görselidir.
> **Kütüphaneler:** HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript (`toggleMenu()`), Font Awesome 6.
> **Bağlantılar:** [[Navbar]], [[Footer]], [[Kart_Bileseni]] (`.action-card`), [[Hizmetler]], [[Kurumsal]]

Bkz. [[Index]], [[Mimari]], [[Tasarim_Sistemi]].

## Amaç

Sitenin giriş kapısı; hem "gayrimenkulünü satmak isteyenler" hem de
"gayrimenkul kariyeri yapmak isteyenler" için iki ayrı çağrı-to-action (CTA)
sunan bir tanıtım/pazarlama sayfası. Statik, `localStorage` verisine
bağımlı değil (tek sayfa budur — diğer tüm iç sayfalar [[Ilanlar]] ve
[[Danismanlar]] hariç de statik).

## Bölümler

1. **Header/Navbar** — Diğer sayfalardan farklı olarak burada ayrıca sağda
   telefon linki (`tel:02163727372`) ve "BİZE ULAŞIN" butonu var
   (`.nav-contact`, mobilde gizleniyor).
2. **Hero** — Unsplash'ten harici bir arka plan görseli
   (`background:url('https://images.unsplash.com/...')`) üzerine lacivert
   gradient overlay + başlık/alt metin.
3. **Dual Action Cards** (`.dual-cards`) — Biri [[Hizmetler]]'e ("HEMEN
   BİLGİ AL"), diğeri [[Kurumsal]]'a ("OFİSİMİZİ KEŞFET") yönlendiren iki
   kart; hero'nun üstüne `margin-top:-4rem` ile taşıyor.
4. **5'li Avantaj Şeridi** (`.features-strip`) — 5 ikon+başlık+açıklama
   (uzman kadro, ofis gücü, broker desteği, pazarlama/teknoloji, konum).
5. **Hızlı İletişim Bannerı** (`.contact-banner`) — Telefon numarası +
   "ÜCRETSİZ DEĞERLEME TALEP ET" butonu, [[Hizmetler]]'e link veriyor.
6. **Neden RE/MAX & Bostancı Avantajları** (`.info-sections`) — İki sütunlu
   2x2 grid'ler halinde 8 madde (güven, deneyim, sonuç odaklılık, destek /
   ulaşım, prestij, iş merkezi, kentsel dönüşüm).
7. **Alıntı Bandı** (`.quote-banner`) — İtalik slogan metni.
8. **Footer** — Ortak footer.

## JS

Sadece `toggleMenu()` — mobil hamburger menüsünü açar/kapatır. Başka
dinamik davranış yok.

## Harici Bağımlılıklar

- Font Awesome 6 (CDN).
- Unsplash hero görseli (harici URL, depoya dahil değil — internet
  bağlantısı kesilirse hero arka planı yüklenmez).
