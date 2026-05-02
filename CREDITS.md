# Bildquellen & Lizenzen

## Service-Fotos (Adobe Stock — lizenziert)

Vom Auftraggeber bei Adobe Stock gekauft, Quelldateien geliefert im
Ordner `images/Neue Finale Fotos/`. Im Repo eingebunden in optimierter
Form (max. 1600 px Kantenlänge, JPEG q78).

| Datei | Verwendung | Quelle | Status |
|---|---|---|---|
| `images/glas.jpeg` | Service-Tab „Glasreinigung" | Adobe Stock | ✅ lizenziert |
| `images/buero.jpeg` | Service-Tab „Unterhaltsreinigung" | Adobe Stock | ✅ lizenziert |
| `images/treppenhaus.jpeg` | Service-Tab „Treppenhausreinigung" | Adobe Stock | ✅ lizenziert |
| `images/sonstiges.jpeg` | Service-Tab „Sonderleistungen" | Adobe Stock | ✅ lizenziert |

**Wichtig:** Lizenzbeleg/Rechnung archivieren — Adobe verlangt im
Streitfall Nachweis. Adobe-Stock-IDs am besten in dieser Tabelle
nachtragen, wenn du die Rechnungen zur Hand hast.

## Hero-Foto

| Datei | Verwendung | Quelle | Status |
|---|---|---|---|
| `images/hero.jpeg` | Hero | vom Auftraggeber bereitgestellt | ✅ |

(Konvertiert aus `images/Neuer Hero.png` zu JPEG q78, 1983×793.)

## Foto „Manuel Gonsior"

Datei: `images/manuel.jpg` (aus `images/manuel.heic` zu JPEG q80, max
1600 px konvertiert). Echtes Foto des Inhabers, vom Auftraggeber
bereitgestellt — keine Stockfoto-Quelle. Verwendet in zwei Stellen
auf `index.html`:

- Sektion „Über uns" (Klasse `.vb-about-card-photo`)
- Sektion „Kontakt" (Klasse `.vb-contact-owner-portrait`)

## Karte: OpenStreetMap

Die interaktive Karte im Bereich „Einsatzgebiet" lädt Tiles von
**OpenStreetMap** und wird mit der Bibliothek **Leaflet** dargestellt.

| Komponente | Quelle | Lizenz |
|---|---|---|
| Karten-Tiles | <https://www.openstreetmap.org> | © OpenStreetMap-Mitwirkende, [ODbL](https://www.openstreetmap.org/copyright) |
| Leaflet (JS/CSS) | <https://leafletjs.com> | [BSD-2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) |

Die Attributionspflicht der ODbL ist erfüllt: Auf der Karte selbst wird
unten rechts dauerhaft „© OpenStreetMap-Mitwirkende" eingeblendet
(Standard-Verhalten von Leaflet, nicht entfernt).

> Bei stark gestiegener Reichweite empfiehlt OSM den Wechsel auf einen
> dedizierten Tile-Anbieter (z. B. MapTiler, Stadia Maps, Carto). Für
> einen kleinen Geschäfts-Onepager ist die direkte Nutzung der OSM-Tiles
> jedoch ausdrücklich gestattet — siehe
> <https://operations.osmfoundation.org/policies/tiles/>.

## Schriftarten

Geladen über Google Fonts (Open Font License):

- **Instrument Serif** — <https://fonts.google.com/specimen/Instrument+Serif>
- **Inter** — <https://fonts.google.com/specimen/Inter>
- **JetBrains Mono** — <https://fonts.google.com/specimen/JetBrains+Mono>
