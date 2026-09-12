const { getCollection } = require("./_lib/store");

module.exports = async (req, res) => {
  const siteUrl = "https://remaxprimebostanci.com";
  const staticPages = [
    "", "index.html", "kurumsal.html", "hizmetler.html",
    "ilanlar.html", "danismanlar.html", "iletisim.html", "kariyer.html"
  ];

  let listings = [];
  try {
    listings = await getCollection("listings");
  } catch (e) {
    listings = [];
  }

  const urls = staticPages.map((p) => `${siteUrl}/${p}`).concat(
    listings.map((l) => `${siteUrl}/ilan/${encodeURIComponent(l.id)}`)
  );

  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  return res.status(200).end(xml);
};
