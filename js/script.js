const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
let musicIsPlaying = false;
let heartTimerStarted = false;

// Try to play background music as soon as the website opens.
async function startBackgroundMusic() {
  if (!music) return;

  try {
    music.loop = true;
    await music.play();
    musicIsPlaying = true;

    if (musicButton) {
      musicButton.textContent = "🔊";
    }
  } catch (error) {
    // Browser blocked autoplay; try again after the first interaction.
    if (musicButton) {
      musicButton.textContent = "🎵";
    }
  }
}

window.addEventListener("load", startBackgroundMusic);

// If autoplay is blocked, start music on the visitor's first tap.
document.addEventListener(
  "pointerdown",
  (event) => {
    if (event.target.closest("#musicButton")) return;

    if (music && music.paused) {
      startBackgroundMusic();
    }
  },
  { once: true }
);

// Start the surprise and music.
document.getElementById("startButton")?.addEventListener("click", () => {
  document.getElementById("hero")?.scrollIntoView({
    behavior: "smooth"
  });

  startFloatingHearts();
  startBackgroundMusic();
});

// Music button: pause or resume.
musicButton?.addEventListener("click", async () => {
  if (!music) return;

  if (music.paused) {
    await startBackgroundMusic();
  } else {
    music.pause();
    musicIsPlaying = false;
    musicButton.textContent = "🎵";
  }
});

// Also start music from the cake surprise button.
document.getElementById("cakeOpenSurprise")?.addEventListener("click", () => {
  startBackgroundMusic();
});
