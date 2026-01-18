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

// Final letter → confetti + reveal surprise + postcard download
const revealBtn = document.getElementById("reveal-surprise-btn");
const surpriseContent = document.getElementById("surprise-content");

if (revealBtn && surpriseContent) {
  revealBtn.addEventListener("click", () => {
    surpriseContent.classList.remove("hidden");
    launchConfetti();
  });
}

const downloadBtn = document.getElementById("download-postcard-btn");
const letterCard = document.getElementById("letter-card");

async function downloadPostcard() {
  if (!letterCard) return;

  // If html2canvas is missing for some reason, fall back gracefully
  if (typeof window.html2canvas !== "function") {
    alert(
      "Your browser couldn't load the postcard download helper.\n\n" +
        "Please take a screenshot of this letter as your postcard."
    );
    return;
  }

  try {
    // Slightly increase resolution for a nicer-looking image
    const scale = window.devicePixelRatio || 2;
    const canvas = await window.html2canvas(letterCard, {
      scale,
      useCORS: true,
      backgroundColor: null,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "kirti-birthday-postcard.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Postcard download failed:", err);
    alert(
      "Something went wrong while creating the postcard image.\n\n" +
        "You can still take a screenshot and save it manually."
    );
  }
}

if (downloadBtn) {
  downloadBtn.addEventListener("click", downloadPostcard);
}

// Lightweight confetti using DOM elements
// Detects mobile devices for optimized performance
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 768 && 'ontouchstart' in window);
}

function launchConfetti(count = 120) {
  // Reduce count on mobile devices for better performance
  const isMobile = isMobileDevice();
  // Further reduce max count on mobile for celebration scenarios
  const actualCount = isMobile ? Math.min(count, 50) : count;
  
  // Clean up any existing confetti first to prevent accumulation
  const existingConfetti = document.querySelectorAll(".confetti-piece");
  if (existingConfetti.length > 0) {
    existingConfetti.forEach((el) => el.remove());
  }
  
  const fragment = document.createDocumentFragment();
  // Faster animations on mobile mean shorter cleanup time
  const maxDuration = isMobile ? 1.8 : 2.5;

  for (let i = 0; i < actualCount; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const left = Math.random() * 100;
    const delay = isMobile ? Math.random() * 0.4 : Math.random() * 0.8; // Shorter delay on mobile
    const duration = isMobile ? 1.5 + Math.random() * 0.3 : 2.2 + Math.random() * 0.8; // Faster on mobile
    const rotate = Math.random() * 360;

    piece.style.left = `${left}vw`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.setProperty("--confetti-rotate", `${rotate}deg`);

    fragment.appendChild(piece);
  }

  document.body.appendChild(fragment);

  // Clean up after animation - faster on mobile since animations are shorter
  const cleanupDelay = (isMobile ? maxDuration * 1000 + 200 : maxDuration * 1000) + 500;
  setTimeout(() => {
    const pieces = document.querySelectorAll(".confetti-piece");
    pieces.forEach((el) => el.remove());
  }, cleanupDelay);
}

// Expose confetti globally for easter eggs
window.launchConfetti = launchConfetti;

// ============================================
// SOUND EFFECTS SYSTEM
// ============================================

// Create sound effects using Web Audio API
function playSound(type = "success") {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different easter eggs
    switch (type) {
      case "success":
        // Pleasant chime
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case "achievement":
        // Triumphant fanfare
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.15); // C#5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.3); // E5
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case "konami":
        // Retro game sound
        oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.2);
        oscillator.type = "square";
        gainNode.gain.setValueAtTime(0.35, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case "drink":
        // Bubbly pop sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.15);
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      default:
        oscillator.frequency.value = 523.25;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
  } catch (error) {
    // Silently fail if audio context is not available
    console.log("Audio not available:", error);
  }
}

// Expose sound function globally
window.playSound = playSound;

// ============================================
// ACHIEVEMENT BADGE SYSTEM
// ============================================

