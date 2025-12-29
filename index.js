const buttons = document.querySelectorAll(".drum");

const soundMap = {
  s: "tom-1.mp3",
  h: "tom-4.mp3",
  r: "snare.mp3",
  e: "snare.mp3",
  y: "crash.mp3",
  a: "tom-3.mp3",
};

// Preload sounds (faster + more reliable)
const audioPool = {};
for (const [key, file] of Object.entries(soundMap)) {
  const audio = new Audio(`sounds/${file}`);
  audio.preload = "auto";
  audioPool[key] = audio;
}

buttons.forEach((btn) => {
  btn.addEventListener("pointerdown", () => {
    const key = btn.textContent.trim().toLowerCase();
    playSound(key);
    animate(btn);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const btn = [...buttons].find((b) => b.textContent.trim().toLowerCase() === key);
  if (btn) {
    playSound(key);
    animate(btn);
  }
});

function playSound(key) {
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
