(() => {
  // Elements
  const buttons = document.querySelectorAll(".drum");
  const backdrop = document.getElementById("surpriseBackdrop");
  const closeBtn = document.getElementById("closeSurprise");
  const countdownEl = document.getElementById("countdownValue");
  const confettiHost = document.getElementById("confetti");
  const musicBtn = document.getElementById("musicBtn");

  // Drum sounds map
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
  for (const [k, file] of Object.entries(soundMap)) {
    const a = new Audio(`sounds/${file}`);
    a.preload = "auto";
    audioPool[k] = a;
  }

  function playDrum(key) {
    const a = audioPool[key];
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  function animate(btn) {
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 120);
  }

  // Secret unlock: SHREYA
  const secret = "shreya";
  let buffer = "";

  function recordKey(key) {
    buffer = (buffer + key).slice(-secret.length);
    if (buffer === secret) {
      buffer = "";
      openSurprise();
    }
  }

  function openSurprise() {
    if (!backdrop) return;
    backdrop.classList.remove("hidden");
    burstConfetti(140);
  }

  function closeSurprise(e) {
    if (!backdrop) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    backdrop.classList.add("hidden");
  }

  // Drum clicks
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.textContent.trim().toLowerCase();
      playDrum(key);
      animate(btn);
      recordKey(key);
    });
  });

  // Keyboard support + ESC closes modal
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const btn = [...buttons].find(
      (b) => b.textContent.trim().toLowerCase() === key
    );
    if (btn) {
      playDrum(key);
      animate(btn);
      recordKey(key);
    }
    if (e.key === "Escape") closeSurprise(e);
  });

  // Close modal
  if (closeBtn) closeBtn.addEventListener("click", closeSurprise);
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeSurprise(e);
    });
  }

  // Countdown to Jan 2 (next occurrence)
  function updateCountdown() {
    if (!countdownEl) return;
    const now = new Date();
    let year = now.getFullYear();
    const target = new Date(year, 0, 2, 0, 0, 0);
    if (now > target) target.setFullYear(year + 1);

    const diff = target - now;
    const s = Math.max(0, Math.floor(diff / 1000));
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;

    countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Confetti
  function burstConfetti(count = 80) {
    if (!confettiHost) return;
    const colors = ["#ff3aa7", "#6b4bff", "#ffd1f3", "#ffe7a8", "#ffffff"];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";

      const left = Math.random() * 100;
      const drift = (Math.random() * 2 - 1) * 160;
      const duration = 1600 + Math.random() * 1400;
      const delay = Math.random() * 200;

      piece.style.left = `${left}vw`;
      piece.style.setProperty("--drift", `${drift}px`);
      piece.style.background = colors[(Math.random() * colors.length) | 0];
      piece.style.animationDuration = `${duration}ms`;
      piece.style.animationDelay = `${delay}ms`;

      confettiHost.appendChild(piece);
      setTimeout(() => piece.remove(), duration + delay + 200);
    }
  }

  // Confetti on load
  burstConfetti(60);

  // Music toggle (requires sounds/happy-bday.mp3)
  let musicOn = false;
  const bgMusic = new Audio("sounds/happy-bday.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.35;

  if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
      musicOn = !musicOn;

      if (musicOn) {
        try {
          await bgMusic.play();
          musicBtn.textContent = "🎶 Music: ON";
          burstConfetti(40);
        } catch (err) {
          musicOn = false;
          musicBtn.textContent = "🎶 Music: OFF";
          alert("Add sounds/happy-bday.mp3 (or change the filename in index.js).");
        }
      } else {
        bgMusic.pause();
        musicBtn.textContent = "🎶 Music: OFF";
      }
    });
  }
})();
