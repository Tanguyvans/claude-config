#!/usr/bin/env node
/**
 * Fetch AI-focused trending GitHub repos, bucketed by star tiers.
 * Uses the official GitHub Search API — no ScrapeCreators credits.
 *
 * Usage: node github.js [--days=30] [--topics=llm,ai-agents] [--mode=new|active]
 *
 * Output: tiered buckets (viral / strong / emerging) of up to 5 repos each.
 */

const { loadConfig, gh, safeCall, arg } = require("./lib");

const TIERS = [
  { key: "viral", label: "10k+ stars", min: 10000, take: 5 },
  { key: "strong", label: "5k+ stars", min: 5000, take: 5 },
  { key: "emerging", label: "1k+ stars", min: 1000, take: 5 },
];

(async () => {
  const cfg = loadConfig();
  const days = parseInt(arg("days")) || cfg.github?.days || 30;
  const mode = arg("mode") || cfg.github?.mode || "new"; // "new" = created:>, "active" = pushed:>
  const topicsArg = arg("topics");
  const topics = topicsArg
    ? topicsArg.split(",")
    : cfg.github?.topics || [
        "llm", "ai-agents", "llm-agent", "rag", "agents",
        "ai", "claude", "mcp", "generative-ai", "llmops"
      ];

  const sinceDate = new Date(Date.now() - days * 86400000)
    .toISOString()
    .slice(0, 10);
  const dateOp = mode === "active" ? "pushed" : "created";
  const lowestTierMin = TIERS[TIERS.length - 1].min;

  // Run 1 query per topic at the lowest star threshold — bucket afterwards.
  const allRepos = new Map();
  for (const topic of topics) {
    const q = `topic:${topic} ${dateOp}:>${sinceDate} stars:>=${lowestTierMin}`;
    const data = await safeCall(`gh-${topic}`, () =>
      gh("/search/repositories", {
        q,
        sort: "stars",
        order: "desc",
        per_page: 30,
      })
    );
    for (const r of data?.items || []) {
      if (!allRepos.has(r.id)) allRepos.set(r.id, r);
    }
  }

  const merged = Array.from(allRepos.values()).sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  const serialize = (r) => ({
    platform: "github",
    name: r.full_name,
    description: r.description || "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    topics: r.topics || [],
    url: r.html_url,
    pushed_at: r.pushed_at,
    created_at: r.created_at,
  });

  // Bucket each repo into the first tier whose min it clears (viral > strong > emerging).
  const tiers = Object.fromEntries(TIERS.map((t) => [t.key, []]));
  for (const r of merged) {
    const tier = TIERS.find((t) => r.stargazers_count >= t.min);
    if (tier && tiers[tier.key].length < tier.take) {
      tiers[tier.key].push(serialize(r));
    }
  }

  const out = {
    generated_at: new Date().toISOString(),
    mode: dateOp,
    period_days: days,
    total_found: merged.length,
    tiers: TIERS.map((t) => ({
      key: t.key,
      label: t.label,
      repos: tiers[t.key],
    })),
  };

  console.log(JSON.stringify(out, null, 2));
})().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
