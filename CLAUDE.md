# Wiki Ajanı Protokolü

Bu depo için Claude'un "Wiki Ajanı" modunda çalışırken uyacağı kalıcı kural
seti. `/docs/wiki` klasörü bu protokolün hafıza (memory) katmanıdır.

## 1. Temel Kurallar

- `/docs/wiki` klasörü senin hafızandır. Sadece `.md` formatında dosyalar
  üreteceksin.
- ASLA kodu değiştirme veya silme (aksi açıkça belirtilmedikçe). Sadece
  analiz et ve Wiki'ye yaz.
- Yeni bir dosya/kavram oluşturduğunda MUTLAKA köşeli parantez ile
  Obsidian linki ver (Örn: `[[Supabase_Client]]`, `[[Auth_Flow]]`).

## 2. Node (Dosya) Formatı

Oluşturduğun her Wiki sayfasının en üstünde şunlar ZORUNLUDUR:

- **Özet:** Modülün ne yaptığını anlatan maksimum 3 cümlelik net bir
  açıklama.
- **Kütüphaneler:** Kullanılan temel teknolojiler (Örn: Supabase,
  Tailwind).
- **Bağlantılar:** İlgili UI bileşenlerine mutlaka link ver (Örn:
  `[[Navbar]]`, `[[Sidebar]]`).

Standart blok şablonu:

```markdown
# Sayfa Başlığı

> **Özet:** ...
> **Kütüphaneler:** ...
> **Bağlantılar:** [[X]], [[Y]]

...gövde içeriği...
```

## 3. Operasyonlar

- **INGEST:** Tüm projeyi veya son değişiklikleri tara, mimariyi anla ve
  `/docs/wiki` içine yeni dosyalar yazarak birbirine bağla. Her Ingest
  sonrası `docs/wiki/Index.md` dosyasını ana harita olarak güncelle
  (yeni node'ları listele, `Ingest Günlüğü` tablosuna bir satır ekle).
- **QUERY:** Yeni bir mimari plan/özellik istendiğinde, kodu taramak
  yerine ÖNCE `docs/wiki/Index.md`'ye git, ilgili Wiki dosyalarını oku ve
  ona göre plan çıkar. Sadece Index.md ve bağlı node'lar mevcut bilgiyi
  karşılamıyorsa kod tabanına inilir — ve bu durumda yeni bulgular yine
  INGEST kuralına göre wiki'ye yazılır.

## Depo İçi Konumlar

- Ana harita: `docs/wiki/Index.md`
- Mimari/tasarım notları: `docs/wiki/Mimari.md`, `docs/wiki/Tasarim_Sistemi.md`
- Veri modeli: `docs/wiki/Veri_Modeli/`
- Sayfa bazlı notlar: `docs/wiki/Sayfalar/`
- UI bileşen node'ları: `docs/wiki/Bilesenler/`
- Diğer: `docs/wiki/Guvenlik_Notlari.md`, `docs/wiki/Medya_Varliklari.md`
