const https = require("https");

const JSONBIN_BIN_ID = "6a396404f5f4af5e291e1ba1";
const JSONBIN_MASTER_KEY = "$2a$10$yNBLs/loHcmJTXqPYaA7uemcXTEF30grUiRI7jHxZM9weW57.wpUG";
const JSONBIN_HOST = "api.jsonbin.io";
const JSONBIN_PATH = `/v3/b/${JSONBIN_BIN_ID}`;

function jsonbinRequest(method, payload) {
  return new Promise((resolve, reject) => {
    const bodyStr = payload ? JSON.stringify(payload) : undefined;
    const headers = {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_MASTER_KEY,
    };
    if (method === "GET") headers["X-Bin-Meta"] = "false";
    if (bodyStr) headers["Content-Length"] = Buffer.byteLength(bodyStr).toString();

    const req = https.request(
      {
        host: JSONBIN_HOST,
        path: method === "GET" ? JSONBIN_PATH + "/latest" : JSONBIN_PATH,
        method,
        headers,
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data || "{}") });
          } catch {
            resolve({ status: res.statusCode, body: {} });
          }
        });
      }
    );
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("JSONBin timeout")); });
    req.on("error", reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

// إعدادات CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

module.exports = async (req, res) => {
  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const current = await jsonbinRequest("GET");
    let total = (current.body && current.body.record && current.body.record.totalWithdrawnUnits) || 0;
    if (typeof total !== "number" || isNaN(total)) total = 0;

    if (req.method === "GET") {
      return res.status(200).json({ totalWithdrawnUnits: total });
    }

    if (req.method === "POST") {
      let bodyData = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => (bodyData += chunk));
        req.on("end", resolve);
      });

      let units = 0;
      try {
        const parsed = JSON.parse(bodyData || "{}");
        units = parseInt(parsed.units, 10);
      } catch {}

      if (!units || units <= 0) {
        return res.status(400).json({ message: "invalid units" });
      }

      const newTotal = total + units;
      await jsonbinRequest("PUT", { totalWithdrawnUnits: newTotal });
      return res.status(200).json({ totalWithdrawnUnits: newTotal });
    }

    return res.status(405).json({ message: "method not allowed" });
  } catch (err) {
    return res.status(502).json({ message: err.message || "counter error" });
  }
};