function showAchievementBadge(title, emoji = "🎉") {
  const badge = document.createElement("div");
  badge.className = "achievement-badge";
  badge.innerHTML = `
    <div class="achievement-badge-content">
      <span class="achievement-emoji">${emoji}</span>
      <div class="achievement-text">
        <div class="achievement-title">Achievement Unlocked!</div>
        <div class="achievement-name">${title}</div>
      </div>
    </div>
  `;

  document.body.appendChild(badge);

  // Trigger animation
  requestAnimationFrame(() => {
    badge.classList.add("show");
  });

  // Remove after animation
  setTimeout(() => {
    badge.classList.add("hide");
    setTimeout(() => {
      if (badge.parentNode) {
        badge.parentNode.removeChild(badge);
      }
    }, 500);
  }, 3000);
}

// Expose badge function globally
window.showAchievementBadge = showAchievementBadge;

// ============================================
// SCREEN FLASH/GLOW EFFECTS
// ============================================

function screenFlash(color = "rgba(255, 107, 156, 0.4)", duration = 600) {
  const flash = document.createElement("div");
  flash.className = "screen-flash";
  flash.style.backgroundColor = color;
  document.body.appendChild(flash);

  // Trigger flash
  requestAnimationFrame(() => {
    flash.classList.add("active");
  });

  // Remove after duration
  setTimeout(() => {
    flash.classList.remove("active");
    setTimeout(() => {
      if (flash.parentNode) {
        flash.parentNode.removeChild(flash);
      }
    }, 300);
  }, duration);
}

function screenGlow(color = "rgba(255, 107, 156, 0.3)", duration = 1000) {
  const glow = document.createElement("div");
  glow.className = "screen-glow";
  glow.style.boxShadow = `0 0 100px 50px ${color}`;
  document.body.appendChild(glow);

  // Trigger glow
  requestAnimationFrame(() => {
    glow.classList.add("active");
  });

  // Remove after duration
  setTimeout(() => {
    glow.classList.remove("active");
    setTimeout(() => {
      if (glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
    }, 400);
  }, duration);
}

// Expose flash/glow functions globally
window.screenFlash = screenFlash;
window.screenGlow = screenGlow;

// ============================================
// EASTER EGG TRACKING SYSTEM
// ============================================

// List of all easter eggs with their unique IDs
const EASTER_EGG_IDS = {
  HIDDEN_CAT: "hidden-cat",
  TRIPLE_CLICK_PHOTO: "triple-click-photo",
  LOGO_5_CLICKS: "logo-click-5",
  TARZAN_FACT: "tarzan-fact",
  SECRET_DRINK: "secret-drink",
  EMPTY_GLASS: "empty-glass",
  MAXIMUM_CHAOS: "maximum-chaos",
  NICE_NUMBER: "nice-number",
  KIRTI_MODE: "kirti-mode",
  MUSIC_NOTES: "music-notes",
};

const TOTAL_EASTER_EGGS = Object.keys(EASTER_EGG_IDS).length;
const STORAGE_KEY = "kirti-bday-easter-eggs";

// Load discovered easter eggs from localStorage on initialization
let discoveredEasterEggs = [];

// Load easter eggs from localStorage
function loadEasterEggsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        discoveredEasterEggs = parsed;
        return;
      }
    }
  } catch (error) {
    console.log("Error loading easter eggs from storage:", error);
  }
  discoveredEasterEggs = [];
}

// Save easter eggs to localStorage
function saveEasterEggsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredEasterEggs));
  } catch (error) {
    console.log("Error saving easter eggs to storage:", error);
  }
}

// Get discovered easter eggs
function getDiscoveredEasterEggs() {
  return discoveredEasterEggs;
}

// Mark an easter egg as discovered (persists to localStorage)
function discoverEasterEgg(easterEggId) {
  if (!discoveredEasterEggs.includes(easterEggId)) {
    discoveredEasterEggs.push(easterEggId);
    saveEasterEggsToStorage();
    updateEasterEggCounter();
    return true; // New discovery
  }
  return false; // Already discovered
}

// Reset counter (clears localStorage) - only called after confirmation
function resetEasterEggCounter() {
  discoveredEasterEggs = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log("Error removing easter eggs from storage:", error);
  }
  updateEasterEggCounter();
}

