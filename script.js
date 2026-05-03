// Gonsior Gebäudereinigung — interactions
(function () {
  // ─── Service tabs ──────────────────────────────────────────────────────────
  const SERVICES = {
    glas: {
      name: "Glasreinigung",
      blurb: "Streifenfrei und transparent — innen wie außen.",
      items: ["Fenster & Rahmen", "Schaufenster & Vordächer", "Glasfassaden bis ca. 10 m Höhe", "Fensterbänke innen / außen"],
      img: "images/glas.jpeg",
      alt: "Glasreinigung in Essen — streifenfreier Fensterabzieher auf Glasscheibe",
    },
    unterhalt: {
      name: "Unterhaltsreinigung",
      blurb: "Regelmäßige Pflege für Wohnungen, Häuser und Büros.",
      items: ["Reinigung nach Hausfrauenart", "Grundreinigung", "Büro- & Praxisreinigung", "Nach Vereinbarung"],
      img: "images/buero.jpeg",
      alt: "Unterhaltsreinigung in Essen — Büro- und Wohnungsreinigung",
    },
    treppen: {
      name: "Treppenhausreinigung",
      blurb: "Vom Dach bis zum Keller — nach festem Turnus.",
      items: ["Wöchentlich", "14-tägig", "Inkl. Geländer & Briefkästen", "Individuell auf Ihren Bedarf zugeschnitten"],
      img: "images/treppenhaus.jpeg",
      alt: "Treppenhausreinigung in Essen — Treppenhaus mit Reinigungswagen",
    },
    sonder: {
      name: "Sonderleistungen",
      blurb: "Auf Anfrage und je nach Bedarf — flexibel umgesetzt.",
      items: ["Terrassen & Balkone", "Hauseingänge, Einfahrten & Tiefgaragen", "Bauendreinigung", "Einzugs- & Auszugsreinigung"],
      img: "images/sonstiges.jpeg",
      alt: "Sonderleistungen in Essen — Außenreinigung mit Hochdruckreiniger",
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

  // ─── Mobile: Panel direkt unter aktivem Tab platzieren ─────────────────────
  const tabsContainer = document.querySelector(".vb-services-tabs");
  const mobileMQ = window.matchMedia("(max-width: 880px)");
  const panelOriginalNext = panel ? panel.nextSibling : null;
  const panelOriginalParent = panel ? panel.parentNode : null;

  function repositionPanel() {
    if (!panel || !tabsContainer) return;
    if (mobileMQ.matches) {
      const activeTab = tabsContainer.querySelector(".vb-tab.active");
      if (activeTab && activeTab.nextElementSibling !== panel) {
        const after = activeTab.nextSibling;
        if (after) tabsContainer.insertBefore(panel, after);
        else tabsContainer.appendChild(panel);
      }
    } else if (panel.parentNode !== panelOriginalParent) {
      panelOriginalParent.insertBefore(panel, panelOriginalNext);
    }
  }

  // Beim Tab-Wechsel mitziehen
  tabs.forEach((t) => t.addEventListener("click", () => requestAnimationFrame(repositionPanel)));
  if (typeof mobileMQ.addEventListener === "function") {
    mobileMQ.addEventListener("change", repositionPanel);
  } else if (typeof mobileMQ.addListener === "function") {
    mobileMQ.addListener(repositionPanel);
  }
  repositionPanel();

  // ─── Header / Logo: smooth shrinken beim Scrollen (mobil sichtbar) ─────────
  const navEl = document.querySelector(".vb-nav");
  if (navEl) {
    let scrollTicking = false;
    const updateNavScrolled = () => {
      navEl.classList.toggle("is-scrolled", window.scrollY > 24);
      scrollTicking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          scrollTicking = true;
          requestAnimationFrame(updateNavScrolled);
        }
      },
      { passive: true }
    );
    updateNavScrolled();
  }

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
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende',
    }).addTo(map);

    // 15 km Service-Radius — deutlich sichtbar
    const radiusCircle = L.circle(ESSEN_BORBECK, {
      radius: 15000,
      color: "#1f3d2b",
      weight: 2.5,
      opacity: 0.95,
      dashArray: "6 6",
      fillColor: "#1f3d2b",
      fillOpacity: 0.14,
      interactive: false,
    }).addTo(map);

    // Beschriftung des Radius am nördlichen Kreisrand (ca. 15 km nördlich)
    L.marker([51.6106, 6.9711], {
      icon: L.divIcon({
        className: "",
        html: '<div class="gn-map-label gn-map-label--primary">15 km Einsatzradius</div>',
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

    // Auf den 25-km-Kreis zoomen — etwas näher heran, damit die
    // Stadtteilbeschriftungen besser lesbar sind (Kreisrand darf
    // dabei leicht beschnitten sein)
    map.fitBounds(radiusCircle.getBounds(), {
      animate: false,
      padding: [16, 16],
    });
    map.setZoom(map.getZoom() + 1);
  }

  // ─── Consent-System (Drittanbieter-Inhalte erst nach Klick) ─────────────────
  // Speichert die Einwilligung pro Service in localStorage. Inline-Head-Script
  // in index.html liest die Werte vor Render und versteckt entsprechende Gates,
  // damit Stammbesucher kein Flackern sehen.
  const CONSENT_KEY = "gn-consent-v1";

  function getConsent() {
    try {
      const v = JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]");
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }

  function saveConsent(service) {
    const c = getConsent();
    if (c.indexOf(service) === -1) c.push(service);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    } catch (e) {
      /* private mode → consent gilt nur für aktuelle Session */
    }
    document.documentElement.setAttribute("data-consent-" + service, "");
  }

  // ─── Loader: Elfsight Instagram Feed ─────────────────────────────────
  let elfsightLoaded = false;
  function loadElfsight() {
    if (elfsightLoaded) return;
    elfsightLoaded = true;
    const host = document.querySelector('[data-consent-host="elfsight"]');
    if (!host) return;
    host.innerHTML = "";
    const div = document.createElement("div");
    div.className = "elfsight-app-227175ea-2ab7-4c8a-b294-4c328d7ec36c";
    div.setAttribute("data-elfsight-app-lazy", "");
    host.appendChild(div);
    const s = document.createElement("script");
    s.src = "https://static.elfsight.com/platform/platform.js";
    s.async = true;
    document.body.appendChild(s);
  }

  // ─── Loader: OpenStreetMap-Karte (mit Leaflet, dynamisch) ────────────
  let osmLoaded = false;
  function loadOsmMap() {
    if (osmLoaded) return;
    osmLoaded = true;
    const host = document.querySelector('[data-consent-host="osm"]');
    if (!host) return;
    host.innerHTML = "";
    const mapEl = document.createElement("div");
    mapEl.id = "map";
    mapEl.style.width = "100%";
    mapEl.style.height = "100%";
    mapEl.setAttribute("role", "img");
    mapEl.setAttribute("aria-label", "Karte des Einsatzgebiets — 15 km Radius um Essen-Borbeck");
    host.appendChild(mapEl);

    // Leaflet CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    css.crossOrigin = "";
    document.head.appendChild(css);

    // Leaflet JS (mit SRI), bei load → initMap
    const js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    js.crossOrigin = "";
    js.onload = function () { initMap(); };
    document.body.appendChild(js);
  }

  // ─── Init: bereits zugestimmte Services autoladen, Buttons verdrahten ───
  function initConsent() {
    const c = getConsent();
    if (c.indexOf("elfsight") !== -1) loadElfsight();
    if (c.indexOf("osm") !== -1) loadOsmMap();

    document.querySelectorAll("[data-consent-load]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const service = btn.getAttribute("data-consent-load");
        saveConsent(service);
        if (service === "elfsight") loadElfsight();
        else if (service === "osm") loadOsmMap();
      });
    });
  }
  initConsent();

  // ─── Bewertungen: Cards rendern + Modal + Form ──────────────────────────────
  // Cards kommen aus data/reviews.json (Manuel pflegt die Datei nach
  // E-Mail-Eingang). Neueste oben — sortiert nach timestamp absteigend.
  const reviewsGrid = document.querySelector("[data-reviews-grid]");
  const reviewsModal = document.querySelector("[data-reviews-modal]");

  function buildStarsRow(count) {
    const filled = Math.max(0, Math.min(5, parseInt(count, 10) || 0));
    let html = '<span class="vb-review-stars" aria-label="' + filled + ' von 5 Sternen">';
    for (let i = 1; i <= 5; i++) {
      html += '<span class="' + (i <= filled ? "filled" : "empty") + '" aria-hidden="true">★</span>';
    }
    html += '</span>';
    return html;
  }

  function renderReviews() {
    if (!reviewsGrid) return;
    fetch("data/reviews.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        const list = (data && Array.isArray(data.reviews)) ? data.reviews.slice() : [];
        if (!list.length) return;
        // Neueste zuerst (timestamp absteigend; Fallback auf Originalreihenfolge)
        list.sort(function (a, b) {
          const ta = a && a.timestamp ? a.timestamp : "";
          const tb = b && b.timestamp ? b.timestamp : "";
          return tb.localeCompare(ta);
        });
        const frag = document.createDocumentFragment();
        list.forEach(function (r) {
          const card = document.createElement("article");
          card.className = "vb-review-card";

          const bubble = document.createElement("div");
          bubble.className = "vb-review-bubble";
          bubble.innerHTML = buildStarsRow(r.stars);

          const text = document.createElement("p");
          text.className = "vb-review-text";
          text.textContent = r.text || "";
          bubble.appendChild(text);

          const author = document.createElement("div");
          author.className = "vb-review-author";
          const name = document.createElement("span");
          name.className = "vb-review-author-name";
          const initials = r.name || "Anonym";
          name.textContent = r.city ? initials + ", " + r.city : initials;
          author.appendChild(name);

          card.appendChild(bubble);
          card.appendChild(author);
          frag.appendChild(card);
        });
        reviewsGrid.innerHTML = "";
        reviewsGrid.appendChild(frag);
      })
      .catch(function () { /* still: Fallback bleibt */ });
  }
  renderReviews();

  // ─── Modal: open / close + Star-Widget + Submit ─────────────────────────────
  function openModal() {
    if (!reviewsModal) return;
    reviewsModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    // Fokus auf erstes Eingabefeld
    const firstInput = reviewsModal.querySelector("input[name='name']");
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 50);
  }
  function closeModal() {
    if (!reviewsModal) return;
    reviewsModal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-reviews-open]").forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  document.querySelectorAll("[data-reviews-close]").forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && reviewsModal && !reviewsModal.hasAttribute("hidden")) closeModal();
  });

  // Star-Widget: 1-5 Sterne klickbar, Pflichtfeld via hidden input
  const starButtons = document.querySelectorAll(".vb-review-star-btn");
  const starsValueInput = document.querySelector("[data-review-stars-value]");
  function setStars(n) {
    starButtons.forEach(function (b) {
      const v = parseInt(b.getAttribute("data-star"), 10);
      b.classList.toggle("is-active", v <= n);
    });
    if (starsValueInput) starsValueInput.value = String(n);
  }
  starButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      const v = parseInt(b.getAttribute("data-star"), 10);
      setStars(v);
    });
    b.addEventListener("mouseenter", function () {
      const v = parseInt(b.getAttribute("data-star"), 10);
      starButtons.forEach(function (other) {
        const ov = parseInt(other.getAttribute("data-star"), 10);
        other.classList.toggle("is-active", ov <= v);
      });
    });
  });
  const starsRow = document.querySelector("[data-review-stars]");
  if (starsRow) {
    starsRow.addEventListener("mouseleave", function () {
      const current = starsValueInput ? parseInt(starsValueInput.value, 10) || 0 : 0;
      setStars(current);
    });
  }

  // Zeichen-Counter für Bewertungstext
  const reviewText = document.getElementById("review-text");
  const reviewCounter = document.querySelector("[data-review-counter]");
  if (reviewText && reviewCounter) {
    reviewText.addEventListener("input", function () {
      reviewCounter.textContent = reviewText.value.length + " / 600 Zeichen";
    });
  }

  // Submit: AJAX an Formsubmit (gleicher Provider wie Kontaktformular)
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    const submitBtn = reviewForm.querySelector(".vb-review-submit");
    const thanksBox = document.querySelector("[data-review-thanks]");

    function showReviewError(msg) {
      let err = reviewForm.querySelector(".vb-review-form-error");
      if (!err) {
        err = document.createElement("p");
        err.className = "vb-review-form-error";
        reviewForm.insertBefore(err, reviewForm.firstChild);
      }
      err.textContent = msg;
    }

    reviewForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      // Validierung Sterne (HTML-required reicht nicht, da hidden)
      if (!starsValueInput.value) {
        showReviewError("Bitte vergeben Sie eine Sternebewertung.");
        return;
      }
      if (!reviewForm.checkValidity()) {
        reviewForm.reportValidity();
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Wird gesendet …";
      }
      try {
        const fd = new FormData(reviewForm);
        const res = await fetch(reviewForm.action, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        // Erfolg: Form ausblenden, Danke-Box zeigen
        reviewForm.style.display = "none";
        if (thanksBox) thanksBox.removeAttribute("hidden");
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Bewertung absenden <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></svg>';
        }
        showReviewError("Senden fehlgeschlagen. Bitte erneut versuchen oder direkt per E-Mail an dienstleistung-gonsior@web.de.");
      }
    });
  }

  // ─── Contact form: AJAX-Versand via Formsubmit ─────────────────────────────
  // Versendet das Formular automatisch als E-Mail an dienstleistung-gonsior@web.de
  // ohne dass sich der Mail-Client des Nutzers öffnet.
  const form = document.getElementById("contact-form");
  if (form) {
    const submitBtn = form.querySelector(".vb-form-cta");

    function showThanks() {
      const wrap = document.createElement("form");
      wrap.className = "vb-form";
      const thanks = document.createElement("div");
      thanks.className = "vb-form-thanks";
      thanks.innerHTML =
        checkSvg +
        " Vielen Dank — Ihre Anfrage ist auf dem Weg.<br>Wir melden uns innerhalb von 24 Stunden.";
      wrap.appendChild(thanks);
      form.replaceWith(wrap);
    }

    function showError() {
      let err = form.querySelector(".vb-form-error");
      if (!err) {
        err = document.createElement("div");
        err.className = "vb-form-error";
        err.style.cssText =
          "margin:16px 0;padding:14px 16px;border:1px solid #c44;background:#fbecec;color:#7a1a1a;font-size:14px;border-radius:4px;";
        form.insertBefore(err, submitBtn);
      }
      err.textContent =
        "Senden fehlgeschlagen. Bitte rufen Sie uns kurz an: 0152 2914 9388 — oder mailen direkt an dienstleistung-gonsior@web.de.";
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Anfrage absenden";
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Wird gesendet…";
      }
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === "true" || data.success === true)) {
          showThanks();
        } else {
          showError();
        }
      } catch (_) {
        showError();
      }
    });
  }
})();
