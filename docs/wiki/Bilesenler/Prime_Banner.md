# Prime Banner

> **Özet:** [[Ana_Sayfa]] ve [[Admin_Paneli]] dışındaki tüm iç sayfaların en üstünde yer alan, lacivert gradient zeminli sayfa başlığı bandıdır; sayfa adını, kısa açıklamasını ve bir rozet ikonunu gösterir. Her sayfada içerik farklıdır ama görsel şablon birebir aynıdır.
> **Kütüphaneler:** HTML5, CSS3 (`linear-gradient`), Font Awesome 6.
> **Bağlantılar:** [[Navbar]], [[Tasarim_Sistemi]], [[Kurumsal]], [[Hizmetler]], [[Ilanlar]], [[Danismanlar]], [[Iletisim]]

## Yapı

```html
<div class="prime-banner">
  <div class="prime-banner-text">
    <h2>Sayfa Başlığı</h2>
    <p>Kısa açıklama metni</p>
  </div>
  <div class="prime-badge"><i class="fas fa-*"></i> Rozet Metni</div>
</div>
```

## Sayfa Bazlı İçerik

| Sayfa | Başlık | Rozet İkonu |
|---|---|---|
| [[Kurumsal]] | Ofisimiz & Prestijli Çalışma Alanımız | `fa-building` |
| [[Hizmetler]] | A'dan Z'ye Profesyonel Danışmanlık | `fa-concierge-bell` |
| [[Ilanlar]] | Güncel Gayrimenkul Portföylerimiz | `fa-building` |
| [[Danismanlar]] | Uzman Danışman Kadromuz | `fa-users` |
| [[Iletisim]] | İletişim & Ofis Konumumuz | `fa-map-marker-alt` |

## Stil Detayı

- Zemin: `linear-gradient(135deg, #002b49 0%, #00406c 100%)` (`--remax-blue`
  tonları).
- Sol kenarlık: `5px solid var(--remax-red)`.
- `.prime-badge`: yarı saydam kırmızı arka plan (`rgba(220,38,38,0.15)`),
  ince kırmızı kenarlık, pill (`border-radius:20px`) şeklinde rozet.
- Mobilde (`max-width:768px`) `flex-direction:column` olur, ortalanır.

## Mimari Not

[[Navbar]] ve [[Footer]] gibi bu bileşen de paylaşılan bir dosyada değil,
her ilgili sayfada ayrı ayrı kopyalanmıştır (bkz. [[Mimari]]).
