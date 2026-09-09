const { getCollection } = require("../_lib/store");

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

module.exports = async (req, res) => {
  const id = req.query.id;
  const listings = await getCollection("listings");
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    res.status(404).setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(
      "<!DOCTYPE html><html lang='tr'><head><meta charset='UTF-8'><title>İlan Bulunamadı | RE/MAX Prime</title></head>" +
      "<body style='font-family:sans-serif;text-align:center;padding:4rem;'><h1>İlan bulunamadı</h1>" +
      "<p><a href='/ilanlar.html'>Tüm ilanlara dön</a></p></body></html>"
    );
  }

  const siteUrl = "https://remaxprimebostanci.com";
  const images = listing.images && listing.images.length ? listing.images : ["/images/ofis/acik-ofis.webp"];
  const ogImage = images[0].startsWith("http") ? images[0] : `${siteUrl}${images[0]}`;
  const pageUrl = `${siteUrl}/ilan/${encodeURIComponent(listing.id)}`;
  const desc = listing.description || `${listing.title} - ${listing.location} - ${listing.price}`;

  const thumbs = images.map((img, i) =>
    `<img src="${esc(img)}" class="${i === 0 ? "active" : ""}" onclick="changeMainImg('${esc(img)}', this)">`
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(listing.title)} | RE/MAX Prime Bostancı</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(listing.title)} | RE/MAX Prime">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${pageUrl}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: listing.title,
  description: desc,
  url: pageUrl,
  image: ogImage,
  address: { "@type": "PostalAddress", addressLocality: listing.location }
})}</script>
<style>
  :root { --remax-red:#dc2626; --remax-blue:#002b49; --dark:#1f2937; }
  * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
  body { background:#f8fafc; color:var(--dark); }
  header { background:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.08); }
  .navbar { max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; padding:0.8rem 1rem; }
  .logo-text { font-size:1.5rem; font-weight:800; color:var(--remax-red); }
  .logo-sub { font-size:1.2rem; font-weight:300; color:var(--remax-blue); }
  .navbar a.back { color:var(--remax-blue); font-weight:600; text-decoration:none; font-size:0.9rem; }
  .container { max-width:850px; margin:0 auto; padding:1.5rem 1rem 3rem; }
  .breadcrumb { font-size:0.8rem; color:#64748b; margin-bottom:1rem; }
  .breadcrumb a { color:#64748b; }
  h1 { color:var(--remax-blue); font-size:1.3rem; margin-bottom:0.3rem; }
  .price { font-size:1.5rem; font-weight:800; color:var(--remax-red); margin-bottom:1rem; }
  .main-img { width:100%; height:340px; object-fit:cover; border-radius:10px; margin-bottom:0.8rem; }
  .thumbs { display:flex; gap:0.5rem; overflow-x:auto; padding-bottom:0.5rem; margin-bottom:1.2rem; }
  .thumbs img { width:80px; height:60px; object-fit:cover; border-radius:6px; cursor:pointer; opacity:0.65; flex-shrink:0; }
  .thumbs img.active { border:2px solid var(--remax-red); opacity:1; }
  .details-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.8rem; background:#fff; border:1px solid #e2e8f0; padding:1.2rem; border-radius:10px; margin-bottom:1.2rem; font-size:0.92rem; }
  .details-grid strong { color:var(--remax-blue); display:block; font-size:0.78rem; }
  .desc { font-size:0.92rem; color:#475569; line-height:1.6; margin-bottom:1.5rem; }
  .cta-row { display:flex; gap:0.8rem; flex-wrap:wrap; }
  .btn { flex:1; min-width:200px; text-align:center; padding:0.9rem; border-radius:8px; font-weight:bold; text-decoration:none; font-size:0.92rem; }
  .btn-wa { background:#25D366; color:#fff; }
  .btn-call { background:var(--remax-blue); color:#fff; }
  footer { background:var(--remax-blue); color:#fff; text-align:center; padding:1.2rem 0; margin-top:2rem; font-size:0.85rem; }
  @media (max-width:600px){ .main-img{height:220px;} .details-grid{grid-template-columns:1fr;} }
</style>
</head>
<body>
  <header>
    <nav class="navbar">
      <div><span class="logo-text">RE/MAX</span> <span class="logo-sub">PRIME</span></div>
      <a class="back" href="/ilanlar.html"><i class="fas fa-arrow-left"></i> Tüm İlanlar</a>
    </nav>
  </header>
  <main class="container">
    <div class="breadcrumb"><a href="/index.html">Ana Sayfa</a> / <a href="/ilanlar.html">İlanlar</a> / ${esc(listing.title)}</div>
    <h1>${esc(listing.title)}</h1>
    <div class="price">${esc(listing.price)}</div>
    <img id="mainImg" src="${esc(images[0])}" class="main-img" alt="${esc(listing.title)}">
    <div class="thumbs">${thumbs}</div>
    <div class="details-grid">
      <div><strong>Kategori</strong>${esc(listing.category || "-")}</div>
      <div><strong>İşlem Tipi</strong>${esc(listing.type || "-")}</div>
      <div><strong>Konum</strong>${esc(listing.location || "-")}</div>
      <div><strong>Oda Sayısı</strong>${esc(listing.rooms || "-")}</div>
    </div>
    <p class="desc">${esc(desc)}</p>
    <div class="cta-row">
      <a class="btn btn-wa" id="waBtn" href="#" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp'tan Sor</a>
      <a class="btn btn-call" href="tel:02163727372"><i class="fas fa-phone-alt"></i> Hemen Ara</a>
    </div>
  </main>
  <footer>&copy; 2026 RE/MAX Prime. Tüm Hakları Saklıdır.</footer>
  <script src="/config.js"></script>
  <script src="/site.js"></script>
  <script>
    function changeMainImg(url, el) {
      document.getElementById('mainImg').src = url;
      document.querySelectorAll('.thumbs img').forEach(function(img){ img.classList.remove('active'); });
      el.classList.add('active');
    }
    document.getElementById('waBtn').href = buildWhatsAppLink("Merhaba, \\"${esc(listing.title).replace(/"/g, '\\\\"')}\\" ilanı hakkında bilgi almak istiyorum.");
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).end(html);
};
