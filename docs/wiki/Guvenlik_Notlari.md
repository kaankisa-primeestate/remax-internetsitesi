# Güvenlik Notları

> **Özet:** [[Admin_Paneli]]'nin istemci tarafında düz metin şifre kullanması, sunucu doğrulamasının hiç olmaması ve kullanıcı girdisinin kaçışlanmadan `innerHTML`'e yazılması, bu depodaki en kritik tespit edilmiş risklerdir. Bu belge sadece analiz amaçlıdır, kodda düzeltme içermez.
> **Kütüphaneler:** Vanilla JavaScript (`localStorage`, `innerHTML`) — güvenlik kütüphanesi/sanitizer kullanılmıyor.
> **Bağlantılar:** [[Admin_Form]], [[Kart_Bileseni]], [[Ilanlar]], [[Danismanlar]]

Bkz. [[Home]], [[Admin_Paneli]], [[LocalStorage_Semasi]].

Bu belge yalnızca **analiz/tespit** amaçlıdır; kural gereği bu wiki
üzerinden kodda düzeltme yapılmamıştır (bkz. [[Home]] — Temel Kurallar).

## 1. İstemci Tarafında Açık Metin Şifre

`admin.html` içinde giriş şifresi (`1234`) hem JavaScript kodunda
(`if(val === '1234')`) hem de ekranda kullanıcıya düz metin olarak
gösteriliyor (`Giriş Şifresi: <strong>1234</strong>`). Sayfa kaynağını
görüntüleyen herkes şifreyi anında öğrenebilir. Gerçek bir kimlik
doğrulama/backend katmanı yok.

## 2. Erişim Kontrolü Yalnızca "Gizleme" (Obscurity)

`admin.html` hiçbir navbar'da linklenmiyor; tek koruma dosya adının/URL'in
bilinmemesi. Şifre bypass edilse bile (ör. tarayıcı konsolundan
`document.getElementById('dashBox').style.display='block'` çalıştırarak)
panele erişilebilir — sunucu tarafında hiçbir doğrulama yapılmıyor çünkü
sunucu tarafı (backend) zaten yok.

## 3. Veri Kalıcılığı ve Çok Kullanıcılı Tutarsızlık

Tüm ilan/danışman verisi `localStorage`'da tutulduğundan (bkz.
[[LocalStorage_Semasi]]):

- Bir tarayıcıda eklenen veri **diğer ziyaretçilere yansımaz** — her
  ziyaretçi kendi varsayılan (`defaultProperties`/`defaultAgents`) verisini
  görür, admin panelinden eklenenleri değil.
- Tarayıcı verisi temizlenirse (gizli sekme, "site verilerini temizle",
  farklı cihaz/tarayıcı) tüm eklenen içerik kaybolur.
- Bu, sitenin "canlı" bir CMS gibi davranmadığı, sadece **panel işlemini
  yapan kişinin kendi tarayıcısında** bir demo/önizleme sağladığı anlamına
  gelir.

## 4. Girdi Doğrulama ve Kaçış (Escaping) Eksikliği

`ilanlar.html`, `danismanlar.html` ve `admin.html`'deki liste render
fonksiyonları (`renderListings()`, `renderAgents()`, `loadData()`) form
alanlarından gelen değerleri (`title`, `location`, `name`, vb.) doğrudan
`innerHTML` string birleştirmesiyle DOM'a yazıyor, herhangi bir HTML
escaping/sanitization yapılmıyor. Admin panelini kullanan kişi kendi
tarayıcısında kendi girdiğini kendine gösterdiği için pratik saldırı yüzeyi
sınırlı olsa da, bu bir **stored/DOM XSS deseni**dir — panel çok
kullanıcılı bir backend'e taşınırsa (örn. paylaşılan bir API/veritabanı)
bu kod olduğu gibi kopyalanırsa ciddi bir XSS açığına dönüşür.

## 5. `localStorage` Kapasite Sınırı Ele Alınmıyor

Bkz. [[LocalStorage_Semasi]] — base64 gömülü görseller `localStorage`
kotasını (~5-10MB) aşarsa `setItem` sessizce/`QuotaExceededError` ile
başarısız olabilir; kod bunu yakalamıyor (try/catch yok).

## Öncelik Sırası (Öneri, Uygulama Değil)

1. Gerçek bir backend + kimlik doğrulama katmanı olmadan `admin.html`
   canlıya (production) alınmamalı.
2. Görseller `localStorage` yerine bir dosya depolama servisine
   yüklenmeli.
3. Kullanıcı girdisi render edilmeden önce escape edilmeli
   (`textContent` kullanımı veya bir template/escape yardımcı fonksiyonu).