// Celebration function for finding all easter eggs
function celebrateAllEasterEggsFound() {
  const isMobile = isMobileDevice();
  
  // Enhanced confetti for celebration - more than regular easter eggs
  if (typeof window.launchConfetti === "function") {
    if (isMobile) {
      // Three bursts on mobile for grand celebration (more than normal easter eggs)
      window.launchConfetti(70);
      setTimeout(() => window.launchConfetti(50), 350);
      setTimeout(() => window.launchConfetti(40), 700);
    } else {
      // Multiple bursts on desktop - more impressive than regular easter eggs
      window.launchConfetti(180);
      setTimeout(() => window.launchConfetti(150), 400);
      setTimeout(() => window.launchConfetti(100), 800);
    }
  }
  
  // Sound effects - keep both for celebratory feel
  if (typeof window.playSound === "function") {
    window.playSound("achievement");
    setTimeout(() => window.playSound("success"), isMobile ? 400 : 300);
  }
  
  // Lightweight screen celebration effect using body class (no new DOM elements)
  const body = document.body;
  if (body) {
    body.classList.add("celebration-active");
    setTimeout(() => {
      body.classList.remove("celebration-active");
    }, isMobile ? 1200 : 2000);
  }
  
  // Counter pulse animation - lightweight CSS transform
  const counterEl = document.getElementById("easter-egg-counter");
  if (counterEl) {
    counterEl.classList.add("celebration-pulse");
    setTimeout(() => {
      counterEl.classList.remove("celebration-pulse");
    }, 2000);
  }
  
  // Achievement badge - show it
  if (typeof window.showAchievementBadge === "function") {
    setTimeout(() => {
      window.showAchievementBadge("Master Explorer!", "🏆");
    }, isMobile ? 500 : 400);
  }
  
  // Show congratulatory modal - balanced delay
  setTimeout(() => {
    if (typeof window.openModal === "function") {
      window.openModal("all-easter-eggs-found");
    }
  }, isMobile ? 1800 : 800); // Slightly reduced delay on mobile
}

// Update the easter egg counter display
function updateEasterEggCounter() {
  const discovered = getDiscoveredEasterEggs();
  const count = discovered.length;
  const counterEl = document.getElementById("easter-egg-counter");
  
  if (counterEl) {
    counterEl.textContent = `${count}/${TOTAL_EASTER_EGGS}`;
    counterEl.setAttribute("data-count", count);
    
    // Make counter clickable and glowing when all are found
    if (count === TOTAL_EASTER_EGGS) {
      counterEl.classList.add("all-found");
      counterEl.style.cursor = "pointer";
      counterEl.setAttribute("title", "Click to celebrate! 🎉 (Long press to reset)");
    } else {
      counterEl.classList.remove("all-found");
      counterEl.style.cursor = "default";
      counterEl.setAttribute("title", "Easter Eggs Found (Long press to reset)");
    }
  }
}

