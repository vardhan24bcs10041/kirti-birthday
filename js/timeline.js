// Memory timeline driven by data

const timelineContainer = document.getElementById("timeline-container");

const timelineEntries = [
  {
    id: "memory-meet",
    date: "14 April",
    title: "“Do you ever smile?”",
    preview: "You: posting a story. Me: choosing violence in your DMs.",
    body:
      "You posted a story. I decided to open my mouth and say \"do you ever smile?\" like I was auditioning to be blocked. " +
      "Instead of deleting me, you said you look like Mickey Mouse when you smile – and somehow that stupid exchange turned into... this.",
  },
  {
    id: "memory-exams",
    date: "Exam season",
    title: "All‑nighters & anxiety attacks",
    preview: "Panic, no sleep, and still showing up.",
    body:
      "You went through major anxiety, actual panic attacks, and the kind of sleep deprivation that should be illegal. " +
      "None of it was aesthetic, none of it was easy, and still you dragged yourself through every paper. " +
      "It was brutal and messy and real — and I’m stupidly proud that we made it through together.",
  },
  {
    id: "memory-tvgirl",
    date: "No. 1 Binge-Watcher",
    title: "Movies & Music main character syndrome",
    preview: "“It’s just a film but you’re low‑key having a crisis.",
    body:
      "Somewhere between films and shows and \"MROOO PLEASE GIVE ME A RECOMMENDATION\" texts, they turned into background noise for your overthinking. " +
      "You call it gaana; I call it you turning every lyric into a tiny film in your head. " +
      "Now every time I hear those songs or watch those films, my brain just quietly goes, \"yeah, that’s so her\".",
  },
  {
    id: "memory-random",
    date: "All the tiny in-betweens",
    title: "Teddy, Tarzan & not blocking me",
    preview: "Cat photos, unhinged chaos, and somehow… still here.",
    body:
      "It’s everything in between: Teddy and Tarzan updates, aggressive birthday kisses for Tarzan, random checks on my brain, " +
      "unhinged reels, and you somehow understanding exactly how I think. " +
      "You could’ve blocked me at \"do you ever smile?\", but instead you stayed — and that’s the part I’m stupidly grateful for.",
  },
];

function renderTimeline() {
  if (!timelineContainer) return;

  timelineEntries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "timeline-card";

    card.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-inner" data-entry-id="${entry.id}">
        <div class="timeline-date">${entry.date}</div>
        <h3 class="timeline-title">${entry.title}</h3>
        <p class="timeline-preview">${entry.preview}</p>
      </div>
    `;

    timelineContainer.appendChild(card);
  });

  // Click → open detailed modal
  timelineContainer.addEventListener("click", (e) => {
    const inner = e.target.closest(".timeline-inner");
    if (!inner) return;
    const entryId = inner.getAttribute("data-entry-id");
    const entry = timelineEntries.find((t) => t.id === entryId);
    if (entry && typeof window.openModal === "function") {
      window.openModal(entry.id, entry.title, entry.body);
    }
  });
}

function setupScrollAnimations() {
  if (!timelineContainer) return;

  const cards = Array.from(
    timelineContainer.querySelectorAll(".timeline-card")
  );
  if (!("IntersectionObserver" in window) || cards.length === 0) {
    cards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => observer.observe(card));
}

renderTimeline();
setupScrollAnimations();

