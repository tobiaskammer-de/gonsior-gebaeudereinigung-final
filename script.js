// Gonsior Gebäudereinigung — interactions
(function () {
  // ─── Service tabs ──────────────────────────────────────────────────────────
  const SERVICES = {
    glas: {
      name: "Glasreinigung",
      blurb: "Streifenfrei und transparent — innen wie außen.",
      items: ["Fenster & Rahmen", "Schaufenster & Vordächer", "Wintergärten & Glasfassaden", "Fensterbänke innen / außen"],
      img: "images/glas.jpeg",
      alt: "Glasreinigung — professioneller Fensterputz",
    },
    unterhalt: {
      name: "Unterhaltsreinigung",
      blurb: "Regelmäßige Pflege für Wohnungen, Häuser und Büros.",
      items: ["Reinigung nach Hausfrauenart", "Grundreinigung", "Büro- & Praxisreinigung", "Nach Vereinbarung"],
      img: "images/buero.jpeg",
      alt: "Unterhaltsreinigung — professionelle Büro- und Wohnungsreinigung",
    },
    treppen: {
      name: "Treppenhausreinigung",
      blurb: "Vom Dach bis zum Keller — nach festem Turnus.",
      items: ["Wöchentlich", "14-tägig", "Monatlich", "Inkl. Geländer & Briefkästen"],
      img: "images/treppenhaus.jpeg",
      alt: "Treppenhausreinigung — Treppenhaus mit Reinigungswagen",
    },
    sonder: {
      name: "Sonderleistungen",
      blurb: "Auf Anfrage und je nach Bedarf — flexibel umgesetzt.",
      items: ["Terrassen & Balkone", "Bauendreinigung", "Einzugs- & Auszugsreinigung", "Individuelle Aufträge"],
      img: "images/sonstiges.jpeg",
      alt: "Sonderleistungen — Außenreinigung mit Hochdruckreiniger",
    },
  };

  const ORDER = ["glas", "unterhalt", "treppen", "sonder"];
  const checkSvg =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
    '<path d="M2 7 L6 11 L12 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';

  const tabs = document.querySelectorAll(".vb-tab");
  const panel = document.querySelector(".vb-tab-panel");
  const titleEl = document.querySelector("[data-panel-title]");
  const blurbEl = document.querySelector("[data-panel-blurb]");
  const itemsEl = document.querySelector("[data-panel-items]");
  const eyebrowEl = document.querySelector("[data-panel-eyebrow]");
  const photoEl = document.querySelector("[data-panel-photo]");
  const imgEl = document.querySelector("[data-panel-img]");

  // Vorladen, damit der Crossfade beim Hover ohne Verzögerung wirkt
  Object.values(SERVICES).forEach((s) => {
    if (s.img) { const i = new Image(); i.src = s.img; }
  });

  let currentTab = null;
  let fadeTimer = null;
  const FADE_MS = 160;

  function applyTabContent(data, idx) {
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

  function setTab(key) {
    if (currentTab === key) return;
    const data = SERVICES[key];
    if (!data) return;
    const idx = ORDER.indexOf(key);
    const isFirst = currentTab === null;
    currentTab = key;

    // Tab-Button-Status sofort umschalten — direktes visuelles Feedback
    tabs.forEach((t) => {
      const active = t.dataset.tab === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (isFirst || !panel) {
      // Erste Initialisierung ohne Fade
      applyTabContent(data, idx);
      return;
    }

    // Sanfter Crossfade: kurz dimmen → tauschen → wieder hochblenden
    if (fadeTimer) clearTimeout(fadeTimer);
    panel.classList.add("is-fading");
    fadeTimer = setTimeout(() => {
      applyTabContent(data, idx);
      panel.classList.remove("is-fading");
    }, FADE_MS / 2);
  }

  // Hover öffnet das Feld; Klick als Fallback (Touch / Tastatur via :focus)
  tabs.forEach((t) => {
    t.addEventListener("mouseenter", () => setTab(t.dataset.tab));
    t.addEventListener("focus", () => setTab(t.dataset.tab));
    t.addEventListener("click", () => setTab(t.dataset.tab));
  });
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

  // ─── Smooth-Scroll für Anchor-Links mit easeInOutCubic ────────────────────
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    let startTime = null;
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function handleAnchorClick(e) {
    const a = e.currentTarget;
    const href = a.getAttribute("href") || "";
    if (href.length < 2 || href[0] !== "#") return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    // Sticky-Nav-Höhe als Offset abziehen, damit der Anker sichtbar bleibt
    const nav = document.querySelector(".vb-nav");
    const navOffset = nav ? nav.offsetHeight + 8 : 80;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;

    // Distanzabhängige Dauer für angenehmes Tempo
    const distance = Math.abs(targetY - (window.scrollY || 0));
    const duration = Math.max(420, Math.min(900, 320 + distance * 0.35));

    smoothScrollTo(targetY, duration);
    if (history.pushState) history.pushState(null, "", "#" + id);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", handleAnchorClick);
  });

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

    // 25 km Service-Radius — deutlich sichtbar
    const radiusCircle = L.circle(ESSEN_BORBECK, {
      radius: 25000,
      color: "#1f3d2b",
      weight: 2.5,
      opacity: 0.95,
      dashArray: "6 6",
      fillColor: "#1f3d2b",
      fillOpacity: 0.14,
      interactive: false,
    }).addTo(map);

    // Beschriftung des Radius am nördlichen Kreisrand
    L.marker([51.7006, 6.9711], {
      icon: L.divIcon({
        className: "",
        html: '<div class="gn-map-label gn-map-label--primary">25 km Einsatzradius</div>',
        iconSize: null,
        iconAnchor: [70, 12],
      }),
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

    // Auf den 25-km-Kreis zoomen, damit der Radius komplett sichtbar ist
    map.fitBounds(radiusCircle.getBounds(), {
      animate: false,
      padding: [16, 16],
    });
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
