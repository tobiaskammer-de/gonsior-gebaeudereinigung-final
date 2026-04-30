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
