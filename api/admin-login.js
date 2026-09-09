const { checkPassword, createSessionCookie } = require("./_lib/auth");

module.exports = (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Yalnızca POST desteklenir." });
  }
  const { password } = req.body || {};
  if (!checkPassword(password)) {
    return res.status(401).json({ ok: false, error: "Şifre hatalı." });
  }
  res.setHeader("Set-Cookie", createSessionCookie());
  return res.status(200).json({ ok: true });
};
