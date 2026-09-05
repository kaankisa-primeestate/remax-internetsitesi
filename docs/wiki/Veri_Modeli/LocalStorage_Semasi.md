# LocalStorage Şeması

Bkz. [[Home]], [[Mimari]], [[Admin_Paneli]].

Sitenin tek "veritabanı" katmanı, tarayıcının `window.localStorage`
nesnesidir. İki anahtar (key) kullanılıyor:

## `remax_properties` (İlanlar)

Yazan: [[Admin_Paneli]] → `saveProperty()` / `deleteItem('prop', id)`.
Okuyan: [[Ilanlar]] → sayfa yüklenirken `JSON.parse(localStorage.getItem('remax_properties'))`.

Her kayıt bir obje, dizi (array) olarak saklanır:

```json
{
  "id": 1700000000000,          // Date.now() ile üretilir, sayısal
  "title": "Bostancı Sahilde Lüks 3+1 Daire",
  "category": "Konut",          // "Konut" | "Ticari" | "Arsa"
  "type": "Satılık",            // "Satılık" | "Kiralık"
  "price": "₺ 14.500.000",      // serbest metin, formatlanmamış string
  "location": "Bostancı, Kadıköy",
  "rooms": "3+1",                // select seçenekleri: 1+0, 1+1, 2+1, 3+1, 4+1, 4+2/5+1, Müstakil/Villa, Plaza/İş Yeri
  "area": "165 m²",              // serbest metin
  "images": ["data:image/jpeg;base64,...", "..."],  // canvas ile 800px'e küçültülmüş base64 JPEG dizisi
  "image": "data:image/jpeg;base64,..."             // images[0] ile aynı, geriye dönük/kolaylık alanı
}
```

- Görsel yoksa `image`/`images` alanı
  `https://via.placeholder.com/400x300?text=Fotograf+Yok` placeholder'ına
  düşer.
- [[Ilanlar]] varsayılan (fallback) verisi `defaultProperties` adıyla
  `ilanlar.html` içine hardcoded edilmiştir (localStorage boşsa kullanılır).

## `remax_agents` (Danışmanlar)

Yazan: [[Admin_Paneli]] → `saveAgent()` / `deleteItem('agent', id)`.
Okuyan: [[Danismanlar]] → sayfa yüklenirken `JSON.parse(localStorage.getItem('remax_agents'))`.

```json
{
  "id": 1700000000000,          // Date.now()
  "name": "Kaan Kısa",
  "title": "Kentsel Dönüşüm Uzmanı",
  "phone": "0532 326 87 39",
  "email": "kaankisa@gmail.com", // opsiyonel
  "image": "data:image/jpeg;base64,..."  // canvas ile 600px'e küçültülmüş base64 JPEG, kalite 0.85
}
```

- Görsel seçilmezse `https://via.placeholder.com/200x200?text=Profil`
  placeholder'ı kullanılır.
- [[Danismanlar]] varsayılan verisi `defaultAgents` adıyla
  `danismanlar.html` içine hardcoded edilmiştir (2 kayıt: Kaan Kısa, Alper
  Sarıalp).

## Görsel İşleme Mantığı (Admin Paneli)

`admin.html` içindeki `processMultipleImages()` (ilan fotoğrafları) ve
`processSingleAgentImage()` (danışman fotoğrafı) fonksiyonları:

1. `FileReader.readAsDataURL()` ile dosyayı oku.
2. Bir `<canvas>` üzerinde en/boy oranını koruyarak yeniden boyutlandır
   (ilan görselleri max 800px kenar, danışman görseli max 600px kenar).
3. `canvas.toDataURL('image/jpeg', quality)` ile sıkıştırılmış base64
   JPEG string'i üret (ilan: kalite 0.7, danışman: kalite 0.85).
4. Bu base64 string doğrudan `localStorage`'a yazılır — harici bir dosya
   sunucusuna/CDN'e yükleme **yapılmaz**.

⚠️ Bu yaklaşımın önemli bir sonucu vardır: `localStorage`'ın tarayıcı
başına tipik ~5-10MB kapasite sınırı olduğundan, çok sayıda/yüksek
çözünürlüklü görsel eklenirse `QuotaExceededError` alınabilir (kod bu
durumu ele almıyor — bkz. [[Guvenlik_Notlari]]).
