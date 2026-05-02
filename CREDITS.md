# Bildquellen & Lizenzen

> ⚠️ **Wichtig:** Die aktuell eingebundenen Hero- und Leistungs-Fotos sind
> **Adobe-Stock-Comps (Vorschau-Versionen mit Wasserzeichen)**. Diese sind
> laut Adobes Lizenzbedingungen ausschließlich zur **Layout-Prüfung vor
> dem Lizenzkauf** zulässig — nicht zur dauerhaften öffentlichen
> Veröffentlichung. **Vor finalem Go-Live müssen die lizenzierten
> Originaldateien gekauft und ausgetauscht werden.**
>
> Quelle: <https://stock.adobe.com/de/license-terms>

## Adobe-Stock-Comps (zum Tausch nach Lizenzkauf)

| Datei | Verwendung | Adobe-Stock-ID | Status |
|---|---|---|---|
| `images/hero.jpeg` | Hero | _siehe Hinweis unten_ | Comp — Lizenzkauf nötig |
| `images/glas.jpeg` | Service-Tab „Glasreinigung" | _siehe Hinweis unten_ | Comp — Lizenzkauf nötig |
| `images/buero.jpeg` | Service-Tab „Unterhaltsreinigung" | **AdobeStock_348074919** (Reinigung Bürofläche) | Comp — Lizenzkauf nötig |
| `images/treppenhaus.jpeg` | Service-Tab „Treppenhausreinigung" | **AdobeStock_192004734** (Reinigungswagen Treppenhaus) | Comp — Lizenzkauf nötig |
| `images/sonstiges.jpeg` | Service-Tab „Sonderleistungen" | **AdobeStock_196162735** (Hochdruckreinigung Außenbereich) | Comp — Lizenzkauf nötig |

**Hinweis zu `hero.jpeg` und `glas.jpeg`:** Diese Dateien wurden vom
Auftraggeber direkt in den `images/`-Ordner gelegt und stimmen nicht mit
den im Chat geprüften Comps überein (anderer Hash). Die Adobe-Stock-IDs
müssen vom Auftraggeber bestätigt werden — am einfachsten ablesbar an dem
Wasserzeichen im Bild selbst (Format: `AdobeStock_<Zahl>`).

### Workflow zum Austauschen nach Kauf

1. Bild bei [Adobe Stock](https://stock.adobe.com) lizenzieren
2. Originaldatei (ohne Wasserzeichen, in höherer Auflösung) herunterladen
3. Unter gleichem Dateinamen im `images/`-Ordner speichern (überschreibt die Comp)
4. Lizenzbeleg/Rechnung archivieren — Adobe verlangt im Streitfall Nachweis
5. In dieser Datei den Status auf „lizenziert" ändern und das Kaufdatum eintragen

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
