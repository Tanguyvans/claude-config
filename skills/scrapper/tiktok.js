#!/usr/bin/env node
/**
 * Scrape TikTok videos from configured accounts and hashtags.
 *
 * Usage: SCRAPECREATORS_API_KEY=xxx node tiktok.js [--handle=x] [--hashtag=y]
 */

const { loadConfig, sc, safeCall, arg } = require("./lib");

(async () => {
  const cfg = loadConfig();
  const th = cfg.engagement_threshold.tiktok;
  const handles = arg("handle") ? [arg("handle")] : cfg.tiktok.accounts || [];
  const tags = arg("hashtag") ? [arg("hashtag")] : cfg.tiktok.hashtags || [];

  const all = [];

  for (const handle of handles) {
    const data = await safeCall(`tt/${handle}`, () =>
      sc("/v3/tiktok/profile/videos", { handle })
    );
    if (!data) continue;
    const vids = data.aweme_list || data.videos || data.data || [];
    for (const v of vids) {
      const stats = v.statistics || v.stats || {};
      const diggs = stats.digg_count || stats.diggs || 0;
      const views = stats.play_count || stats.plays || 0;
      if (diggs < th.diggs_min && views < th.views_min) continue;
      const created = (v.create_time || v.createTime || 0) * 1000;
      all.push({
        platform: "tiktok",
        author: handle,
        text: v.desc || v.description || "",
        likes: diggs,
        views,
        url: v.share_url || `https://www.tiktok.com/@${handle}/video/${v.aweme_id || v.id}`,
        posted_at: created ? new Date(created).toISOString() : null,
      });
    }
  }

  for (const tag of tags) {
    const data = await safeCall(`tt#${tag}`, () =>
      sc("/v1/tiktok/search/hashtag", { hashtag: tag })
    );
    if (!data) continue;
    const vids = data.videos || data.data || [];
    for (const v of vids.slice(0, 20)) {
      const diggs = v.diggCount || v.likes || 0;
      if (diggs < th.diggs_min) continue;
      all.push({
        platform: "tiktok",
        author: v.author || `#${tag}`,
        text: v.desc || "",
        likes: diggs,
        views: v.playCount || 0,
        url: v.url || v.share_url || "",
        posted_at: v.createTime
          ? new Date(v.createTime * 1000).toISOString()
          : null,
        hashtag: tag,
      });
    }
  }

  all.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  console.log(JSON.stringify({ count: all.length, posts: all }, null, 2));
})().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
