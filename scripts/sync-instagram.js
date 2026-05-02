#!/usr/bin/env node
/**
 * Instagram-Feed-Sync (Graph API → data/instagram.json + images/insta/*.jpg)
 *
 * Wird vom GitHub-Action-Workflow .github/workflows/instagram-sync.yml
 * aufgerufen. Lädt die letzten N Posts und cached die Bilder lokal,
 * damit beim Besuch der Seite keine Requests an Meta-Server gehen.
 *
 * Erwartete Env-Vars:
 *   IG_ACCESS_TOKEN  — Long-lived Access Token aus Meta Developer App
 *   IG_USER_ID       — Instagram Business/Creator User-ID (numerisch)
 *
 * Setup-Anleitung: siehe INSTAGRAM_SETUP.md
 */

import fs from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.IG_ACCESS_TOKEN;
const USER_ID = process.env.IG_USER_ID;
const POST_LIMIT = 12;
const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DATA_FILE = path.join(ROOT, "data", "instagram.json");
const IMG_DIR = path.join(ROOT, "images", "insta");

if (!TOKEN || !USER_ID) {
  console.error(
    "Fehlende Env-Vars. Erforderlich: IG_ACCESS_TOKEN und IG_USER_ID."
  );
  process.exit(1);
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw new Error(`HTTP ${r.status} bei ${url}\n${body.slice(0, 400)}`);
  }
  return r.json();
}

async function downloadImage(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Download fehlgeschlagen (${r.status}): ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main() {
  const url = `https://graph.facebook.com/v21.0/${USER_ID}/media?fields=${FIELDS}&limit=${POST_LIMIT}&access_token=${encodeURIComponent(TOKEN)}`;
  console.log("Hole Instagram-Posts …");
  const data = await fetchJson(url);
  const items = Array.isArray(data.data) ? data.data : [];
  console.log(`  ${items.length} Posts erhalten.`);

  await fs.mkdir(IMG_DIR, { recursive: true });

  // Vorhandene Bilder einlesen, damit wir alte Posts wegräumen
  const existing = new Set(
    (await fs.readdir(IMG_DIR).catch(() => []))
      .filter((f) => /^\d+\.jpg$/.test(f))
  );
  const keep = new Set();

  const posts = [];
  for (const it of items) {
    // Bei Karussell-Posts liefert media_url für Album-Wrapper kein Bild —
    // wir nehmen dann den thumbnail_url-Fallback. Bei VIDEO desgleichen.
    const src = it.media_url || it.thumbnail_url;
    if (!src) {
      console.log(`  Übersprungen (keine Bild-URL): ${it.id}`);
      continue;
    }
    const local = `${it.id}.jpg`;
    keep.add(local);
    try {
      // Nur neu herunterladen, wenn die Datei fehlt
      if (!existing.has(local)) {
        await downloadImage(src, path.join(IMG_DIR, local));
        console.log(`  ↓ ${local}`);
      }
    } catch (e) {
      console.warn(`  Bild-Fehler ${it.id}: ${e.message}`);
      continue;
    }
    posts.push({
      id: it.id,
      type: it.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
      image: `images/insta/${local}`,
      permalink: it.permalink,
      caption: it.caption || "",
      timestamp: it.timestamp,
    });
  }

  // Verwaiste Bilder entfernen (Post wurde auf IG gelöscht)
  for (const f of existing) {
    if (!keep.has(f)) {
      await fs.unlink(path.join(IMG_DIR, f)).catch(() => {});
      console.log(`  ✕ ${f} (verwaist)`);
    }
  }

  const out = {
    updated: new Date().toISOString(),
    posts,
  };
  await fs.writeFile(DATA_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`Geschrieben: ${posts.length} Posts → data/instagram.json`);
}

main().catch((err) => {
  console.error("Sync fehlgeschlagen:", err);
  process.exit(1);
});
