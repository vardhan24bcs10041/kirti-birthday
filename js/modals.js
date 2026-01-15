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
  "konami-secret": {
    title: "🎮 Konami Code Activated!",
    body:
      "You just entered the Konami code. That's either impressive dedication or you're a gamer from the '80s. " +
      "Either way, you've unlocked: TV Girl Mode. The background should now look like a retro show poster. " +
      "Refresh the page to reset it. (Also, who taught you the Konami code? Respect.)",
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
};

function openModal(id, fallbackTitle, fallbackBody) {
  const content = modalContentMap[id] || {
    title: fallbackTitle || "A Tiny Moment",
    body:
      fallbackBody ||
      "This is a little placeholder story. You can replace this text with something only you and Kirti will understand.",
  };

  if (modalTitleEl) modalTitleEl.textContent = content.title;
  if (modalBodyEl) modalBodyEl.textContent = content.body;
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

