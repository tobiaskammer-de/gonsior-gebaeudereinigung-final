# SEO-Audit · Gonsior Gebäudereinigung

Stand: 2026-05-02 · Live: https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/

Bewertet wird der One-Pager (`index.html`) plus Datenschutz/Impressum. Fokus: **Local SEO** für Essen + westliches Ruhrgebiet.

---

## Was schon stimmt

- `<html lang="de">`, `<meta charset="utf-8">`, Mobile-Viewport ✓
- HTTPS (GitHub Pages) ✓
- Selbst-gehostete Fonts → kein Google-Fonts-DSGVO-Risiko ✓
- Alt-Text auf allen `<img>` ✓
- Heading-Hierarchie sauber: 1× `<h1>`, dann `<h2>` pro Sektion, `<h3>` für Karten
- Lazy-Loading + `fetchpriority="high"` für Hero, `loading="lazy"` für den Rest ✓
- Title-Tag korrekte Länge (~ 90 Zeichen), Brand + Stadt + Leistungen ✓
- Meta-Description vorhanden, Stadt + Leistungen + USP enthalten ✓
- Datenschutz + Impressum verlinkt ✓ (Pflicht in DE)
- Klickbare `tel:` und `mailto:` Links ✓
- NAP (Name/Adresse/Telefon) im Footer + Top-Bar identisch — wichtig für lokale Konsistenz ✓

---

## Kritisch (P0) — sofort beheben

### 1. Keine strukturierten Daten (JSON-LD `LocalBusiness`)
**Impact:** Riesig. Ohne das gibt's keine Rich Results in Google (Sterne, Öffnungszeiten, Telefon-Button), und Google hat es schwerer, die Seite einem Ort zuzuordnen.

**Fix:** Vor `</head>` einbauen — siehe Snippet unten.

### 2. Keine `sitemap.xml`
**Impact:** Google muss die Seite selbst crawlen. Bei einer One-Pager-Site überschaubar, aber Datenschutz + Impressum werden u. U. erst spät indexiert.

**Fix:** Datei `sitemap.xml` im Root anlegen.

### 3. Keine `robots.txt`
**Impact:** Suchmaschinen wissen nicht, wo die Sitemap liegt; manche Crawler verlieren Zeit auf irrelevanten Pfaden.

**Fix:** Datei `robots.txt` im Root anlegen, Sitemap referenzieren.

---

## Wichtig (P1)

### 4. Keine Open-Graph-Tags
WhatsApp-, Facebook-, LinkedIn-Previews zeigen aktuell weder Bild noch Beschreibung. Bei einem lokalen Handwerksbetrieb sind WhatsApp-Weiterempfehlungen ein realer Traffic-Kanal.

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="de_DE" />
<meta property="og:site_name" content="Gonsior Gebäudereinigung" />
<meta property="og:title" content="Gonsior Gebäudereinigung Essen — inhabergeführt seit 2021" />
<meta property="og:description" content="Glas-, Unterhalts-, Treppenhaus-, Tiefgaragen- und Steinreinigung in Essen und im westlichen Ruhrgebiet." />
<meta property="og:url" content="https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/" />
<meta property="og:image" content="https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/images/hero.jpeg" />
<meta property="og:image:width" content="1000" />
<meta property="og:image:height" content="667" />
<meta name="twitter:card" content="summary_large_image" />
```

### 5. Kein `<link rel="canonical">`
Verhindert, dass GitHub-Pages-Default-URL und ggf. eigene Domain als Duplicate Content gewertet werden.

```html
<link rel="canonical" href="https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/" />
```

(Falls bald eigene Domain wie `gonsior-gebaeudereinigung.de` kommt — dann auf die zeigen lassen.)

### 6. Geo-Meta-Tags fehlen
Klein, aber für lokale Suchen ein zusätzliches Signal:

```html
<meta name="geo.region" content="DE-NW" />
<meta name="geo.placename" content="Essen" />
<meta name="geo.position" content="51.4818;6.9533" />
<meta name="ICBM" content="51.4818, 6.9533" />
```

### 7. Title-Tag verwendet noch nicht alle aktualisierten Leistungen
Aktuell: `… Glas, Unterhalt, Treppenhaus · Inhabergeführt seit 2021`
Optional erweitern auf z. B. `… Glas, Unterhalt, Treppenhaus, Tiefgarage` — aber Vorsicht mit Länge (Google schneidet bei ~ 60 Zeichen ab in der SERP). Aktuell ist's am Limit.

---

## Nice to have (P2)

### 8. Alt-Texte um Standort ergänzen
Aktuell: `"Glasreinigung — professioneller Fensterputz"`
Besser für Image-SEO: `"Glasreinigung in Essen — Fensterputz an Mehrfamilienhaus"`

Macht den größten Unterschied bei der Bildersuche, die für Handwerksbetriebe oft Anfragen liefert.

### 9. Externer Leaflet-CSS-Request (`unpkg.com`)
Eine externe Anfrage. Aus Performance- und Privacy-Sicht besser selbst hosten (das CSS ist klein). Kein SEO-Killer.

### 10. Webmanifest fehlt
`apple-touch-icon` ist da, aber kein `site.webmanifest`. Relevant für PWA-„zur Startseite hinzufügen"-Optik. Pure SEO-Auswirkung gering.

### 11. H1 ist brand-poetisch („Ihr Objekt in besten Händen")
Das ist gewollt und liest sich gut — keine Empfehlung, das zu ändern. Die Keywords werden im Lead-Text + H2s abgedeckt. **Behalten.**

### 12. Innere Anker-Links (`#leistungen`, `#kontakt` …) ✓
Sind als „Sprungmarken" für SEO neutral; mit klaren Anchor-Texten ist's gut.