// Create and display easter egg counter
function createEasterEggCounter() {
  // Check if counter already exists
  if (document.getElementById("easter-egg-counter")) return;
  
  const counter = document.createElement("div");
  counter.id = "easter-egg-counter";
  counter.className = "easter-egg-counter";
  counter.setAttribute("title", "Easter Eggs Found (Long press to reset)");
  
  const discovered = getDiscoveredEasterEggs();
  const count = discovered.length;
  counter.textContent = `${count}/${TOTAL_EASTER_EGGS}`;
  counter.setAttribute("data-count", count);
  
  // Long-press detection variables
  let longPressTimer = null;
  let isLongPress = false;
  const LONG_PRESS_DURATION = 800; // 800ms for long press
  
  // Function to show reset confirmation modal
  function showResetConfirmation() {
    if (typeof window.openModal === "function") {
      window.openModal("reset-easter-eggs-confirmation");
    }
  }
  
  // Handle touch start (mobile)
  counter.addEventListener("touchstart", (e) => {
    isLongPress = false;
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      showResetConfirmation();
    }, LONG_PRESS_DURATION);
  });
  
  // Handle touch end (mobile)
  counter.addEventListener("touchend", (e) => {
    clearTimeout(longPressTimer);
    if (!isLongPress) {
      // Regular tap - handle celebration if all found
      const currentCount = parseInt(counter.getAttribute("data-count")) || 0;
      if (currentCount === TOTAL_EASTER_EGGS) {
        celebrateAllEasterEggsFound();
      }
    }
  });
  
  // Handle touch cancel (mobile)
  counter.addEventListener("touchcancel", () => {
    clearTimeout(longPressTimer);
    isLongPress = false;
  });
  
  // Handle mouse down (desktop)
  counter.addEventListener("mousedown", (e) => {
    isLongPress = false;
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      showResetConfirmation();
    }, LONG_PRESS_DURATION);
  });
  
  // Handle mouse up (desktop)
  counter.addEventListener("mouseup", (e) => {
    clearTimeout(longPressTimer);
    if (!isLongPress && e.button === 0) {
      // Regular click - handle celebration if all found
      const currentCount = parseInt(counter.getAttribute("data-count")) || 0;
      if (currentCount === TOTAL_EASTER_EGGS) {
        celebrateAllEasterEggsFound();
      }
    }
  });
  
  // Handle mouse leave (desktop) - cancel long press if mouse leaves element
  counter.addEventListener("mouseleave", () => {
    clearTimeout(longPressTimer);
    isLongPress = false;
  });
  
  document.body.appendChild(counter);
  
  // Update on load
  updateEasterEggCounter();
}

// Expose functions and constants globally
window.discoverEasterEgg = discoverEasterEgg;
window.updateEasterEggCounter = updateEasterEggCounter;
window.resetEasterEggCounter = resetEasterEggCounter;
window.EASTER_EGG_IDS = EASTER_EGG_IDS;
window.TOTAL_EASTER_EGGS = TOTAL_EASTER_EGGS;

// Load from localStorage and initialize counter on page load
loadEasterEggsFromStorage();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createEasterEggCounter);
} else {
  createEasterEggCounter();
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
    // Track discovery
    if (typeof window.discoverEasterEgg === "function") {
      window.discoverEasterEgg(EASTER_EGG_IDS.HIDDEN_CAT);
    }
    
    // Celebration effects
    if (typeof window.playSound === "function") {
      window.playSound("success");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(180); // More confetti for easter egg
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Hidden Cat Discoverer", "🐱");
    }
    if (typeof window.screenFlash === "function") {
      window.screenFlash("rgba(255, 107, 156, 0.5)", 800);
    }
    if (typeof window.screenGlow === "function") {
      window.screenGlow("rgba(255, 107, 156, 0.4)", 1200);
    }

    // Animate the cat button
    hiddenCatBtn.style.transform = "scale(1.3) rotate(360deg)";
    hiddenCatBtn.style.transition = "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    setTimeout(() => {
      hiddenCatBtn.style.transform = "";
    }, 600);

    // Show modal after a brief delay for effects
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("hidden-cat-secret", "You Found the Hidden Cat!", 
          "Okay, you actually clicked the tiny floating cat. That's either dedication or you have way too much time. " +
          "Either way, here's your reward: you're officially the kind of person who finds easter eggs. " +
          "Also, Kirti, if you're reading this: you're the main character, even when you don't feel like it. " +
          "Now go back and actually enjoy the birthday page instead of hunting for secrets. (But also, good job.)"
        );
      }
    }, 300);
  });
}

// ============================================
// CLICK/TAP PATTERN EASTER EGGS
// ============================================

