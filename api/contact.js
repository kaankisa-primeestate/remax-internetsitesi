const { isAuthenticated } = require("./_lib/auth");
const { appendToList, readList, kvConfigured } = require("./_lib/store");

function isValidPhone(v) {
  return typeof v === "string" && v.replace(/\D/g, "").length >= 10;
}

module.exports = async (req, res) => {
  if (req.method === "GET") {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ ok: false, error: "Bu işlem için admin girişi gerekli." });
    }
    const messages = await readList("contact:submissions", 100);
    return res.status(200).json({ ok: true, messages, kvConfigured: kvConfigured() });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Desteklenmeyen metod." });
  }

  const body = req.body || {};

  // Honeypot: gizli alan botlar tarafından doldurulur, insan kullanıcı görmez.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  if (!body.name || !body.name.trim()) {
    return res.status(400).json({ ok: false, error: "Ad soyad zorunludur." });
  }
  if (!isValidPhone(body.phone)) {
    return res.status(400).json({ ok: false, error: "Geçerli bir telefon numarası girin." });
  }

  const submission = {
    name: body.name.trim(),
    phone: body.phone.trim(),
    email: (body.email || "").trim(),
    message: (body.message || "").trim(),
    formType: body.formType === "valuation" ? "Değerleme Talebi" : "İletişim",
    listingId: body.listingId || null,
    createdAt: new Date().toISOString()
  };

  const result = await appendToList("contact:submissions", submission, 200);

  return res.status(200).json({ ok: true, stored: result.stored });
};
