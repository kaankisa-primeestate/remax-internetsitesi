const crypto = require("crypto");

const COOKIE_NAME = "remax_admin";
const SESSION_HOURS = 8;

function getSecret() {
  return (
    process.env.ADMIN_SECRET ||
    crypto.createHash("sha256").update(getPassword()).digest("hex")
  );
}

function getPassword() {
  return process.env.ADMIN_PASSWORD || "remaxprime-2026-degistir";
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || token.indexOf(".") === -1) return null;
  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (payload.exp < Date.now()) return null;
  return payload;
}

function checkPassword(candidate) {
  const expected = getPassword();
  const a = Buffer.from(String(candidate || ""));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function createSessionCookie() {
  const token = sign({ exp: Date.now() + SESSION_HOURS * 3600 * 1000 });
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}`;
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

function isAuthenticated(req) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.indexOf(COOKIE_NAME + "=") === 0);
  if (!match) return false;
  const token = match.slice(COOKIE_NAME.length + 1);
  return !!verify(token);
}

module.exports = { checkPassword, createSessionCookie, clearSessionCookie, isAuthenticated, COOKIE_NAME };
