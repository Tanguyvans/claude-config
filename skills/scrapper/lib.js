const fs = require("fs");
const path = require("path");

const API_KEY = process.env.SCRAPECREATORS_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BASE = "https://api.scrapecreators.com";

function loadConfig() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
  );
}

async function sc(pathname, params = {}) {
  if (!API_KEY) throw new Error("Missing SCRAPECREATORS_API_KEY");
  const url = new URL(BASE + pathname);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { "x-api-key": API_KEY } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${url.pathname}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function gh(pathname, params = {}) {
  const url = new URL("https://api.github.com" + pathname);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GH ${res.status} ${url.pathname}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function safeCall(label, fn) {
  try {
    return await fn();
  } catch (e) {
    console.error(`[skip] ${label}: ${e.message}`);
    return null;
  }
}

function arg(name) {
  const a = process.argv.find((a) => a.startsWith(`--${name}=`));
  return a ? a.split("=").slice(1).join("=") : undefined;
}

module.exports = { loadConfig, sc, gh, safeCall, arg, BASE };
