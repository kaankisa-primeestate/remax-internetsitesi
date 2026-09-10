const { isAuthenticated } = require("./_lib/auth");
const { getCollection, saveCollection, kvConfigured } = require("./_lib/store");
const { validateAgent } = require("./_lib/validate");

function newId() {
  return "agent-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      const agents = await getCollection("agents");
      return res.status(200).json({ ok: true, agents, kvConfigured: kvConfigured() });
    }

    if (!isAuthenticated(req)) {
      return res.status(401).json({ ok: false, error: "Bu işlem için admin girişi gerekli." });
    }

    const agents = await getCollection("agents");

    if (req.method === "POST") {
      const check = validateAgent(req.body, true);
      if (!check.ok) return res.status(400).json({ ok: false, error: check.errors.join(" ") });
      const item = Object.assign({}, req.body, { id: newId() });
      agents.unshift(item);
      await saveCollection("agents", agents);
      return res.status(201).json({ ok: true, agent: item });
    }

    if (req.method === "PUT") {
      const { id } = req.body || {};
      const idx = agents.findIndex((a) => a.id === id);
      if (idx === -1) return res.status(404).json({ ok: false, error: "Danışman bulunamadı." });
      const merged = Object.assign({}, agents[idx], req.body);
      const check = validateAgent(merged, false);
      if (!check.ok) return res.status(400).json({ ok: false, error: check.errors.join(" ") });
      agents[idx] = merged;
      await saveCollection("agents", agents);
      return res.status(200).json({ ok: true, agent: agents[idx] });
    }

    if (req.method === "DELETE") {
      const id = (req.query && req.query.id) || (req.body && req.body.id);
      const next = agents.filter((a) => a.id !== id);
      await saveCollection("agents", next);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    return res.status(405).json({ ok: false, error: "Desteklenmeyen metod." });
  } catch (e) {
    const status = e.code === "KV_NOT_CONFIGURED" ? 503 : 500;
    return res.status(status).json({ ok: false, error: e.message });
  }
};
