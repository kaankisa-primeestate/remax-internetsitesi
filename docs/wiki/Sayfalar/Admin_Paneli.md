# Yönetim Paneli (`admin.html`)

> **Özet:** [[Ilanlar]] ve [[Danismanlar]] sayfalarında gösterilecek içeriği düzenlemek için kullanılan, navbar'da linklenmeyen, düz metin şifreyle "korunan" bağımsız bir CRUD panelidir. Veriyi doğrudan tarayıcının `localStorage`'ına yazar; gerçek bir backend/oturum mekanizması yoktur.
> **Kütüphaneler:** HTML5 (`<form>`, `FileReader`, `<canvas>`), Vanilla JavaScript, Font Awesome 6.
> **Bağlantılar:** [[Admin_Form]], [[LocalStorage_Semasi]], [[Ilanlar]], [[Danismanlar]], [[Guvenlik_Notlari]]

Bkz. [[Index]], [[Mimari]], [[LocalStorage_Semasi]], [[Guvenlik_Notlari]].

## Amaç

[[Ilanlar]] ve [[Danismanlar]] sayfalarında gösterilecek içeriği (kendi
tarayıcısının `localStorage`'ına) ekleyip düzenlemek için kullanılan,
navbar'da linklenmeyen bağımsız bir panel sayfası.

## Giriş (Login)

- `#loginBox` içinde şifre input'u; doğru şifre (`1234`, ekranda açıkça
  yazılı — bkz. [[Guvenlik_Notlari]]) girilince `checkPass()` `loginBox`'ı
  gizleyip `dashBox`'ı gösterir ve `loadData()` çağırır.
- Gerçek bir oturum/token mekanizması yok; sayfa yenilenince tekrar şifre
  istenir (`btn-logout` zaten `location.reload()` çağırıyor).

## Sekmeler (Tabs)

`.dash-nav` üzerinde iki buton, `switchTab(tabId, btn)` ile `.tab-pane`
görünürlüğünü değiştiriyor:

1. **Portföy & İlan Yönetimi** (`#ilanTab`) — [[Ilanlar]] verisini yönetir.
2. **Danışman Kadrosu Yönetimi** (`#danismanTab`) — [[Danismanlar]]
   verisini yönetir.

## İlan Formu (`#propForm`)

Alanlar: Başlık, Kategori (Konut/Ticari/Arsa), İşlem Tipi (Satılık/Kiralık),
Fiyat, Konum, Oda Sayısı (8 seçenekli select), Metrekare, çoklu fotoğraf
input'u (`#pImgFiles`, `multiple`).

- Yeni fotoğraf seçilince `processMultipleImages()` her dosyayı canvas ile
  800px'e küçültüp base64 JPEG'e çevirir → `propImagesArray`.
- `saveProperty(e)`: `pEditId` doluysa mevcut kaydı günceller (fotoğraf
  seçilmediyse eski görseller korunur), boşsa yeni kayıt
  (`id: Date.now()`) ekler. Sonuç `localStorage['remax_properties']`'e
  yazılır. Tam şema: [[LocalStorage_Semasi]].
- `editProperty(id)`: formu seçilen kaydın verisiyle doldurur, "Düzenleme
  modu"na geçirir (`propFormTitle`/`pBtnSubmit` metinleri değişir).
- `resetPropForm()`: formu ve düzenleme durumunu sıfırlar.

## Danışman Formu (`#agentForm`)

Alanlar: Ad Soyad, Unvan, Telefon, E-Posta (opsiyonel), tekli profil
fotoğrafı (`#aImgFile`).

- `processSingleAgentImage()`: canvas ile 600px'e küçültüp base64 JPEG
  (kalite 0.85) üretir → `agentBase64`.
- `saveAgent(e)` / `editAgent(id)` / `resetAgentForm()`: `saveProperty` ile
  simetrik mantık, `remax_agents` anahtarı üzerinde çalışır.

## Liste & Silme

- `loadData()`: Her iki `localStorage` anahtarını okuyup `#propertyList`
  ve `#agentList` içine satır satır (`.list-row`) render eder; her satırda
  "Güncelle" (`editProperty`/`editAgent`) ve "Sil" (`deleteItem`) butonları
  var.
- `deleteItem(type, id)`: `type` `'prop'` veya `'agent'` olabilir; ilgili
  diziyi `id`'ye göre filtreleyip `localStorage`'a geri yazar.

## Bilinen Sınırlamalar

Ayrıntılı liste: [[Guvenlik_Notlari]]. Özet: istemci-taraflı düz metin
şifre, sunucu doğrulaması yok, veri sadece işlemi yapan tarayıcıda kalıcı,
kullanıcı girdisi kaçışlanmadan `innerHTML`'e yazılıyor, `localStorage`
kota aşımı ele alınmıyor.
