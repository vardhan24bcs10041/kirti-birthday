// Simple custom music player using local MP3 files

const audioEl = document.getElementById("audio-element");
const trackTitleEl = document.getElementById("track-title");
const trackArtistEl = document.getElementById("track-artist");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-fill");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const albumArtImg = document.getElementById("album-art-image");

// TV Girl playlist for Kirti
// You can add albumArt property to each track for per-track album art
// Or leave it empty to use the default album-art.jpg
const playlist = [
  {
    title: "Not Allowed",
    artist: "TV Girl",
    src: "assets/audio/Not allowed.mp3",
    albumArt: null, // null = use default, or set to "assets/images/album-art.jpg"
  },
  {
    title: "Birds Don't Sing",
    artist: "TV Girl",
    src: "assets/audio/Birds Dont Sing.mp3",
    albumArt: null,
  },
  {
    title: "Cigarettes out the Window",
    artist: "TV Girl",
    src: "assets/audio/Cigarettes out the window.mp3",
    albumArt: null,
  },
  {
    title: "Loving Machine",
    artist: "TV Girl",
    src: "assets/audio/Loving Machine.mp3",
    albumArt: null,
  },
  {
    title: "The Blonde",
    artist: "TV Girl",
    src: "assets/audio/The Blonde.mp3",
    albumArt: null,
  },
  {
    title: "Taking What's Not Yours",
    artist: "TV Girl",
    src: "assets/audio/Taking What's Not Yours.mp3",
    albumArt: null,
  },
];

// Default album art (used if track doesn't have its own)
const DEFAULT_ALBUM_ART = "assets/images/album-art.jpg.png";

let currentTrackIndex = 0;
let isPlaying = false;
let kirtiModeUnlocked = false;

function loadTrack(index) {
  const track = playlist[index];
  if (!track || !audioEl) return;

  audioEl.src = track.src;
  if (trackTitleEl) trackTitleEl.textContent = track.title;
  if (trackArtistEl) trackArtistEl.textContent = track.artist;
  if (currentTimeEl) currentTimeEl.textContent = "0:00";
  if (durationEl) durationEl.textContent = "0:00";
  if (progressFill) progressFill.style.width = "0%";

  // Update album art
  if (albumArtImg) {
    const artSrc = track.albumArt || DEFAULT_ALBUM_ART;
    albumArtImg.src = artSrc;
    albumArtImg.style.display = "block";
  }
}

function togglePlay() {
  if (!audioEl) return;

  if (isPlaying) {
    audioEl.pause();
  } else {
    audioEl
      .play()
      .catch(() => {
        // Autoplay might be blocked; user will have to click again.
      });
  }
}

function playTrack(index) {
  currentTrackIndex = (index + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (!audioEl) return;
  audioEl
    .play()
    .then(() => {
      isPlaying = true;
      if (playPauseBtn) playPauseBtn.textContent = "⏸";
    })
    .catch(() => {
      // Playback failed; leave paused state.
    });
}

function prevTrack() {
  playTrack(currentTrackIndex - 1);
}

function nextTrack() {
  playTrack(currentTrackIndex + 1);
}

function formatTime(seconds) {
  if (Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updateProgress() {
  if (!audioEl || !durationEl || !currentTimeEl) return;
  const { currentTime, duration } = audioEl;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
  if (duration > 0) {
    const percent = (currentTime / duration) * 100;
    progressFill.style.width = `${percent}%`;
  }
}

function seek(e) {
  if (!audioEl || !progressBar) return;
  const rect = progressBar.getBoundingClientRect();
  const relativeX = e.clientX - rect.left;
  const fraction = Math.min(Math.max(relativeX / rect.width, 0), 1);
  const seekTime = audioEl.duration * fraction;
  audioEl.currentTime = seekTime;
}

function handleTrackEnded() {
  // Kirti mode easter egg: finishing the first track without skipping
  if (!kirtiModeUnlocked && currentTrackIndex === 0) {
    kirtiModeUnlocked = true;
    
    // Track discovery
    if (typeof window.discoverEasterEgg === "function" && typeof window.EASTER_EGG_IDS !== "undefined") {
      window.discoverEasterEgg(window.EASTER_EGG_IDS.KIRTI_MODE);
    }
    
    // Celebration effects
    if (typeof window.playSound === "function") {
      window.playSound("achievement");
    }
    if (typeof window.launchConfetti === "function") {
      window.launchConfetti(180); // More confetti for achievement
    }
    if (typeof window.showAchievementBadge === "function") {
      window.showAchievementBadge("Main Character Track", "🎵");
    }
    if (typeof window.screenFlash === "function") {
      window.screenFlash("rgba(255, 107, 156, 0.5)", 800);
    }
    if (typeof window.screenGlow === "function") {
      window.screenGlow("rgba(183, 242, 217, 0.4)", 1200);
    }
    
    // Enhanced visual effect: dramatic glow and pulse on album art
    if (albumArtImg) {
      const albumArtContainer = albumArtImg.closest(".album-art");
      if (albumArtContainer) {
        albumArtContainer.classList.add("achievement-glow");
        albumArtContainer.classList.add("achievement-pulse");
        setTimeout(() => {
          albumArtContainer.classList.remove("achievement-glow");
          albumArtContainer.classList.remove("achievement-pulse");
        }, 3000);
      }
    }
    
    // Show modal after effects
    setTimeout(() => {
      if (typeof window.openModal === "function") {
        window.openModal("kirti-mode");
      }
    }, 400);
  }

  nextTrack();
}

// Event wiring
if (audioEl) {
  audioEl.addEventListener("play", () => {
    isPlaying = true;
    if (playPauseBtn) playPauseBtn.textContent = "⏸";
  });

  audioEl.addEventListener("pause", () => {
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.textContent = "▶";
  });

  audioEl.addEventListener("timeupdate", updateProgress);
  audioEl.addEventListener("loadedmetadata", updateProgress);
  audioEl.addEventListener("ended", handleTrackEnded);
}

if (playPauseBtn) {
  playPauseBtn.addEventListener("click", togglePlay);
}

if (prevBtn) {
  prevBtn.addEventListener("click", prevTrack);
}

if (nextBtn) {
  nextBtn.addEventListener("click", nextTrack);
}

if (progressBar) {
  progressBar.addEventListener("click", seek);
}

// Keyboard shortcut: space toggles play/pause
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.target.closest("input, textarea, button")) {
    e.preventDefault();
    togglePlay();
  }
});

// Initial load
if (playlist.length > 0) {
  loadTrack(currentTrackIndex);
}
