// Gonsior Gebäudereinigung — interactions
(function () {
  // ─── Service tabs ──────────────────────────────────────────────────────────
  const SERVICES = {
    glas: {
      name: "Glasreinigung",
      blurb: "Streifenfrei und transparent — innen wie außen.",
      items: ["Fenster & Rahmen", "Schaufenster & Vordächer", "Wintergärten & Glasfassaden", "Fensterbänke innen / außen"],
      img: "images/glasreinigung.jpg",
      alt: "Glasreinigung — professioneller Fensterputz",
    },
    unterhalt: {
      name: "Unterhaltsreinigung",
      blurb: "Regelmäßige Pflege für Wohnungen, Häuser und Büros.",
      items: ["Reinigung nach Hausfrauenart", "Grundreinigung", "Büro- & Praxisreinigung", "Nach Vereinbarung"],
      img: "images/unterhaltsreinigung.jpg",
      alt: "Unterhaltsreinigung — Reinigungskraft saugt einen Wohnraum",
    },
    treppen: {
      name: "Treppenhausreinigung",
      blurb: "Vom Dach bis zum Keller — nach festem Turnus.",
      items: ["Wöchentlich", "14-tägig", "Monatlich", "Inkl. Geländer & Briefkästen"],
      img: "images/treppenhaus.jpg",
      alt: "Treppenhausreinigung — Treppenhaus eines Mehrfamilienhauses",
    },
    sonder: {
      name: "Sonderleistungen",
      blurb: "Auf Anfrage und je nach Bedarf — flexibel umgesetzt.",
      items: ["Terrassen & Balkone", "Bauendreinigung", "Einzugs- & Auszugsreinigung", "Individuelle Aufträge"],
      img: "images/sonderleistungen.jpg",
      alt: "Sonderleistungen — professionelle Reinigungsutensilien",
    },
  };

  const ORDER = ["glas", "unterhalt", "treppen", "sonder"];
  const checkSvg =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
    '<path d="M2 7 L6 11 L12 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';

  const tabs = document.querySelectorAll(".vb-tab");
  const titleEl = document.querySelector("[data-panel-title]");
  const blurbEl = document.querySelector("[data-panel-blurb]");
  const itemsEl = document.querySelector("[data-panel-items]");
  const eyebrowEl = document.querySelector("[data-panel-eyebrow]");
  const photoEl = document.querySelector("[data-panel-photo]");
  const imgEl = document.querySelector("[data-panel-img]");

  function setTab(key) {
    const idx = ORDER.indexOf(key);
    const data = SERVICES[key];
    if (!data) return;

    tabs.forEach((t) => {
      const active = t.dataset.tab === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (titleEl) titleEl.textContent = data.name;
    if (blurbEl) blurbEl.textContent = data.blurb;
    if (eyebrowEl) eyebrowEl.textContent = "Gewerk 0" + (idx + 1);
    if (photoEl) photoEl.textContent = data.name + " · in Essen";
    if (imgEl && data.img) {
      imgEl.src = data.img;
      imgEl.alt = data.alt || data.name;
    }
    if (itemsEl) {
      itemsEl.innerHTML = data.items
        .map((it) => "<li>" + checkSvg + "<span>" + it + "</span></li>")
        .join("");
    }
  }

  tabs.forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));
  if (tabs.length) setTab("glas");

  // ─── Service chips (contact form) ──────────────────────────────────────────
  const chipsRoot = document.querySelector("[data-chips]");
  if (chipsRoot) {
    const hidden = chipsRoot.parentElement.querySelector('input[name="leistung"]');
    chipsRoot.addEventListener("click", (e) => {
      const btn = e.target.closest(".vb-chip");
      if (!btn) return;
      chipsRoot.querySelectorAll(".vb-chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      if (hidden) hidden.value = btn.dataset.service || btn.textContent.trim();
    });
  }

  // ─── Mobile nav toggle ─────────────────────────────────────────────────────
  const navToggle = document.querySelector(".vb-nav-toggle");
  const navLinks = document.getElementById("primary-nav");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ─── Leaflet / OpenStreetMap ───────────────────────────────────────────────
  // Live, lizenzklare Karte (OSM-Tiles, ODbL, Attribution gesetzt).
  function initMap() {
    if (typeof L === "undefined") return;
    const el = document.getElementById("map");
    if (!el || el.dataset.ready === "1") return;
    el.dataset.ready = "1";

    const ESSEN_BORBECK = [51.4756, 6.9711];

    const map = L.map(el, {
      center: ESSEN_BORBECK,
      zoom: 10,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende',
    }).addTo(map);

    // 25 km Service-Radius
    L.circle(ESSEN_BORBECK, {
      radius: 25000,
      color: "#1f3d2b",
      weight: 1.5,
      opacity: 0.7,
      fillColor: "#1f3d2b",
      fillOpacity: 0.08,
      interactive: false,
    }).addTo(map);

    const labelIcon = (text, primary) =>
      L.divIcon({
        className: "",
        html:
          '<div class="gn-map-label' +
          (primary ? " gn-map-label--primary" : "") +
          '">' +
          text +
          "</div>",
        iconSize: null,
        iconAnchor: [0, 0],
      });

    const cities = [
      { name: "Essen-Borbeck", coords: [51.4756, 6.9711], primary: true },
      { name: "Essen", coords: [51.4556, 7.0116] },
      { name: "Mülheim a.d.R.", coords: [51.4275, 6.8825] },
      { name: "Oberhausen", coords: [51.4969, 6.8517] },
      { name: "Bottrop", coords: [51.5236, 6.9286] },
      { name: "Gladbeck", coords: [51.5722, 6.9856] },
      { name: "Gelsenkirchen", coords: [51.5177, 7.0857] },
    ];

    cities.forEach((c) => {
      L.marker(c.coords, { icon: labelIcon(c.name, c.primary) }).addTo(map);
    });

    map.fitBounds(
      L.latLngBounds(cities.map((c) => c.coords)).pad(0.35),
      { animate: false }
    );
  }

  if (document.readyState === "complete") initMap();
  else window.addEventListener("load", initMap);

  // ─── Contact form: in-page thank-you ───────────────────────────────────────
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      // Allow the mailto: action to fire, but also swap the form for a confirmation.
      // (mailto opens the user's mail client; we still acknowledge in-page.)
      setTimeout(() => {
        const thanks = document.createElement("div");
        thanks.className = "vb-form-thanks";
        thanks.innerHTML =
          checkSvg +
          " Vielen Dank — Ihre Anfrage ist auf dem Weg.<br>Wir melden uns innerhalb von 24 Stunden.";
        form.replaceWith(
          (() => {
            const wrap = document.createElement("form");
            wrap.className = "vb-form";
            wrap.appendChild(thanks);
            return wrap;
          })()
        );
      }, 100);
    });
  }
})();
