# Navbar

> **Özet:** Sitenin tüm genel (public) sayfalarında tekrarlanan, sticky konumlu üst gezinme çubuğudur; logo, sayfa linkleri ve mobilde hamburger menüye dönüşen bir navigasyon sunar. `admin.html` bu bileşeni içermez.
> **Kütüphaneler:** HTML5, CSS3 (Flexbox), Vanilla JavaScript (`toggleMenu()`), Font Awesome 6 (`fa-bars` ikonu).
> **Bağlantılar:** [[Footer]], [[Tasarim_Sistemi]], [[Mimari]], [[Ana_Sayfa]], [[Kurumsal]], [[Hizmetler]], [[Ilanlar]], [[Danismanlar]], [[Iletisim]]

## Yapı

```html
<header>
  <nav class="navbar">
    <div class="logo-container">RE/MAX PRIME</div>
    <div class="menu-toggle" onclick="toggleMenu()">☰</div>
    <ul class="nav-menu" id="navMenu"> ... 6 sayfa linki ... </ul>
    <div class="nav-contact"> <!-- sadece index.html'de --> ... </div>
  </nav>
</header>
```

- `header` elementi `position:sticky; top:0;` ile sayfa kaydırılsa da
  görünür kalır.
- Aktif sayfa linkine `class="active"` eklenir (kırmızı renk ile
  vurgulanır) — her sayfa kendi navbar kopyasında bunu manuel olarak
  işaretler.
- **[[Ana_Sayfa]] farkı:** Sadece `index.html`'de sağda `.nav-contact`
  bloğu (telefon linki + "BİZE ULAŞIN" butonu) bulunur; diğer sayfalarda
  yok.

## Mobil Davranış

`@media` sorgusu (index.html'de 900px, diğerlerinde 768px) altında:
- `.nav-contact` (varsa) gizlenir.
- `.menu-toggle` (hamburger ikonu) görünür olur.
- `.nav-menu` `position:absolute` ile tam genişlikte açılır/kapanır bir
  panele dönüşür; `toggleMenu()` fonksiyonu `.active` sınıfını
  ekleyip/çıkararak görünürlüğü kontrol eder.

## Mimari Not

Bu bileşen **paylaşılan bir dosya/partial olarak değil**, 6 genel sayfanın
her birinde ayrı ayrı kopyalanmış HTML/CSS/JS olarak var. Navbar linklerine
yeni bir sayfa eklemek veya mevcut bir linki değiştirmek istendiğinde tüm
6 dosyanın tek tek güncellenmesi gerekir. Ayrıntı: [[Mimari]].
