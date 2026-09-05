# RE/MAX Prime İnternet Sitesi — Wiki (Ana Harita)

> Bu dosya **ana haritadır** (bkz. depo kökündeki `CLAUDE.md` →
> Operasyonlar bölümü). Her INGEST sonrası bu dosya güncellenir; her QUERY
> öncesinde önce bu dosya okunur.

> **Özet:** Bu sayfa, RE/MAX Prime tanıtım/portföy sitesinin tüm wiki dokümantasyonuna giriş noktasıdır ve site haritası, mimari, tasarım sistemi ile veri modeli notlarını tek yerden birbirine bağlar. Depo, framework veya backend içermeyen, saf statik HTML/CSS/JS sayfalarından oluşur.
> **Kütüphaneler:** HTML5, CSS3, Vanilla JavaScript, Font Awesome 6 (CDN).
> **Bağlantılar:** [[Navbar]], [[Footer]], [[Prime_Banner]], [[Kart_Bileseni]], [[Modal]], [[Admin_Form]]

Bu wiki, `remax-internetsitesi` deposunun analizinden otomatik olarak
üretilmiştir. Amaç, kod tabanının mimarisini, sayfa yapısını, veri akışını ve
bilinen riskleri tek bir hafıza (memory) kaynağında tutmaktır.

> Kural: Bu klasördeki dosyalar sadece dokümantasyon amaçlıdır. Kod
> `/docs/wiki` üzerinden asla değiştirilmez veya silinmez; burada yalnızca
> analiz sonuçları yazılır.

## Proje Özeti

- **Ne:** Bostancı/Kadıköy bölgesinde faaliyet gösteren bir RE/MAX ofisi için
  tanıtım + portföy (ilan) sitesi.
- **Nasıl:** Derleme (build) aracı, paket yöneticisi veya framework
  kullanılmayan, saf **statik HTML/CSS/JS** dosyalarından oluşan bir site.
  Bkz. [[Mimari]].
- **Sunucu tarafı yok:** Backend, API veya veritabanı bulunmuyor. "Admin
  paneli" verileri tarayıcı `localStorage`'ında saklıyor. Bkz.
  [[LocalStorage_Semasi]].
- **Dil:** Tüm içerik Türkçe (`<html lang="tr">`).

## Site Haritası

| Dosya | Sayfa | Wiki Notu |
|---|---|---|
| `index.html` | Ana Sayfa | [[Ana_Sayfa]] |
| `kurumsal.html` | Kurumsal & Ofisimiz | [[Kurumsal]] |
| `hizmetler.html` | Hizmetlerimiz | [[Hizmetler]] |
| `ilanlar.html` | Portföy / İlanlar | [[Ilanlar]] |
| `danismanlar.html` | Danışmanlarımız | [[Danismanlar]] |
| `iletisim.html` | İletişim | [[Iletisim]] |
| `admin.html` | Yönetim Paneli (gizli, navbar'da linklenmiyor) | [[Admin_Paneli]] |

## Ana Konu Başlıkları

- [[Mimari]] — Teknoloji yığını, dosya organizasyonu, sayfalar arası ortak
  desenler.
- [[Tasarim_Sistemi]] — Renk paleti, tipografi, bileşenler, responsive
  kırılma noktaları.
- [[LocalStorage_Semasi]] — `remax_properties` ve `remax_agents` veri
  şemaları ve varsayılan (fallback) veriler.
- [[Admin_Paneli]] — Şifreli giriş, ilan/danışman CRUD akışı, görsel
  sıkıştırma mantığı.
- [[Medya_Varliklari]] — Depodaki görsel/video varlıkların envanteri ve
  kullanım yerleri.
- [[Guvenlik_Notlari]] — Tespit edilen güvenlik zafiyetleri ve riskler
  (analiz amaçlı; düzeltme bu wiki'nin kapsamı dışında).

## UI Bileşenleri

Sayfalar arasında tekrarlanan görsel/etkileşim desenleri ayrı node'lar
olarak belgelenmiştir:

- [[Navbar]] — Sticky üst gezinme çubuğu (tüm genel sayfalarda).
- [[Footer]] — Ortak alt bilgi bandı (tüm genel sayfalarda).
- [[Prime_Banner]] — İç sayfa başlık bandı ([[Ana_Sayfa]] ve
  [[Admin_Paneli]] hariç).
- [[Kart_Bileseni]] — Aksiyon/hizmet/danışman/ilan kartı ailesi.
- [[Modal]] — İlan detay penceresi (sadece [[Ilanlar]]).
- [[Admin_Form]] — [[Admin_Paneli]]'ndeki ilan/danışman form deseni.

## Ingest Günlüğü

| Tarih | Kapsam | Not |
|---|---|---|
| 2026-09-05 | İlk INGEST | Tüm depo (7 HTML sayfası + medya) tarandı; [[Mimari]], [[Tasarim_Sistemi]], [[LocalStorage_Semasi]], [[Guvenlik_Notlari]], [[Medya_Varliklari]], 7 sayfa notu ve 6 UI bileşen node'u oluşturuldu. |
| 2026-09-05 | Format güncellemesi | Tüm node'lara zorunlu Özet/Kütüphaneler/Bağlantılar başlığı eklendi; ana harita `Home.md` → `Index.md` olarak yeniden adlandırıldı. |

## Hızlı Gezinme İpuçları

- Tüm genel (public) sayfalar aynı navbar/footer desenini tekrar eder
  (paylaşılan bir include/component sistemi **yok** — her sayfa kendi
  `<style>` ve `<script>` bloğunu barındırır). Ayrıntı: [[Mimari]].
- Veri akışı: `admin.html` → `localStorage` yaz → `ilanlar.html` /
  `danismanlar.html` sayfa yüklenince oku ve render et. Ayrıntı:
  [[LocalStorage_Semasi]].
