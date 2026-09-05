# Admin Form (İlan/Danışman Formu)

> **Özet:** [[Admin_Paneli]] içindeki iki sekmede (İlan ve Danışman) tekrarlanan, aynı görsel yapıyı paylaşan form desenidir; alan grid'i, sürükle-bırak benzeri fotoğraf yükleme kutusu ve tekil submit butonundan oluşur. Aynı form hem "yeni ekle" hem "düzenle" modunda kullanılır.
> **Kütüphaneler:** HTML5 (`<form>`, `FileReader` API, `<canvas>`), CSS3 (Grid), Vanilla JavaScript.
> **Bağlantılar:** [[Admin_Paneli]], [[LocalStorage_Semasi]], [[Ilanlar]], [[Danismanlar]], [[Guvenlik_Notlari]]

## Ortak Desen

```html
<form onsubmit="save*(event)">
  <input type="hidden" id="*EditId" value="">
  <div class="form-grid"> ... alanlar ... </div>
  <div class="file-upload-box" onclick="...">
    <input type="file" ... onchange="process*Image(this, 'labelId')">
  </div>
  <button type="submit" class="btn-submit">Kaydet</button>
</form>
```

- **Gizli `EditId` alanı** hem `#pEditId` (ilan) hem `#aEditId` (danışman)
  için aynı mantıkla çalışır: doluysa `save*()` fonksiyonu güncelleme
  moduna geçer, boşsa yeni kayıt oluşturur.
- **`.file-upload-box`**: tıklanabilir kutu, gizli `<input type="file">`'ı
  tetikler; seçilen dosya(lar) `<canvas>` üzerinden yeniden boyutlandırılıp
  base64 JPEG'e çevrilir (bkz. [[LocalStorage_Semasi]] — Görsel İşleme
  Mantığı).
- **Form/Buton metni durum değiştirir**: "Yeni İlan Ekle" ↔ "İlanı
  Güncelle (ID: ...)", "İlanı Kaydet ve Yayınla" ↔ "Değişiklikleri
  Kaydet" (aynı desen danışman formunda da var).

## İki Örneği

| | İlan Formu (`#propForm`) | Danışman Formu (`#agentForm`) |
|---|---|---|
| Alan sayısı | 7 (başlık, kategori, tip, fiyat, konum, oda, m²) | 4 (ad, unvan, telefon, e-posta) |
| Görsel | Çoklu (`multiple`), max 800px, kalite 0.7 | Tekli, max 600px, kalite 0.85 |
| Kaydedildiği yer | `localStorage['remax_properties']` | `localStorage['remax_agents']` |
| Tüketen sayfa | [[Ilanlar]] | [[Danismanlar]] |

## Not

Form doğrulaması yalnızca HTML5 `required` niteliğiyle sınırlı; sunucu
tarafı doğrulama yok (zaten backend yok). Girdi kaçışlanmadan render
edildiği için bkz. [[Guvenlik_Notlari]].
