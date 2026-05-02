# Instagram-Feed einrichten

Damit der GitHub-Action-Workflow `.github/workflows/instagram-sync.yml`
täglich Posts von **@ggd_gebaeudereinigung** abrufen und auf der Website
darstellen kann, muss einmalig die Verbindung zur **Instagram Graph API**
hergestellt werden.

Dauer: ca. 30 Minuten · Wiederkehrender Aufwand: alle 60 Tage Token erneuern (1 Min)

---

## Voraussetzung

Der Instagram-Account muss ein **Business**- oder **Creator**-Account sein
und mit einer **Facebook-Seite** verknüpft. Persönliche IG-Accounts können
die Graph API nicht nutzen.

### Falls noch privater Account:

1. Instagram-App öffnen → Profil → Menü → **Einstellungen und Privatsphäre**
2. **Konto** → **Kontotyp und Tools** → **Auf professionelles Konto umstellen**
3. Kategorie wählen (z. B. „Reinigungsservice")
4. Typ: **Unternehmen** (besser als Creator für Dienstleister)
5. Verknüpfung mit Facebook-Page anbieten lassen — falls noch keine FB-Page existiert,
   während des Setups eine neue anlegen (kann simpel sein, muss aber existieren).

---

## Schritt-für-Schritt

### 1. Meta-Developer-App anlegen

1. https://developers.facebook.com/apps öffnen, mit Facebook-Account einloggen
2. **Meine Apps** → **App erstellen**
3. App-Typ: **Business**
4. App-Name: z. B. „Gonsior Website Sync"
5. Geschäfts-Konto wählen (oder neues anlegen)

### 2. Produkte hinzufügen

In der App-Übersicht:
- **„Instagram Graph API"** suchen → **Einrichten**
- Optional: **„Webhooks"** überspringen — brauchen wir nicht

### 3. Instagram-Account verbinden

In der linken Navigation:
- **App-Einstellungen** → **Erweitert** → bestätigen, dass Datenverwendung "Read" ausreicht
- **Instagram-Tester hinzufügen**: Geht im **Graph API Explorer** (siehe Schritt 4)

### 4. Access-Token holen (Graph API Explorer)

1. https://developers.facebook.com/tools/explorer öffnen
2. Oben rechts: gerade erstellte App auswählen
3. **User or Page**: Auf **Get User Access Token** klicken
4. Berechtigungen wählen:
   - `instagram_basic`
   - `instagram_manage_insights` *(optional, für spätere Erweiterung)*
   - `pages_show_list`
   - `pages_read_engagement`
   - `business_management`
5. **Generate Access Token** → Facebook-Login bestätigen, IG-Konto/FB-Page auswählen
6. **Den angezeigten Token kopieren** (gilt nur ~1 Stunde — gleich umtauschen)

### 5. Long-lived Token erzeugen (60 Tage statt 1 Stunde)

In Terminal (cURL) — `<APP_ID>`, `<APP_SECRET>` und `<KURZER_TOKEN>` ersetzen:

```bash
curl -G "https://graph.facebook.com/v21.0/oauth/access_token" \
  -d "grant_type=fb_exchange_token" \
  -d "client_id=<APP_ID>" \
  -d "client_secret=<APP_SECRET>" \
  -d "fb_exchange_token=<KURZER_TOKEN>"
```

App-ID + Secret findest du in der Meta-Dev-Console unter
**App-Einstellungen → Allgemein**.

Antwort enthält `access_token` — **das ist der long-lived Token**.

### 6. Instagram-Business-User-ID herausfinden

Mit dem long-lived Token:

```bash
# 1. Page-ID holen (wir nehmen die erste verbundene Page)
curl "https://graph.facebook.com/v21.0/me/accounts?access_token=<LONG_TOKEN>"

# 2. Mit der Page-ID die IG-Business-Account-ID holen
curl "https://graph.facebook.com/v21.0/<PAGE_ID>?fields=instagram_business_account&access_token=<LONG_TOKEN>"
```

Die Antwort enthält `instagram_business_account.id` — **das ist die `IG_USER_ID`** (numerisch).

### 7. Beide Werte als GitHub-Secrets hinterlegen

1. Auf GitHub → Repo `gonsior-gebaeudereinigung-final` → **Settings**
2. Linke Navigation: **Secrets and variables** → **Actions**
3. **New repository secret**, zwei Mal anlegen:
   - Name `IG_ACCESS_TOKEN` · Value: der long-lived Token aus Schritt 5
   - Name `IG_USER_ID` · Value: die ID aus Schritt 6
4. Speichern.

### 8. Workflow manuell testen

1. Repo → **Actions**-Tab → **Instagram Sync** in der linken Liste
2. Rechts oben **Run workflow** → **Run workflow** bestätigen
3. Nach 30–90 Sekunden sollte der Lauf grün sein
4. Im Repo prüfen:
   - `data/instagram.json` enthält jetzt Posts (vorher leer)
   - `images/insta/*.jpg` enthält die Bilder
5. Live-Site neu laden → die Sektion „Einblicke aus dem Alltag" zeigt die Posts.

Ab dem Punkt läuft der Sync automatisch jeden Morgen.

---

## Token-Pflege (alle ~60 Tage)

Der Long-lived-Token läuft nach 60 Tagen ab — aber wenn der Workflow
**innerhalb dieser 60 Tage** mindestens einmal lief, verlängert er sich
automatisch. Er sollte also nie ablaufen, solange der Cron läuft.

Falls doch — Action schlägt fehl mit **HTTP 190** (Token expired):
1. Schritte 4–5 wiederholen (kurzen Token holen, in long-lived umtauschen)
2. GitHub-Secret `IG_ACCESS_TOKEN` aktualisieren
3. Workflow manuell anstoßen

---

## DSGVO-Hinweis

Diese Lösung speichert die Bilder **lokal im Repo** und liefert sie über
GitHub Pages aus. Beim Seitenbesuch werden **keine Daten an Meta-Server
übertragen** — der einzige Server-Kontakt mit Meta passiert serverseitig
im GitHub-Action-Lauf, nicht im Browser des Besuchers.

Trotzdem in der Datenschutzerklärung erwähnen, dass:
- Ein Instagram-Feed dargestellt wird (Posts vom eigenen Account)
- Bilder lokal zwischengespeichert sind
- Beim Klick auf einen Post **Daten an Meta** übertragen werden (durch das
  Öffnen des Originalposts auf instagram.com)

---

## Ausschalten / Pausieren

- **Vorübergehend pausieren:** GitHub-Repo → **Actions** → **Instagram Sync** →
  **Disable workflow**
- **Komplett entfernen:** Workflow-Datei `.github/workflows/instagram-sync.yml`
  und Secrets löschen. Die Sektion auf der Website zeigt dann wieder den
  „Folge uns"-Fallback.
