#!/usr/bin/env node
/**
 * Run all scrapers in parallel and emit a merged JSON.
 *
 * Usage:
 *   node all.js                       # all platforms
 *   node all.js --only=twitter,github # subset
 *   node all.js --skip=instagram      # skip one
 */

const { spawn } = require("child_process");
const path = require("path");
const { arg } = require("./lib");

const PLATFORMS = ["twitter", "tiktok", "instagram", "github"];
const FILE = {
  twitter: "x.js",
  tiktok: "tiktok.js",
  instagram: "instagram.js",
  github: "github.js",
};

function runScript(file) {
  return new Promise((resolve) => {
    const p = spawn("node", [path.join(__dirname, file)], {
      env: process.env,
      stdio: ["ignore", "pipe", "inherit"],
    });
    let out = "";
    p.stdout.on("data", (d) => (out += d.toString()));
    p.on("close", () => {
      try {
        resolve(JSON.parse(out));
      } catch {
        resolve({ count: 0, error: "parse_failed" });
      }
    });
  });
}

(async () => {
  const only = (arg("only") || "").split(",").filter(Boolean);
  const skip = (arg("skip") || "").split(",").filter(Boolean);
  const selected = PLATFORMS.filter(
    (p) => (only.length === 0 || only.includes(p)) && !skip.includes(p)
  );

  const results = await Promise.all(
    selected.map(async (p) => [p, await runScript(FILE[p])])
  );

  const merged = {
    generated_at: new Date().toISOString(),
    platforms: Object.fromEntries(results),
  };
  console.log(JSON.stringify(merged, null, 2));
})();
