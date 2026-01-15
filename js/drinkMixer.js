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
      "Achievement unlocked: Secret recipe discovered. This is the \"you absolutely overthought the sliders\" drink – precise, dramatic, and very, very you.";

    // Fun little shake on the glass
    if (glassEl) {
      glassEl.classList.remove("secret-recipe-shake");
      // Force reflow so the animation can retrigger
      // eslint-disable-next-line no-unused-expressions
      glassEl.offsetHeight;
      glassEl.classList.add("secret-recipe-shake");
    }

    if (typeof window.launchConfetti === "function") {
      window.launchConfetti();
    }

    if (typeof window.openModal === "function") {
      window.openModal("secret-drink");
    }
  } else if (strawberry < 30 && ginger > 70) {
    line =
      "Spicy, chaotic, and a little dangerous – like you on three hours of sleep, ten tabs of notes, and one more panic attack than recommended.";
  } else if (strawberry > 70 && ginger < 40) {
    line =
      "Sweet, bright, and oddly comforting – the version of you that somehow keeps everyone else together even when you’re low-key falling apart.";
  } else if (strawberry > 60 && ginger > 60) {
    line =
      "Maximum sweetness, maximum fizz. This is the \"I survived exam season and still aggressively kissed Tarzan on my birthday\" blend.";
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


