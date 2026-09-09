/* Kalıcı veri katmanı: Vercel KV bağlıysa oradan okur/yazar.
   Vercel dashboard'dan bir KV veritabanı bağlanana kadar site,
   data/*.default.json içindeki örnek verilerle salt-okunur çalışır. */
const fs = require("fs");
const path = require("path");

function kvConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function loadDefault(name) {
  const file = path.join(__dirname, "..", "..", "data", `${name}.default.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

async function getKv() {
  const { kv } = require("@vercel/kv");
  return kv;
}

async function getCollection(name) {
  if (!kvConfigured()) return loadDefault(name);
  const kv = await getKv();
  const stored = await kv.get(name);
  if (stored && Array.isArray(stored)) return stored;
  const seed = loadDefault(name);
  await kv.set(name, seed);
  return seed;
}

async function saveCollection(name, items) {
  if (!kvConfigured()) {
    const err = new Error(
      "Kalıcı depolama (Vercel KV) henüz bağlanmadı. Vercel projenizde bir KV veritabanı oluşturup " +
      "ortam değişkenlerini ekledikten sonra kayıt işlemleri çalışacaktır. Bkz. KURULUM.md"
    );
    err.code = "KV_NOT_CONFIGURED";
    throw err;
  }
  const kv = await getKv();
  await kv.set(name, items);
  return items;
}

async function appendToList(key, item, maxLen) {
  if (!kvConfigured()) return { stored: false };
  const kv = await getKv();
  await kv.lpush(key, JSON.stringify(item));
  if (maxLen) await kv.ltrim(key, 0, maxLen - 1);
  return { stored: true };
}

async function readList(key, limit) {
  if (!kvConfigured()) return [];
  const kv = await getKv();
  const raw = await kv.lrange(key, 0, (limit || 50) - 1);
  return raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
}

module.exports = { kvConfigured, getCollection, saveCollection, appendToList, readList };
