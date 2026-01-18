// Simple reusable modal system for cat cards & timeline details

const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalInnerEl = modalBackdrop ? modalBackdrop.querySelector(".modal") : null;

// CRITICAL: Force modal to be hidden immediately on load (before any other code runs)
if (modalBackdrop) {
  modalBackdrop.classList.add("hidden");
  modalBackdrop.style.display = "none";
  modalBackdrop.style.pointerEvents = "none";
}

const modalContentMap = {
  "cat-gingerale": {
    title: "The One Who Outruns Meltdowns",
    body:
      "This is the version of you that stared down exams, panic attacks and zero sleep, " +
      "and still somehow dragged yourself (and me) across the finish line. Traumatized? Yes. Defeated? Absolutely not.",
  },
  "cat-strawberries": {
    title: "Teddy & Tarzan Supremacy",
    body:
      "Two cats, one apartment, no personal space. Teddy supervising everything, Tarzan getting aggressively kissed every birthday " +
      "while pretending to hate it. Honestly, they own the lease and we’re just visiting.",
  },
  "cat-tvgirl": {
    title: "The Girl Who Zones out to TV Girl",
    body:
      "It’s you, a pair of headphones, a 'fw heavy' song that goes way too hard for no reason, and fifteen different spirals happening at once. " +
      "You call it \"I’m fine\". I call it main character behaviour.",
  },
  "cat-secret": {
    title: "The Secret Fourth Cat",
    body:
      "Lore drop: there's a secret fourth cat that appears every time you pretend you don't care but actually care a lot. " +
      "It's the one keeping track of every time you were softer, kinder and funnier than you'll ever admit. This page is basically its scrapbook.",
  },
  "hidden-cat-secret": {
    title: "You Found the Hidden Cat!",
    body:
      "Okay, you actually clicked the tiny floating cat. That's either dedication or you have way too much time. " +
      "Either way, here's your reward: you're officially the kind of person who finds easter eggs. " +
      "Also, Kirti, if you're reading this: you're the main character, even when you don't feel like it. " +
      "Now go back and actually enjoy the birthday page instead of hunting for secrets. (But also, good job.)",
  },
  "secret-drink": {
    title: "You Found the Secret Recipe",
    body:
      "You actually hit the one oddly specific strawberry–ginger combo I hid in here. " +
      "This is the \"of course you overthought the sliders\" drink: a little too precise, a little too dramatic, and very, very you.",
  },
  "kirti-mode": {
    title: "Achievement Unlocked: Main Character Track",
    body:
      "You just finished a track all the way through without skipping. " +
      "That automatically makes it a Kirti-certified main character song. " +
      "From now on, every time it plays, you're required by law to stare out of a fake window and act cinematic.",
  },
  "triple-click-photo": {
    title: "Photo Explorer Discovered!",
    body:
      "You triple-clicked the photo. That's either curiosity or you're really committed to finding secrets. " +
      "Either way, you've unlocked a special moment: this photo represents the person who somehow turned a random Instagram reply into this entire page. " +
      "Kirti, you're the reason this exists. Happy birthday, you absolute legend of a bitch.",
  },
  "logo-click-5": {
    title: "Logo Master Unlocked!",
    body:
      "Five clicks on the logo? That's dedication. You've unlocked a hidden message: " +
      "This entire page was built because I wanted to do something special for you. Nah that's cap, I was just bored " +
      "",
  },
  "tarzan-fact": {
    title: "Tarzan Fact 🐱",
    body:
      '<div class="tarzan-modal-content">' +
      '<img src="assets/images/tarzan-photo.jpeg" alt="Tarzan" class="tarzan-photo-modal" onerror="this.style.display=\'none\';" />' +
      '<p>Tarzan: The cat who gets aggressively kissed on birthdays and pretends to hate it (but secretly loves it). ' +
      "The main character of their own dramatic saga, probably starring in a romcom in their head. " +
      "If Tarzan could talk, they'd say 'I'm fine but get this bitch off of me' while having the most cinematic breakdown ever.</p>" +
      '</div>',
    isHTML: true, // Flag to indicate this modal uses HTML
  },
  "empty-glass": {
    title: "Empty Glass Mode",
    body:
      "You set both sliders to zero. That's... an empty glass. " +
      "Are you okay? Do you need help? This is the 'I'm not sure what I'm doing but I'm committed' drink. " +
      "Try moving the sliders. I promise it gets better.",
  },
  "maximum-chaos": {
    title: "Maximum Chaos Unlocked!",
    body:
      "Both sliders at 100? That's maximum sweetness AND maximum fizz. " +
      "This is the 'I survived everything and I'm still here' drink. " +
      "The 'I'm fine' but actually I'm not fine but I'm still standing drink. " +
      "The ultimate 'main character energy' blend. You've earned this chaos.",
  },
  "nice-number": {
    title: "I Like the Way You Think",
    body:
      "69/69? Really? You set both sliders to 69. " +
      "I see what you did there. This is the 'I have the humor of a 12-year-old but I'm proud of it' drink. " +
      "Respect. You found the number easter egg. This drink is now certified as 'nice'.",
  },
  "all-easter-eggs-found": {
    title: "🎉 Congratulations! 🎉",
    body:
      "You've found ALL 10 easter eggs! You're officially a Master Explorer! " +
      "You've discovered every secret, every hidden message, and every little detail I hid in here. " +
      "This is the kind of dedication that deserves a standing ovation. " +
      "Thank you for taking the time to explore every corner of your birthday page. " +
      "You're amazing Baby Zombie! 🏆✨",
  },
  "reset-easter-eggs-confirmation": {
    title: "Reset Easter Egg Counter?",
    body:
      '<div class="reset-confirmation-content">' +
      '<p>Are you sure you want to reset the easter egg counter? All discovered easter eggs will be cleared.</p>' +
      '<div class="modal-actions">' +
      '<button id="confirm-reset-btn" class="primary-btn">Yes, Reset</button>' +
      '<button id="cancel-reset-btn" class="secondary-btn">Cancel</button>' +
      '</div>' +
      '</div>',
    isHTML: true,
  },
};

