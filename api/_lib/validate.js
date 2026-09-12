const PHONE_RE = /^0?5\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRICE_RE = /\d/;

function normalizePhone(v) {
  return String(v || "").replace(/[\s()-]/g, "");
}

function validateListing(payload, isCreate) {
  const errors = [];
  const title = (payload.title || "").trim();
  const price = (payload.price || "").trim();
  const location = (payload.location || "").trim();

  if (title.length < 8) errors.push("İlan başlığı en az 8 karakter olmalı.");
  if (!price || !PRICE_RE.test(price)) errors.push("Fiyat alanı rakam içermeli (örn: ₺ 1.500.000).");
  if (location.length < 3) errors.push("Konum / semt bilgisi girilmeli.");
  if (isCreate) {
    const images = payload.images || [];
    if (!images.length) errors.push("Yeni ilan için en az 1 fotoğraf zorunludur.");
  }

  return { ok: errors.length === 0, errors };
}

function validateAgent(payload, isCreate) {
  const errors = [];
  const name = (payload.name || "").trim();
  const title = (payload.title || "").trim();
  const phone = normalizePhone(payload.phone);
  const email = (payload.email || "").trim();

  if (name.length < 3) errors.push("Ad soyad en az 3 karakter olmalı.");
  if (title.length < 3) errors.push("Unvan / uzmanlık alanı girilmeli.");
  if (!PHONE_RE.test(phone)) errors.push("Telefon numarası geçerli bir Türkiye cep telefonu formatında olmalı (05XX XXX XX XX).");
  if (email && !EMAIL_RE.test(email)) errors.push("E-posta adresi geçerli formatta değil.");

  return { ok: errors.length === 0, errors };
}

module.exports = { validateListing, validateAgent, normalizePhone, PHONE_RE, EMAIL_RE };
