# Kart Bileşeni (Card Family)

> **Özet:** Beyaz zemin, ince gri kenarlık ve yuvarlatılmış köşelerle tanımlanan, sitede dört farklı bağlamda (aksiyon, hizmet, danışman, ilan) tekrarlanan ortak kart görsel dilidir. Her varyant kendi CSS sınıf adını kullanır ama aynı tasarım kurallarını paylaşır.
> **Kütüphaneler:** HTML5, CSS3 (Grid/Flexbox, `box-shadow`, `border-radius`).
> **Bağlantılar:** [[Modal]], [[Tasarim_Sistemi]], [[Ana_Sayfa]], [[Hizmetler]], [[Danismanlar]], [[Ilanlar]], [[LocalStorage_Semasi]]

## Varyantlar

| Sınıf | Kullanıldığı Sayfa | İçerik | Veri Kaynağı |
|---|---|---|---|
| `.action-card` | [[Ana_Sayfa]] | İkon + başlık + açıklama + CTA butonu | Statik (hardcoded) |
| `.service-card` | [[Hizmetler]] | İkon + başlık + açıklama + "Talep Oluştur" butonu | Statik (hardcoded) |
| `.agent-card` | [[Danismanlar]] | Portre fotoğrafı + isim + unvan + iletişim | [[LocalStorage_Semasi]] (`remax_agents`) |
| `.card` (ilan kartı) | [[Ilanlar]] | Kapak görseli + rozet + fiyat + başlık + özellikler | [[LocalStorage_Semasi]] (`remax_properties`) |

## Ortak Görsel Kurallar

- `background:#fff`, `border:1px solid #e2e8f0`, `border-radius:8-10px`.
- `box-shadow:0 4px 12px rgba(0,0,0,0.04)` (hafif gölge).
- Başlıklar `--remax-blue`, vurgu metinleri/fiyatlar `--remax-red`.
- Grid içinde eşit genişlikte dizilirler (`repeat(3, 1fr)` masaüstünde,
  mobilde `1fr`).

## Farklar

- Sadece ilan kartı (`.card`) tıklanabilir ve [[Modal]] açar
  (`onclick="openModal(index)"`); diğer üç varyant statik bilgi kartıdır.
- `.agent-card` ve ilan kartı **dinamik olarak** JS ile
  (`renderAgents()` / `renderListings()`) render edilir; `.action-card` ve
  `.service-card` doğrudan HTML içine yazılmıştır.
