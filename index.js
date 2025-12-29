const buttons = document.querySelectorAll(".drum");

const soundMap = {
  s: "tom-1.mp3",
  h: "tom-4.mp3",
  r: "snare.mp3",
  e: "snare.mp3",
  y: "crash.mp3",
  a: "tom-3.mp3",
};

// Preload drum sounds
const audioPool = {};
for (const [key, file] of Object.entries(soundMap)) {
  const audio = new Audio(`sounds/${file}`);
  audio.preload = "auto";
  audioPool[key] = audio;
}

// Secret unlock: SHREYA in order
const secret = "shreya";
let buffer = "";

// Surprise modal elements
const backdrop = document.getElementById("surpriseBackdrop");
const closeSurprise = document.getElementById("closeSurprise");

// Music toggle
const musicBtn = document.getElementById("musicBtn");
// Put any song here (add file into /sounds)
// Example name: happy-bday.mp3
const bgMusic = new Audio("sounds/happy-bday.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.35;
let musicOn = false;

// Confetti container
const confettiHost = document.getElementById("confetti");

// Button taps (mobile friendly)
buttons.forEach((btn) => {
  btn.addEventListener("pointerdown", () => {
    const key = btn.textContent.trim().toLowerCase();
    playDrum(key);
    animate(btn);
    recordKey(key);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const btn = [...buttons].find((b) => b.textContent.trim().toLowerCase() === key);
  if (btn) {
    playDrum(key);
    animate(btn);
    recordKey(key);
  }
});

function playDrum(key) {
  const audio = audioPool[key];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function animate(btn) {
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 120);
}

function recordKey(key) {
  buffer = (buffer + key).slice(-secret.length);
  if (buffer === secret) {
    buffer = "";
    openSurprise();
  }
}

// Surprise modal
function openSurprise() {
  backdrop.classList.remove("hidden");
  burstConfetti(140);
}

closeSurprise.addEventListener("click", () => {
  backdrop.classList.add("hidden");
});

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) backdrop.classList.add("hidden");
});

// Confetti (simple + pretty)
function burstConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    // random position + movement
    const left = Math.random() * 100; // vw
    const drift = (Math.random() * 2 - 1) * 160; // px
    const duration = 1800 + Math.random() * 1400; // ms
    const delay = Math.random() * 250; // ms

    // cute palette
    const colors = ["#ff3aa7", "#6b4bff", "#ffd1f3", "#ffe7a8", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    piece.style.left = `${left}vw`;
    piece.style.setProperty("--drift", `${drift}px`);
    piece.style.background = color;
    piece.style.animationDuration = `${duration}ms`;
    piece.style.animationDelay = `${delay}ms`;

    // size variety
    const w = 6 + Math.random() * 8;
    const h = 8 + Math.random() * 12;
    piece.style.width = `${w}px`;
    piece.style.height = `${h}px`;

    confettiHost.appendChild(piece);

    // cleanup
    setTimeout(() => piece.remove(), duration + delay + 200);
  }
}

// Music toggle (requires user tap → works on mobile)
musicBtn.addEventListener("click", async () => {
  musicOn = !musicOn;

  if (musicOn) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "🎶 Music: ON";
      burstConfetti(40);
    } catch (err) {
      // If the file doesn't exist or browser blocks, turn it off gracefully
      musicOn = false;
      musicBtn.textContent = "🎶 Music: OFF";
      console.log("Add a song file at sounds/happy-bday.mp3 (or change the filename in index.js).");
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🎶 Music: OFF";
  }
});

// Countdown to Jan 2 (next occurrence)
function updateCountdown() {
  const now = new Date();
  let year = now.getFullYear();
  const target = new Date(year, 0, 2, 0, 0, 0); // Jan=0
  if (now > target) target.setFullYear(year + 1);

  const diff = target - now;
  const s = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  document.getElementById("countdownValue").textContent =
    `${days}d ${hours}h ${mins}m ${secs}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Confetti on first load (small)
burstConfetti(60);function playSound(key) {
  const audio = audioPool[key];
  if (!audio) return;

  // allow rapid re-taps
  audio.currentTime = 0;
  audio.play().catch(() => {
    // In case browser blocks autoplay, user interaction will fix it
    console.log("Audio blocked until user interacts.");
  });
}

function animate(btn) {
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 120);
}

// Countdown to Jan 2 (next occurrence)
function updateCountdown() {
  const now = new Date();
  let year = now.getFullYear();
  const target = new Date(year, 0, 2, 0, 0, 0); // Jan=0

  if (now > target) target.setFullYear(year + 1);

  const diff = target - now;
  const s = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  document.getElementById("countdownValue").textContent =
    `${days}d ${hours}h ${mins}m ${secs}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);
