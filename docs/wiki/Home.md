# RE/MAX Prime İnternet Sitesi — Wiki

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

## Hızlı Gezinme İpuçları

- Tüm genel (public) sayfalar aynı navbar/footer desenini tekrar eder
  (paylaşılan bir include/component sistemi **yok** — her sayfa kendi
  `<style>` ve `<script>` bloğunu barındırır). Ayrıntı: [[Mimari]].
- Veri akışı: `admin.html` → `localStorage` yaz → `ilanlar.html` /
  `danismanlar.html` sayfa yüklenince oku ve render et. Ayrıntı:
  [[LocalStorage_Semasi]].