---

## Empfohlene Snippets (zum direkten Übernehmen)

### `JSON-LD LocalBusiness` (vor `</head>`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "Gonsior Gebäudereinigung",
  "image": "https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/images/hero.jpeg",
  "url": "https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/",
  "telephone": "+49-1522-9149388",
  "email": "dienstleistung-gonsior@web.de",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bocholder Straße 23",
    "postalCode": "45355",
    "addressLocality": "Essen",
    "addressRegion": "NW",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4818,
    "longitude": 6.9533
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "07:00",
    "closes": "18:00"
  }],
  "areaServed": [
    {"@type":"City","name":"Essen"},
    {"@type":"City","name":"Mülheim an der Ruhr"},
    {"@type":"City","name":"Oberhausen"},
    {"@type":"City","name":"Bottrop"},
    {"@type":"City","name":"Gelsenkirchen"},
    {"@type":"City","name":"Bochum"}
  ],
  "founder": {"@type":"Person","name":"Manuel Gonsior"},
  "foundingDate": "2021",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Reinigungsleistungen",
    "itemListElement": [
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Glasreinigung"}},
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Unterhaltsreinigung"}},
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Treppenhausreinigung"}},
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Sonderleistungen"}}
    ]
  }
}
</script>
```

### `robots.txt` (Root)

```
User-agent: *
Allow: /

Sitemap: https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/sitemap.xml
```

### `sitemap.xml` (Root)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/</loc>
    <lastmod>2026-05-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/impressum.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://tobiaskammer-de.github.io/gonsior-gebaeudereinigung-final/datenschutz.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## Off-Page (außerhalb dieses Repos, aber wichtig)

1. **Google Business Profile** anlegen/verifizieren — mit denselben NAP-Daten wie Footer.
2. **Bing Places** — kostet 5 Min, kleiner Zusatz-Traffic.
3. **Branchenbucheinträge** mit konsistenter NAP: Gelbe Seiten, Yelp, 11880, Cylex.
4. **Google Search Console** + **Bing Webmaster Tools** verifizieren und Sitemap einreichen.
5. **Eigene Domain** (z. B. `gonsior-gebaeudereinigung.de`) — wirkt seriöser als `*.github.io` und ist in Google-Suchergebnissen vertrauenswürdiger.

---

## Priorisierte Reihenfolge

1. JSON-LD `LocalBusiness` einbauen → Rich Results & Map-Pack möglich
2. `robots.txt` + `sitemap.xml` → schnellere Indexierung
3. Open-Graph + Canonical + Geo-Meta → Link-Previews & lokale Signale
4. Google Business Profile beantragen → größter Off-Page-Hebel
5. Alt-Texte um „Essen" ergänzen → Bildersuche
6. Eigene Domain ziehen, sobald sinnvoll → Vertrauen + Branding
