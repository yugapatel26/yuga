/* ===========================================================
   Hash-routed tabbed "dashboard".
   Clicking a nav item swaps the visible view (no long scroll).
   Real URL hashes (#about, #experience, ...) so refresh, deep
   links, and the back/forward buttons all work.
   =========================================================== */

// view id -> document title (empty/unknown hash falls back to "about")
const VIEWS = {
  about: "Yuga Patel",
  experience: "Experience — Yuga Patel",
  projects: "Projects — Yuga Patel",
  contact: "Contact — Yuga Patel",
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function currentView() {
  const id = location.hash.replace(/^#/, "");
  return VIEWS[id] ? id : "about";
}

function render(focusHeading) {
  const view = currentView();

  // Show only the matching view
  document.querySelectorAll(".view").forEach((sec) => {
    sec.classList.toggle("is-visible", sec.id === "view-" + view);
  });

  // Sync active nav tab
  document.querySelectorAll(".nav__tabs a").forEach((a) => {
    const match = a.getAttribute("href") === "#" + view;
    a.classList.toggle("is-active", match);
    if (match) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  document.title = VIEWS[view];
  window.scrollTo(0, 0);

  // Move focus to the view heading (for keyboard / screen-reader users)
  if (focusHeading) {
    const heading = document.querySelector("#view-" + view + " [tabindex='-1']");
    if (heading) heading.focus({ preventScroll: true });
  }
}

// Wrap view swaps in a View Transition for a subtle cross-fade where supported
function apply() {
  if (document.startViewTransition && !reduceMotion) {
    document.startViewTransition(() => render(true));
  } else {
    render(true);
  }
}

window.addEventListener("hashchange", apply);

// Initial paint (don't steal focus on first load)
render(false);

// ---- "Read more" disclosure ----
const disclosure = document.querySelector(".disclosure");
if (disclosure) {
  disclosure.addEventListener("click", () => {
    const panel = document.getElementById(disclosure.getAttribute("aria-controls"));
    const open = disclosure.getAttribute("aria-expanded") === "true";
    disclosure.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
}

// ---- Click-to-reveal email (assembled to reduce scraping) ----
const revealBtn = document.getElementById("reveal-email");
if (revealBtn) {
  revealBtn.addEventListener("click", () => {
    // EDIT: change these two parts to your real email
    const addr = "yuga" + "@" + "goekpa.com";
    const link = document.createElement("a");
    link.href = "mailto:" + addr;
    link.textContent = addr;
    link.className = "email-link";
    revealBtn.replaceWith(link);
  });
}

// ---- Auto-updating footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
