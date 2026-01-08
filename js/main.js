// Global interactions: navigation, landing CTA, final letter, theme toggle, simple confetti

// Smooth scroll for header nav
document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-scroll-target");
    if (!targetId) return;
    const el = document.querySelector(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Landing CTA → story section
const startJourneyBtn = document.getElementById("start-journey-btn");
if (startJourneyBtn) {
  startJourneyBtn.addEventListener("click", () => {
    const storySection = document.getElementById("story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Cat cards → modal content
document.querySelectorAll(".cat-card").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-modal-id");
    if (!id || typeof window.openModal !== "function") return;
    window.openModal(id);
  });
});

// Final letter → confetti + reveal surprise + fake postcard download
const revealBtn = document.getElementById("reveal-surprise-btn");
const surpriseContent = document.getElementById("surprise-content");

if (revealBtn && surpriseContent) {
  revealBtn.addEventListener("click", () => {
    surpriseContent.classList.remove("hidden");
    launchConfetti();
  });
}

const downloadBtn = document.getElementById("download-postcard-btn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    // Minimal placeholder behavior:
    // In a more advanced version you can integrate html2canvas to export the letter as an image.
    alert(
      "For now, take a screenshot of this letter as your postcard.\n\n(If you want, we can later add real 'download as image' functionality.)"
    );
  });
}

// Lightweight confetti using DOM elements
function launchConfetti() {
  const count = 120;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const left = Math.random() * 100;
    const delay = Math.random() * 1.2;
    const duration = 2.2 + Math.random() * 0.8;
    const rotate = Math.random() * 360;

    piece.style.left = `${left}vw`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.setProperty("--confetti-rotate", `${rotate}deg`);

    fragment.appendChild(piece);
  }

  document.body.appendChild(fragment);

  // Clean up after animation
  setTimeout(() => {
    document.querySelectorAll(".confetti-piece").forEach((el) => el.remove());
  }, 4000);
}

// Theme toggle (light <-> dark / TV Girl mode)
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  const body = document.body;
  if (theme === "dark") {
    body.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "🌙";
  } else {
    body.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌞";
  }
}

function initTheme() {
  const stored = window.localStorage.getItem("kirti-bday-theme");
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
    return;
  }
  // Default to light mode (don't respect system preference)
  applyTheme("light");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentlyDark = document.body.getAttribute("data-theme") === "dark";
    const nextTheme = currentlyDark ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem("kirti-bday-theme", nextTheme);
  });
}

initTheme();

// Safety: ensure any modal is closed on initial load
const initialModalBackdrop = document.getElementById("modal-backdrop");
if (initialModalBackdrop && !initialModalBackdrop.classList.contains("hidden")) {
  initialModalBackdrop.classList.add("hidden");
}
if (typeof window.closeModal === "function") {
  window.closeModal();
}

// ============================================
// EASTER EGGS
// ============================================

// 1. Hidden clickable cat easter egg
const hiddenCatBtn = document.getElementById("hidden-cat-easter-egg");
if (hiddenCatBtn) {
  hiddenCatBtn.addEventListener("click", () => {
    if (typeof window.openModal === "function") {
      window.openModal("hidden-cat-secret", "You Found the Hidden Cat!", 
        "Okay, you actually clicked the tiny floating cat. That's either dedication or you have way too much time. " +
        "Either way, here's your reward: you're officially the kind of person who finds easter eggs. " +
        "Also, Kirti, if you're reading this: you're the main character, even when you don't feel like it. " +
        "Now go back and actually enjoy the birthday page instead of hunting for secrets. (But also, good job.)"
      );
    }
  });
}

// 2. Konami Code easter egg (Up Up Down Down Left Right Left Right B A)
// This triggers a TV Girl-inspired background transformation
const konamiCode = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (konamiCode[konamiIndex] === e.code) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Konami code completed!
      konamiIndex = 0;
      const body = document.body;
      body.classList.add("konami-activated");
      
      // Show a fun message
      if (typeof window.openModal === "function") {
        window.openModal("konami-secret", "🎮 Konami Code Activated!", 
          "You just entered the Konami code. That's either impressive dedication or you're a gamer from the '80s. " +
          "Either way, you've unlocked: TV Girl Mode. The background should now look like a retro show poster. " +
          "Refresh the page to reset it. (Also, who taught you the Konami code? Respect.)"
        );
      }
      
      // Reset after 30 seconds
      setTimeout(() => {
        body.classList.remove("konami-activated");
      }, 30000);
    }
  } else {
    konamiIndex = 0; // Reset on wrong key
  }
});