function openModal(id, fallbackTitle, fallbackBody) {
  const content = modalContentMap[id] || {
    title: fallbackTitle || "A Tiny Moment",
    body:
      fallbackBody ||
      "This is a little placeholder story. You can replace this text with something only you and Kirti will understand.",
  };

  if (modalTitleEl) {
    // Always reset to plain text first to clear any previous clickable elements
    modalTitleEl.textContent = content.title;
    
    // Special handling for cat-strawberries modal ONLY: make Tarzan clickable in the title
    // Timeline modals (memory-*) are explicitly excluded - Tarzan is NOT clickable in timeline
    if (id === "cat-strawberries" && content.title.includes("Tarzan")) {
      // Replace Tarzan in title with clickable version (no visual highlighting)
      const tarzanRegex = /(Tarzan)/g;
      modalTitleEl.innerHTML = content.title.replace(
        tarzanRegex,
        '<span class="tarzan-clickable" style="cursor: pointer;">$1</span>'
      );
      
      // Add click handler to Tarzan in title
      const tarzanSpan = modalTitleEl.querySelector(".tarzan-clickable");
      if (tarzanSpan) {
        tarzanSpan.addEventListener("click", (e) => {
          e.stopPropagation();
          
          // Track discovery
          if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
            window.discoverEasterEgg(window.EASTER_EGG_IDS.TARZAN_FACT);
          }
          
          // Celebration effects
          if (typeof window.playSound === "function") {
            window.playSound("success");
          }
          if (typeof window.launchConfetti === "function") {
            window.launchConfetti(150);
          }
          if (typeof window.showAchievementBadge === "function") {
            window.showAchievementBadge("Cat Fact Discovered", "🐱");
          }
          
          // Show Tarzan fact modal
          openModal("tarzan-fact");
        });
      }
    }
  }
  if (modalBodyEl) {
    // Use innerHTML for modals that contain HTML (like images), otherwise use textContent
    if (content.isHTML) {
      modalBodyEl.innerHTML = content.body;
    } else {
      modalBodyEl.textContent = content.body;
    }
  }
  
  // Special handling for reset confirmation modal
  if (id === "reset-easter-eggs-confirmation") {
    // Add event listeners after a short delay to ensure DOM is updated
    setTimeout(() => {
      const confirmBtn = document.getElementById("confirm-reset-btn");
      const cancelBtn = document.getElementById("cancel-reset-btn");
      
      if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
          // Reset the easter egg counter
          if (typeof window.resetEasterEggCounter === "function") {
            window.resetEasterEggCounter();
          }
          closeModal();
        });
      }
      
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          closeModal();
        });
      }
    }, 10);
  }
  
  if (modalBackdrop) {
    modalBackdrop.classList.remove("hidden");
    modalBackdrop.style.display = "flex";
    modalBackdrop.style.pointerEvents = "auto";
  }
  if (modalInnerEl) modalInnerEl.style.display = "block";
}

function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.add("hidden");
    modalBackdrop.style.display = "none";
    modalBackdrop.style.pointerEvents = "none";
  }
  if (modalInnerEl) modalInnerEl.style.display = "none";
  
  // Clean up any clickable spans to prevent them from persisting
  if (modalTitleEl) {
    const tarzanSpan = modalTitleEl.querySelector(".tarzan-clickable");
    if (tarzanSpan) {
      tarzanSpan.remove();
    }
  }
}

// Expose helpers globally for other scripts
window.openModal = openModal;
window.closeModal = closeModal;

// Local setup for close interactions
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop && !modalBackdrop.classList.contains("hidden")) {
    closeModal();
  }
});

// Double-check modal is hidden after DOM is fully ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    closeModal();
  });
} else {
  closeModal();
}

