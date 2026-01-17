// Strawberry & ginger ale drink mixer interactions

const strawberryRange = document.getElementById("strawberry-range");
const gingerRange = document.getElementById("ginger-range");
const strawberryValueEl = document.getElementById("strawberry-value");
const gingerValueEl = document.getElementById("ginger-value");
const drinkLiquid = document.getElementById("drink-liquid");
const drinkBubbles = document.getElementById("drink-bubbles");
const generateToastBtn = document.getElementById("generate-toast-btn");
const toastOutput = document.getElementById("toast-output");
const glassEl = document.querySelector(".glass");

// Secret recipe easter egg: very specific strawberry/ginger combo
const SECRET_STRAWBERRY = 14;
const SECRET_GINGER = 4;
const SECRET_TOLERANCE = 0; // allow a small wiggle room so it's discoverable

function isSecretRecipe(strawberry, ginger) {
  return (
    Math.abs(strawberry - SECRET_STRAWBERRY) <= SECRET_TOLERANCE &&
    Math.abs(ginger - SECRET_GINGER) <= SECRET_TOLERANCE
  );
}

function updateDrinkVisual() {
  if (!strawberryRange || !gingerRange || !drinkLiquid || !drinkBubbles) return;

  const strawberry = Number(strawberryRange.value);
  const ginger = Number(gingerRange.value);

  if (strawberryValueEl) strawberryValueEl.textContent = strawberry;
  if (gingerValueEl) gingerValueEl.textContent = ginger;

  // Liquid height & color based on strawberry
  const height = 40 + (strawberry / 100) * 50; // 40%–90%
  drinkLiquid.style.height = `${height}%`;

  const startColor = strawberry > 60 ? "#ffb5d1" : "#ffdfef";
  const endColor = strawberry > 60 ? "#ff6b9c" : "#ff9fc0";
  drinkLiquid.style.background = `linear-gradient(180deg, ${startColor}, ${endColor})`;

  // Bubble intensity based on ginger
  const opacity = 0.25 + (ginger / 100) * 0.5;
  drinkBubbles.style.opacity = opacity.toString();
}

function generateToast() {
  if (!strawberryRange || !gingerRange || !toastOutput) return;

  const strawberry = Number(strawberryRange.value);
  const ginger = Number(gingerRange.value);

  let line;

  // Secret drink easter egg
  if (isSecretRecipe(strawberry, ginger)) {
    line =
      'Achievement unlocked: Secret recipe discovered. This is the "you absolutely overthought the sliders" drink – precise, dramatic, and very, very you.';

    // Track discovery
    if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
      window.discoverEasterEgg(window.EASTER_EGG_IDS.SECRET_DRINK);
    }

    // Celebration effects
    if (typeof window.playSound === "function") {
      window.playSound("drink");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(180); // More confetti for secret recipe
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Secret Recipe Master", "🍓");
    }
    if (typeof window.screenFlash === "function") {
      window.screenFlash("rgba(255, 107, 156, 0.5)", 800);
    }
    if (typeof window.screenGlow === "function") {
      window.screenGlow("rgba(255, 210, 127, 0.4)", 1200);
    }

    // Enhanced dramatic shake and glow on the glass
    if (glassEl) {
      glassEl.classList.remove("secret-recipe-shake");
      glassEl.classList.remove("secret-recipe-glow");
      // Force reflow so the animation can retrigger
      // eslint-disable-next-line no-unused-expressions
      glassEl.offsetHeight;
      glassEl.classList.add("secret-recipe-shake");
      glassEl.classList.add("secret-recipe-glow");
      
      // Remove glow after animation
      setTimeout(() => {
        glassEl.classList.remove("secret-recipe-glow");
      }, 2000);
    }

    // Show modal after effects
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("secret-drink");
      }
    }, 300);
  } else if (strawberry === 0 && ginger === 0) {
    // Empty glass easter egg
    line = "Empty glass mode activated. Are you okay?";
    
    // Track discovery
    if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
      window.discoverEasterEgg(window.EASTER_EGG_IDS.EMPTY_GLASS);
    }
    
    if (typeof window.playSound === "function") {
      window.playSound("success");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(120);
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Empty Glass", "🥛");
    }
    
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("empty-glass");
      }
    }, 300);
  } else if (strawberry === 100 && ginger === 100) {
    // Maximum chaos easter egg
    line = "Maximum chaos unlocked! This is the ultimate main character drink.";
    
    // Track discovery
    if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
      window.discoverEasterEgg(window.EASTER_EGG_IDS.MAXIMUM_CHAOS);
    }
    
    if (typeof window.playSound === "function") {
      window.playSound("achievement");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(200);
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Maximum Chaos", "💥");
    }
    if (typeof window.screenFlash === "function") {
      window.screenFlash("rgba(255, 107, 156, 0.6)", 1000);
    }
    if (typeof window.screenGlow === "function") {
      window.screenGlow("rgba(255, 107, 156, 0.5)", 1500);
    }
    
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("maximum-chaos");
      }
    }, 400);
  } else if (strawberry === 69 && ginger === 69) {
    // Nice number easter egg
    line = "Nice. I see what you did there.";
    
    // Track discovery
    if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
      window.discoverEasterEgg(window.EASTER_EGG_IDS.NICE_NUMBER);
    }
    
    if (typeof window.playSound === "function") {
      window.playSound("success");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(150);
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Nice", "😏");
    }
    
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("nice-number");
      }
    }, 300);
  } else if (strawberry < 30 && ginger > 70) {
    line =
      "Spicy, chaotic, and a little dangerous – like you on three hours of sleep, ten tabs of notes, and one more panic attack than recommended.";
  } else if (strawberry > 70 && ginger < 40) {
    line =
      "Sweet, bright, and oddly comforting – the version of you that somehow keeps everyone else together even when you’re low-key falling apart.";
  } else if (strawberry > 60 && ginger > 60) {
    line =
      'Maximum sweetness, maximum fizz. This is the "I survived exam season and still aggressively kissed Tarzan on my birthday" blend.';
  } else if (strawberry < 40 && ginger < 40) {
    line =
      "Soft and low-key, the kind of drink you sip while watching a romcom and convincing everyone you’re fine (you are, mostly).";
  } else {
    line =
      "Balanced, bubbly, and quietly powerful – the energy you carry when you pretend you don’t care, but still secretly know exactly how everyone feels.";
  }

  toastOutput.textContent = line;
}

if (strawberryRange) {
  strawberryRange.addEventListener("input", updateDrinkVisual);
}

if (gingerRange) {
  gingerRange.addEventListener("input", updateDrinkVisual);
}

if (generateToastBtn) {
  generateToastBtn.addEventListener("click", generateToast);
}

// Initial state
updateDrinkVisual();
