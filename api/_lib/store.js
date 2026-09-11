/* Kalıcı veri katmanı: Vercel'in Redis entegrasyonu (KV_REDIS_URL) bağlıysa
   oradan okur/yazar. Bağlanana kadar data/*.default.json içindeki örnek
   verilerle salt-okunur çalışır. */
const fs = require("fs");
const path = require("path");

function kvConfigured() {
  return !!process.env.KV_REDIS_URL;
}

function loadDefault(name) {
  const file = path.join(__dirname, "..", "..", "data", `${name}.default.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

let clientPromise = null;
function getClient() {
  if (!clientPromise) {
    const { createClient } = require("redis");
    const client = createClient({
      url: process.env.KV_REDIS_URL,
      socket: { connectTimeout: 5000, reconnectStrategy: false }
    });
    client.on("error", (err) => console.error("Redis Client Error", err));
    clientPromise = client.connect().then(
      () => client,
      (err) => { clientPromise = null; throw err; }
    );
  }
  return clientPromise;
}

async function getCollection(name) {
  if (!kvConfigured()) return loadDefault(name);
  const client = await getClient();
  const raw = await client.get(name);
  if (raw) return JSON.parse(raw);
  const seed = loadDefault(name);
  await client.set(name, JSON.stringify(seed));
  return seed;
}

async function saveCollection(name, items) {
  if (!kvConfigured()) {
    const err = new Error(
      "Kalıcı depolama (Redis) henüz bağlanmadı. Vercel projenizde bir Redis veritabanı oluşturup " +
      "ortam değişkenlerini ekledikten sonra kayıt işlemleri çalışacaktır. Bkz. KURULUM.md"
    );
    err.code = "KV_NOT_CONFIGURED";
    throw err;
  }
  const client = await getClient();
  await client.set(name, JSON.stringify(items));
  return items;
}

async function appendToList(key, item, maxLen) {
  if (!kvConfigured()) return { stored: false };
  const client = await getClient();
  await client.lPush(key, JSON.stringify(item));
  if (maxLen) await client.lTrim(key, 0, maxLen - 1);
  return { stored: true };
}

async function readList(key, limit) {
  if (!kvConfigured()) return [];
  const client = await getClient();
  const raw = await client.lRange(key, 0, (limit || 50) - 1);
  return raw.map((r) => JSON.parse(r));
}

module.exports = { kvConfigured, getCollection, saveCollection, appendToList, readList };
