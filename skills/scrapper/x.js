#!/usr/bin/env node
/**
 * Scrape tweets from the configured X/Twitter accounts.
 * Reads handles + engagement thresholds from config.json.
 *
 * Usage: SCRAPECREATORS_API_KEY=xxx node x.js [--handle=sama] [--min-likes=500]
 * Output: JSON { count, posts: [{platform, author, text, likes, shares, url, posted_at}] }
 */

const { loadConfig, sc, safeCall, arg } = require("./lib");

(async () => {
  const cfg = loadConfig();
  const th = cfg.engagement_threshold.twitter;
  const minLikes = parseInt(arg("min-likes")) || th.likes_min;
  const minRts = parseInt(arg("min-rts")) || th.retweets_min;
  const handles = arg("handle") ? [arg("handle")] : cfg.twitter.accounts || [];

  const all = [];
  for (const handle of handles) {
    const data = await safeCall(`x/${handle}`, () =>
      sc("/v1/twitter/user-tweets", { handle })
    );
    if (!data) continue;
    const tweets = data.tweets || data.data || [];
    for (const t of tweets) {
      const lg = t.legacy || {};
      const likes = lg.favorite_count || 0;
      const rts = lg.retweet_count || 0;
      if (likes < minLikes && rts < minRts) continue;
      all.push({
        platform: "twitter",
        author: handle,
        text: lg.full_text || "",
        likes,
        shares: rts,
        url: t.url || `https://x.com/${handle}/status/${t.rest_id || lg.id_str}`,
        posted_at: lg.created_at,
      });
    }
  }

  all.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  console.log(JSON.stringify({ count: all.length, posts: all }, null, 2));
})().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
