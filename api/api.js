const https = require("https");
const http = require("http");

// --- قائمة البروكسيات الجديدة (تم تحويلها للتنسيق الصحيح) ---
const HTTPS_PROXIES = [
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_94476934_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_85567572_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_33914658_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_05078606_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_63400946_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_97298946_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_51982495_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_88605594_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_61251022_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_97312243_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_97983961_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_35211286_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_65108334_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_80090805_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_32311854_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_51678723_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_48908140_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_74940139_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_05204714_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_76244912_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_26287028_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_41259412_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_00070648_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_03581255_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_61327937_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_02892722_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_92981670_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_70540079_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_51018069_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_42258610_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_43170495_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_15803801_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_13528957_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_82699728_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_17349714_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_43846256_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_73852436_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_92243984_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_75861945_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_11967029_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_62024505_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_40292392_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_31864004_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_23771748_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_15015348_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_47256396_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_57722101_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_01815954_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_86982350_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_86130932_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_64082810_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_34335906_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_73076803_time_5", pass: "5108733" },
  { host: "change4.owlproxy.com", port: 7778, user: "jmeJorI4AM80_custom_zone_EG_st__city_sid_14455579_time_5", pass: "5108733" },
];

// --- دوال مساعدة ---
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const BUILD_IDS = ["AP3A.240905.015","AP4A.250105.002","BP2A.250605.015","BP1A.250505.005","AP2A.240805.005.A1"];
const DEVICE_MODELS = ["CPH2801","SM-G991B","SM-A546E","M2101K6G","Pixel 8"];
const ANDROID_VERSIONS = ["13","14","15"];

function generateDeviceId() { return pick(BUILD_IDS); }
function generateSessionId() { return require("crypto").randomUUID(); }
function generateUserAgent(appVersion) {
  return `Twist-Mobile/${appVersion} (Android; ${pick(ANDROID_VERSIONS)}; ${pick(DEVICE_MODELS)}; music; ar-EG)`;
}

// --- دالة طلب البروكسي ---
function requestViaHttpsProxy(proxy, targetUrl, method, headers, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const targetPort = parsed.port || 443;
    const auth = Buffer.from(`${proxy.user}:${proxy.pass}`).toString("base64");

    const connectReq = http.request({
      host: proxy.host,
      port: proxy.port,
      method: "CONNECT",
      path: `${parsed.hostname}:${targetPort}`,
      headers: {
        "Proxy-Authorization": `Basic ${auth}`,
        "Host": `${parsed.hostname}:${targetPort}`,
      },
    });

    connectReq.setTimeout(25000, () => { connectReq.destroy(); reject(new Error("CONNECT timeout")); });
    connectReq.on("error", reject);

    connectReq.on("connect", (res, socket) => {
      if (res.statusCode !== 200) {
        socket.destroy();
        return reject(new Error(`CONNECT failed: ${res.statusCode}`));
      }

      const req = https.request({
        host: parsed.hostname,
        port: targetPort,
        path: parsed.pathname + (parsed.search || ""),
        method,
        headers: { ...headers, host: parsed.hostname },
        socket,
        agent: false,
      }, (proxyRes) => {
        let data = "";
        proxyRes.on("data", (c) => (data += c));
        proxyRes.on("end", () => resolve({ status: proxyRes.statusCode, body: data }));
      });

      req.setTimeout(30000, () => { req.destroy(); reject(new Error("Request timeout")); });
      req.on("error", reject);
      if (body) req.write(body);
      req.end();
    });

    connectReq.end();
  });
}

// --- دالة المعالج الرئيسية (لا تغيرها) ---
module.exports = async (req, res) => {
  // إعدادات CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    let bodyData = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => (bodyData += chunk));
      req.on("end", resolve);
    });

    const { path: apiPath, method = "GET", headers: clientHeaders = {}, body: clientBody } = JSON.parse(bodyData || "{}");
    if (!apiPath) return res.status(400).json({ message: "missing path" });

    const targetUrl = "https://api.twistmena.com/music" + apiPath;
    const appVersion = "10.10.49";

    const forwardHeaders = {
      "user-agent": generateUserAgent(appVersion),
      "accept": "application/json",
      "accept-encoding": "identity",
      "content-type": "application/json",
      "app_version": appVersion,
      "channel": "mobileapp",
      "platform": "android",
      "accept-language": "ar",
      "device_id": generateDeviceId(),
      "sessionid": generateSessionId(),
      ...clientHeaders,
    };

    const bodyStr = clientBody ? JSON.stringify(clientBody) : undefined;
    if (bodyStr) forwardHeaders["content-length"] = Buffer.byteLength(bodyStr).toString();

    let result;
    let lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        result = await requestViaHttpsProxy(pick(HTTPS_PROXIES), targetUrl, method, forwardHeaders, bodyStr);
        break;
      } catch (e) {
        lastErr = e;
        if (attempt < 2 && (e.message.includes("socket") || e.message.includes("CONNECT") || e.message.includes("timeout") || e.message.includes("ECONNRESET"))) {
          continue;
        }
        throw e;
      }
    }
    if (!result) throw lastErr;

    res.setHeader("content-type", "application/json");
    return res.status(result.status).send(result.body);
  } catch (err) {
    return res.status(502).json({ message: err.message || "proxy error" });
  }
};
