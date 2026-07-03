#!/usr/bin/env node
// Announce a published blog post to Bluesky and Mastodon.
//
// Usage:
//   npm run announce <slug> [--dry-run] [--yes]
//
//   <slug>      filename of the post without extension, e.g. adventures_in_ai_2_orra
//   --dry-run   build and print the post, but don't send anything
//   --yes       skip the confirmation prompt
//
// Credentials are read from environment variables (see .env.example):
//   BLUESKY_HANDLE, BLUESKY_APP_PASSWORD
//   MASTODON_INSTANCE, MASTODON_ACCESS_TOKEN
// A platform is skipped if its variables are not set.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline/promises";

const SITE = "https://www.chrisgilbert.dev";
const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

function fail(msg) {
  console.error(`\x1b[31m✖ ${msg}\x1b[0m`);
  process.exit(1);
}

// --- Args -----------------------------------------------------------------
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const slug = args.find((a) => !a.startsWith("--"));
const dryRun = flags.has("--dry-run");
const autoYes = flags.has("--yes");

if (!slug) {
  fail("Missing slug. Usage: npm run announce <slug> [--dry-run] [--yes]");
}

// --- Read & parse the post's frontmatter ----------------------------------
const postPath = join(BLOG_DIR, `${slug}.md`);
let raw;
try {
  raw = await readFile(postPath, "utf8");
} catch {
  fail(`Couldn't read post at ${postPath}. Is the slug correct?`);
}

const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) fail(`No frontmatter found in ${slug}.md`);

function parseFrontmatter(block) {
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let [, key, val] = m;
    val = val.trim().replace(/^["']|["']$/g, ""); // strip wrapping quotes
    data[key] = val;
  }
  return data;
}

const fm = parseFrontmatter(fmMatch[1]);
if (!fm.title) fail("Frontmatter has no title.");
if (fm.draft === "true") {
  fail(`"${slug}" is marked draft: true — refusing to announce a draft.`);
}

const url = `${SITE}/blog/${slug}`;
const message = `${fm.title}\n\n${url}`;

// --- Preview --------------------------------------------------------------
const targets = [];
if (process.env.BLUESKY_HANDLE && process.env.BLUESKY_APP_PASSWORD) targets.push("Bluesky");
if (process.env.MASTODON_INSTANCE && process.env.MASTODON_ACCESS_TOKEN) targets.push("Mastodon");

console.log("\n\x1b[1mPost preview\x1b[0m");
console.log("┌─────────────────────────────────────────────");
message.split("\n").forEach((l) => console.log(`│ ${l}`));
console.log("└─────────────────────────────────────────────");
console.log(`Targets: ${targets.length ? targets.join(", ") : "(none configured)"}\n`);

if (dryRun) {
  console.log("Dry run — nothing sent.");
  process.exit(0);
}

if (targets.length === 0) {
  fail("No platform credentials configured. See .env.example.");
}

if (!autoYes) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question("Send this post? [y/N] ")).trim().toLowerCase();
  rl.close();
  if (answer !== "y" && answer !== "yes") {
    console.log("Aborted.");
    process.exit(0);
  }
}

// --- Bluesky --------------------------------------------------------------
// Bluesky doesn't auto-link text, so we attach a "facet" marking the URL's
// byte range as a link, and a website card embed for a richer preview.
async function postToBluesky() {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_APP_PASSWORD;
  const pds = "https://bsky.social";

  const sessionRes = await fetch(`${pds}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: handle, password }),
  });
  if (!sessionRes.ok) {
    throw new Error(`auth failed (${sessionRes.status}): ${await sessionRes.text()}`);
  }
  const { accessJwt, did } = await sessionRes.json();

  // Compute UTF-8 byte offsets of the URL within the message for the facet.
  const enc = new TextEncoder();
  const byteStart = enc.encode(message.slice(0, message.indexOf(url))).length;
  const byteEnd = byteStart + enc.encode(url).length;

  const record = {
    $type: "app.bsky.feed.post",
    text: message,
    createdAt: new Date().toISOString(),
    facets: [
      {
        index: { byteStart, byteEnd },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: url }],
      },
    ],
    embed: {
      $type: "app.bsky.embed.external",
      external: { uri: url, title: fm.title, description: fm.description || "" },
    },
  };

  const res = await fetch(`${pds}/xrpc/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessJwt}` },
    body: JSON.stringify({ repo: did, collection: "app.bsky.feed.post", record }),
  });
  if (!res.ok) throw new Error(`post failed (${res.status}): ${await res.text()}`);
}

// --- Mastodon -------------------------------------------------------------
// Mastodon auto-links URLs, so we just post the plain text.
async function postToMastodon() {
  const instance = process.env.MASTODON_INSTANCE.replace(/\/$/, "");
  const token = process.env.MASTODON_ACCESS_TOKEN;

  const res = await fetch(`${instance}/api/v1/statuses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status: message, visibility: "public" }),
  });
  if (!res.ok) throw new Error(`post failed (${res.status}): ${await res.text()}`);
}

// --- Send -----------------------------------------------------------------
const jobs = [];
if (process.env.BLUESKY_HANDLE) jobs.push(["Bluesky", postToBluesky]);
if (process.env.MASTODON_INSTANCE) jobs.push(["Mastodon", postToMastodon]);

const results = await Promise.allSettled(jobs.map(([, fn]) => fn()));

let anyFailed = false;
results.forEach((r, i) => {
  const name = jobs[i][0];
  if (r.status === "fulfilled") {
    console.log(`\x1b[32m✓ ${name}\x1b[0m`);
  } else {
    anyFailed = true;
    console.error(`\x1b[31m✖ ${name}: ${r.reason.message}\x1b[0m`);
  }
});

process.exit(anyFailed ? 1 : 0);
