# Footer

> **Özet:** Tüm 6 genel sayfanın altında yer alan, tek satırlık telif hakkı metnini gösteren sabit ve statik alt bilgi bileşenidir. Etkileşimli hiçbir öğe içermez ve `admin.html`'de bulunmaz.
> **Kütüphaneler:** HTML5, CSS3.
> **Bağlantılar:** [[Navbar]], [[Tasarim_Sistemi]], [[Ana_Sayfa]], [[Kurumsal]], [[Hizmetler]], [[Ilanlar]], [[Danismanlar]], [[Iletisim]]

## Yapı

```html
<footer>&copy; 2026 RE/MAX Prime. Tüm Hakları Saklıdır.</footer>
```

- Stil: lacivert (`--remax-blue`) zemin, beyaz metin, ortalanmış, `0.85rem`
  font boyutu, `padding:1.2rem 0`.
- İçerik tüm sayfalarda **birebir aynı** (statik metin, yıl hardcoded
  "2026") — [[LocalStorage_Semasi]] veya başka bir dinamik veri kaynağına
  bağlı değil.

## Mimari Not

[[Navbar]] gibi bu da paylaşılan bir dosyada değil, her sayfada ayrı ayrı
kopyalanmış durumda (bkz. [[Mimari]]).
