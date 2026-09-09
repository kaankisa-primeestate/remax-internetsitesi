const { isAuthenticated } = require("./_lib/auth");
const { getCollection, saveCollection, kvConfigured } = require("./_lib/store");

function newId() {
  return "ilan-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      const listings = await getCollection("listings");
      return res.status(200).json({ ok: true, listings, kvConfigured: kvConfigured() });
    }

    if (!isAuthenticated(req)) {
      return res.status(401).json({ ok: false, error: "Bu işlem için admin girişi gerekli." });
    }

    const listings = await getCollection("listings");

    if (req.method === "POST") {
      const item = Object.assign({}, req.body, { id: newId() });
      listings.unshift(item);
      await saveCollection("listings", listings);
      return res.status(201).json({ ok: true, listing: item });
    }

    if (req.method === "PUT") {
      const { id } = req.body || {};
      const idx = listings.findIndex((l) => l.id === id);
      if (idx === -1) return res.status(404).json({ ok: false, error: "İlan bulunamadı." });
      listings[idx] = Object.assign({}, listings[idx], req.body);
      await saveCollection("listings", listings);
      return res.status(200).json({ ok: true, listing: listings[idx] });
    }

    if (req.method === "DELETE") {
      const id = (req.query && req.query.id) || (req.body && req.body.id);
      const next = listings.filter((l) => l.id !== id);
      await saveCollection("listings", next);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    return res.status(405).json({ ok: false, error: "Desteklenmeyen metod." });
  } catch (e) {
    const status = e.code === "KV_NOT_CONFIGURED" ? 503 : 500;
    return res.status(status).json({ ok: false, error: e.message });
  }
};
