# Bildquellen & Lizenzen

Alle eingebundenen Fotos stammen von **[Pexels](https://www.pexels.com)** und
unterliegen der **[Pexels-Lizenz](https://www.pexels.com/license/)**.

Die Pexels-Lizenz erlaubt ausdrücklich:

- ✅ kostenlose Nutzung — auch **kommerziell**
- ✅ Bearbeitung der Fotos
- ✅ keine Namensnennung erforderlich (eine Quellenangabe ist aber willkommen)

Verboten ist:

- ❌ identifizierbare Personen oder Marken in einer für sie verletzenden Weise darzustellen
- ❌ den Eindruck zu erwecken, eine abgebildete Person stehe für ein bestimmtes Produkt/eine Marke
- ❌ den Wiederverkauf oder die Weiterverteilung der Originaldatei (z. B. auf einer Stockfoto-Plattform)

> Quelle und Wortlaut der Lizenz: <https://www.pexels.com/license/>

## Verwendete Bilder

| Datei | Verwendung | Foto-Seite | Fotograf:in |
|---|---|---|---|
| `images/hero-glass-facade.jpg` | Hero-Bereich | <https://www.pexels.com/photo/building-with-clear-glass-panel-windows-1632035/> | Aleksandar Pasaric |
| `images/glasreinigung.jpg` | Service-Tab „Glasreinigung" | <https://www.pexels.com/photo/man-cleaning-the-windows-6197111/> | Tima Miroshnichenko |
| `images/unterhaltsreinigung.jpg` | Service-Tab „Unterhaltsreinigung" | <https://www.pexels.com/photo/person-using-a-vacuum-6195273/> | Tima Miroshnichenko |
| `images/treppenhaus.jpg` | Service-Tab „Treppenhausreinigung" | <https://www.pexels.com/photo/staircase-with-railing-in-modern-apartment-building-5729629/> | Alfin Auzikri |
| `images/sonderleistungen.jpg` | Service-Tab „Sonderleistungen" | <https://www.pexels.com/photo/cleaning-supplies-3616735/> | Karolina Grabowska / Kaboompics |

Die Originale wurden über die offizielle Pexels-CDN als komprimierte JPEGs
(`?auto=compress&cs=tinysrgb&w=1400`) heruntergeladen und unverändert in
diesem Repository abgelegt — abgesehen von der Größenoptimierung durch
Pexels selbst.

## Kein Stockfoto für „Manuel Gonsior"

In der Sektion „Über uns" steht **keine** abgebildete Person aus einer
Stockfoto-Datenbank. Stattdessen ist dort ein neutraler, klar als Platzhalter
gekennzeichneter Bereich mit dem Hinweis **„Foto folgt · Manuel Gonsior"**.

Grund: Eine Stockfoto-Person als Geschäftsinhaber darzustellen wäre
irreführend und nicht von der Pexels-Lizenz gedeckt. Sobald ein echtes Foto
von Manuel Gonsior vorliegt, kann es als `images/manuel-gonsior.jpg`
abgelegt und die Stelle in `index.html` (Sektion „ABOUT", Klasse
`vb-about-card-photo`) gegen ein `<img>` getauscht werden — analog zu den
übrigen Photo-Containern.

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