// 3. Triple-click on Kirti's photo
const kirtiPhoto = document.querySelector(".kirti-photo");
if (kirtiPhoto) {
  let clickCount = 0;
  let clickTimeout;

  kirtiPhoto.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimeout);

    if (clickCount === 3) {
      // Triple-click detected!
      clickCount = 0;

      // Track discovery
      if (typeof window.discoverEasterEgg === "function") {
        window.discoverEasterEgg(EASTER_EGG_IDS.TRIPLE_CLICK_PHOTO);
      }

      // Celebration effects
      if (typeof window.playSound === "function") {
        window.playSound("success");
      }
      if (typeof window.launchConfetti === "function") {
        window.launchConfetti(150);
      }
      if (typeof window.showAchievementBadge === "function") {
        window.showAchievementBadge("Photo Explorer", "📸");
      }
      if (typeof window.screenFlash === "function") {
        window.screenFlash("rgba(255, 107, 156, 0.4)", 700);
      }

      // Animate the photo
      kirtiPhoto.style.transform = "scale(1.1) rotate(5deg)";
      kirtiPhoto.style.transition = "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      setTimeout(() => {
        kirtiPhoto.style.transform = "";
      }, 500);

      // Show modal
      setTimeout(() => {
        if (typeof window.openModal === "function") {
          window.openModal("triple-click-photo");
        }
      }, 300);
    }

    // Reset counter after 1 second of no clicks
    clickTimeout = setTimeout(() => {
      clickCount = 0;
    }, 1000);
  });
}

// 4. Click logo 5 times
const logoMark = document.querySelector(".logo-mark");
if (logoMark) {
  let logoClickCount = 0;
  let logoClickTimeout;

  logoMark.addEventListener("click", () => {
    logoClickCount++;
    clearTimeout(logoClickTimeout);

    if (logoClickCount === 5) {
      // Five clicks detected!
      logoClickCount = 0;

      // Track discovery
      if (typeof window.discoverEasterEgg === "function") {
        window.discoverEasterEgg(EASTER_EGG_IDS.LOGO_5_CLICKS);
      }

      // Celebration effects
      if (typeof window.playSound === "function") {
        window.playSound("achievement");
      }
      if (typeof window.launchConfetti === "function") {
        window.launchConfetti(180);
      }
      if (typeof window.showAchievementBadge === "function") {
        window.showAchievementBadge("Logo Master", "🎯");
      }
      if (typeof window.screenFlash === "function") {
        window.screenFlash("rgba(183, 242, 217, 0.5)", 800);
      }
      if (typeof window.screenGlow === "function") {
        window.screenGlow("rgba(255, 107, 156, 0.4)", 1200);
      }

      // Animate the logo
      logoMark.style.transform = "scale(1.2) rotate(360deg)";
      logoMark.style.transition = "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      setTimeout(() => {
        logoMark.style.transform = "";
      }, 800);

      // Show modal
      setTimeout(() => {
        if (typeof window.openModal === "function") {
          window.openModal("logo-click-5");
        }
      }, 400);
    }

    // Reset counter after 2 seconds of no clicks
    logoClickTimeout = setTimeout(() => {
      logoClickCount = 0;
    }, 2000);
  });
}


// ============================================
// VISUAL/UI INTERACTION EASTER EGGS
// ============================================

// 6. Click floating music notes → Makes them dance
const floatingNotes = document.querySelector(".floating-notes");
if (floatingNotes) {
  const noteSpans = floatingNotes.querySelectorAll("span");
  let musicNotesDiscovered = false;
  
  noteSpans.forEach((note) => {
    note.addEventListener("click", () => {
      // Track discovery (only once for all notes)
      if (!musicNotesDiscovered && typeof window.discoverEasterEgg === "function") {
        window.discoverEasterEgg(EASTER_EGG_IDS.MUSIC_NOTES);
        musicNotesDiscovered = true;
        
        // Celebration effects on first discovery
        if (typeof window.playSound === "function") {
          window.playSound("success");
        }
        if (typeof window.launchConfetti === "function") {
          window.launchConfetti(120);
        }
        if (typeof window.showAchievementBadge === "function") {
          window.showAchievementBadge("Music Note Dancer", "♪");
        }
      } else {
        // Just play sound for subsequent clicks
        if (typeof window.playSound === "function") {
          window.playSound("success");
        }
      }
      
      // Make the note dance
      note.classList.remove("dancing");
      // Force reflow to retrigger animation
      // eslint-disable-next-line no-unused-expressions
      note.offsetHeight;
      note.classList.add("dancing");
      
      // Remove class after animation
      setTimeout(() => {
        note.classList.remove("dancing");
      }, 600);
    });
  });
}

