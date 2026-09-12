# RE/MAX Prime Bostancı - Vercel Kurulum Rehberi

Bu proje Vercel'e framework'süz (statik HTML/CSS/JS + `api/` altında
serverless fonksiyonlar) olarak deploy edilecek şekilde hazırlanmıştır.
Aşağıdaki adımlar Vercel dashboard'unda **bir kez** yapılması gereken
işlemlerdir; kod tarafında ek bir şey gerekmez.

## 1. Projeyi Vercel'e bağlama

1. Vercel dashboard → **Add New → Project** → bu GitHub reposunu seçin.
2. Framework Preset: **Other** (otomatik algılanır, `vercel.json` mevcut).
3. Domain: `remaxprimebostanci.com` alan adını Project → Settings → Domains
   üzerinden ekleyin ve DNS kayıtlarını Vercel'in verdiği değerlerle güncelleyin.

## 2. Kalıcı veri için Redis bağlama (ZORUNLU)

Şu an ilanlar/danışmanlar örnek veriyle **salt okunur** çalışır; admin panelinden
kayıt/güncelleme yapabilmek için bir Redis veritabanı bağlanması gerekir:

1. Vercel dashboard → Project → **Storage** sekmesi → **Create Database** → **Redis**
   (ücretsiz "Free — 30 MB" planı bu proje için fazlasıyla yeterlidir).
2. Oluşturduktan sonra **Connect Project** ile bu projeye bağlayın. **"Custom Prefix"**
   alanına mutlaka **`KV`** yazın (varsayılan "STORAGE" değil) — kod, ortam
   değişkenini `KV_REDIS_URL` ismiyle arıyor.
3. Projeyi yeniden deploy edin (env değişkeni eklemek otomatik redeploy tetiklemez;
   Deployments → son deployment → "⋯" → **Redeploy**).

Redis bağlanmadan önce admin panelinde sarı bir uyarı bandı görünür; bağlandıktan
sonra kaybolur ve kayıt işlemleri kalıcı hale gelir.

> Not: Vercel'in eski "KV" ürünü (Upstash REST API tabanlı) yerini standart
> Redis bağlantısına (`node-redis`, `KV_REDIS_URL`) bıraktı; bu proje güncel
> ürünle uyumlu şekilde yazılmıştır.

## 3. Admin şifresi

Project → Settings → **Environment Variables** kısmına ekleyin:

| Değişken | Açıklama |
|---|---|
| `ADMIN_PASSWORD` | Admin paneli giriş şifresi. **Eklemezseniz varsayılan `remaxprime-2026-degistir` kullanılır — mutlaka değiştirin.** |
| `ADMIN_SECRET` | (Opsiyonel) Oturum imzalama anahtarı. Boş bırakılırsa `ADMIN_PASSWORD`'den otomatik türetilir. |

## 4. Sosyal medya, WhatsApp ve reklam ayarları

Tüm sayfaların okuduğu tek dosya: **`config.js`** (repo kökünde).

```js
window.SITE_CONFIG = {
  whatsapp: { number: "905423781540", ... },   // zaten dolu
  social: { instagram: "", facebook: "", ... },  // hesaplar açılınca linkleri buraya yazın
  gtmId: ""                                       // GTM container ID'si oluşunca "GTM-XXXXXXX" yazın
};
```

- **Sosyal hesaplar** hazır olduğunda `social` alanındaki URL'leri doldurup
  push'lamanız yeterli — footer'daki ikonlar otomatik görünür.
- **Reklam altyapısı** (Google Ads / Meta Pixel) kurulacağı zaman:
  1. [Google Tag Manager](https://tagmanager.google.com) üzerinde bir container
     oluşturun, ID'sini (`GTM-XXXXXXX`) `config.js` → `gtmId` alanına yazın.
  2. GTM container içine Google Ads dönüşüm etiketini ve Meta Pixel'i ekleyin.
     Kod tarafında zaten hazır olan `dataLayer` olayları:
     - `whatsapp_click` (WhatsApp butonlarına tıklanınca)
     - `phone_click` (telefon linklerine tıklanınca)
     - `form_submit` (iletişim/değerleme formu başarıyla gönderilince)
  3. Bu olayları GTM'de "Trigger" olarak tanımlayıp Ads/Meta dönüşümlerine
     bağlayabilirsiniz. `gtmId` boş kaldığı sürece hiçbir izleme kodu yüklenmez,
     yani reklam kampanyasını siz açana kadar sistem sessiz kalır.

## 5. İletişim/değerleme formu mesajlarını görme

Formlar `/api/contact` üzerinden Redis'e yazılır. Admin panelinde
**Mesajlar** sekmesinden görüntülenir. E-postaya bildirim istiyorsanız
ileride `api/contact.js` içine bir e-posta servisi (ör. Resend) eklenebilir —
bu adım şu an kapsam dışı bırakıldı.

## 6. Yerel geliştirme

```bash
npm install
npx vercel dev
```

`vercel dev` komutu hem statik sayfaları hem `api/` fonksiyonlarını
localhost üzerinde çalıştırır. `KV_REDIS_URL` tanımlı değilse
site otomatik olarak örnek veriyle çalışır.

## 7. Yayın sonrası SEO kontrol listesi

- [ ] Google Search Console'a `https://remaxprimebostanci.com` ekleyin,
      `sitemap.xml` gönderin (bu proje `/sitemap.xml`'i otomatik üretir).
- [ ] Google İşletme Profili'ni oluşturup adres/telefon/çalışma saatlerini
      sitedeki bilgilerle birebir aynı yapın.
- [ ] Google Analytics 4 mülkü oluşturup GTM container'ına ekleyin.

## Eklenmemiş / bilinçli olarak ertelenmiş konular

- Gerçek ilan ve danışman fotoğraf/verileri (örnek veriyle geliyor, admin
  panelinden gerçek verilerle değiştirilecek).
- Sosyal medya hesap linkleri.
- Canlı reklam kampanyaları (altyapı hazır, kampanya siz başlatınca devreye girer).
- Form gönderimlerinde e-posta bildirimi ve reCAPTCHA (honeypot ile temel
  spam koruması şu an aktif).
