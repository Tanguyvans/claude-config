#!/usr/bin/env node
/**
 * Scrape Instagram posts from configured accounts.
 *
 * Usage: SCRAPECREATORS_API_KEY=xxx node instagram.js [--handle=x]
 */

const { loadConfig, sc, safeCall, arg } = require("./lib");

(async () => {
  const cfg = loadConfig();
  const th = cfg.engagement_threshold.instagram;
  const handles = arg("handle") ? [arg("handle")] : cfg.instagram.accounts || [];

  const all = [];
  for (const handle of handles) {
    const profile = await safeCall(`ig-profile/${handle}`, () =>
      sc("/v1/instagram/profile", { handle })
    );
    const userId = profile?.user?.pk || profile?.id || profile?.user_id;
    if (!userId) continue;
    const data = await safeCall(`ig/${handle}`, () =>
      sc("/v2/instagram/user/posts", { user_id: userId })
    );
    if (!data) continue;
    const posts = data.items || data.posts || data.data || [];
    for (const p of posts) {
      const likes = p.like_count || p.likes || 0;
      if (likes < th.likes_min) continue;
      const created = (p.taken_at || 0) * 1000;
      all.push({
        platform: "instagram",
        author: handle,
        text: p.caption?.text || p.caption || "",
        likes,
        url: p.permalink || `https://www.instagram.com/p/${p.code || p.shortcode}/`,
        posted_at: created ? new Date(created).toISOString() : null,
      });
    }
  }

  all.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  console.log(JSON.stringify({ count: all.length, posts: all }, null, 2));
})().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
