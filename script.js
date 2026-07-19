/* =========================================================
   Heindrich Burger — Portfolio scripts
   Features: typed terminal intro, dark mode toggle,
   scroll-reveal animations, active nav highlighting,
   mobile menu, auto-updating footer year.
   ========================================================= */

// ----- 1. Typed terminal intro -----
const typeLine = document.getElementById("type-line");
const message =
  "Heindrich Burger — BSc IT student @ NWU.\nSystems analysis · finance · leadership.";

let charIndex = 0;
function typeNextChar() {
  if (!typeLine || charIndex >= message.length) return;
  typeLine.textContent += message.charAt(charIndex);
  charIndex++;
  setTimeout(typeNextChar, 38);
}
window.addEventListener("load", () => setTimeout(typeNextChar, 600));

// ----- 2. Dark / light mode toggle -----
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀" : "☾";
}

// Remember the visitor's choice between visits (falls back gracefully if blocked)
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (e) { /* storage unavailable — default to light */ }
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });
}

// ----- 3. Scroll-reveal animations -----
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach((item) => revealObserver.observe(item));

// ----- 4. Highlight the nav link for the section on screen -----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          )
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((section) => sectionObserver.observe(section));

// ----- 5. Mobile menu -----
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-links");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after tapping a link
  navList.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// ----- 6. Footer year -----
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

