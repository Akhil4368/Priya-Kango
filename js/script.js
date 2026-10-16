const reasons = ["Your smile makes everything better.", "You make ordinary moments special.", "I love the way you care.", "Your presence makes me happy.", "You understand me.", "Your laugh is addictive.", "You make me feel lucky.", "You are beautifully yourself.", "You make my days brighter.", "You are my favorite person.", "Your little things mean a lot.", "You make me smile for no reason.", "You make memories unforgettable.", "I love talking to you.", "You are incredibly special.", "You bring warmth into my life.", "Your happiness matters to me.", "You inspire me to be better.", "You are one of a kind.", "You make life more beautiful.", "I love our memories.", "I love having you in my life."];

const reasonsGrid = document.getElementById("reasonsGrid");
reasons.forEach((reason, index) => {
  const card = document.createElement("button");
  card.className = "reason-card";
  card.type = "button";
  card.innerHTML = `<strong class="number">${String(index + 1).padStart(2, "0")} ❤️<br><small>Tap to reveal</small></strong><span class="revealed">${reason}</span>`;
  card.addEventListener("click", () => card.classList.toggle("active"));
  reasonsGrid.appendChild(card);
});

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
let musicIsPlaying = false;
let heartTimerStarted = false;

// Try to start the looping background instrumental when the page opens.
// Browsers may block audible autoplay; the first "Open your surprise" tap
// also starts playback, and the floating music button remains available.
window.addEventListener("load", async () => {
  try {
    await music.play();
    musicIsPlaying = true;
    musicButton.textContent = "🔊";
  } catch (error) {
    musicButton.textContent = "🎵";
  }
});

document.getElementById("startButton").addEventListener("click", async () => {
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
  startFloatingHearts();
  try {
    await music.play();
    musicIsPlaying = true;
    musicButton.textContent = "🔊";
  } catch (error) {
    // Browser may require the user to tap the music button.
  }
});

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicIsPlaying = true;
      musicButton.textContent = "🔊";
    } catch (error) {
      musicButton.textContent = "🎵";
    }
  } else {
    music.pause();
    musicIsPlaying = false;
    musicButton.textContent = "🎵";
  }
});

document.getElementById("giftButton").addEventListener("click", () => {
  document.getElementById("giftPrompt").classList.add("hidden");
  document.getElementById("finalMessage").classList.remove("hidden");
  launchConfetti();
  startFloatingHearts();
});

function startFloatingHearts() {
  if (heartTimerStarted) return;
  heartTimerStarted = true;
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💕", "💗", "💖", "💘"][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (16 + Math.random() * 22) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 900);
}

function launchConfetti() {
  const pieces = ["🎉", "✨", "💕", "💖", "🎊"];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (16 + Math.random() * 20) + "px";
    piece.style.animationDelay = (Math.random() * 1.2) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}


// Reading progress bar
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.getElementById("readingProgress").style.width = progress + "%";
});

// Photo lightbox: tap any memory photo to view it larger and swipe through using arrows.
const galleryImages = [...document.querySelectorAll(".photo-card img")];
const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
let currentPhotoIndex = 0;

function showPhoto(index) {
  if (!galleryImages.length) return;
  currentPhotoIndex = (index + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentPhotoIndex];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || "Memory photo";
  lightboxCaption.textContent = img.closest("figure")?.querySelector("figcaption")?.textContent || "";
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closePhoto() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "";
}
galleryImages.forEach((img, index) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => showPhoto(index));
});
document.getElementById("lightboxClose").addEventListener("click", closePhoto);
document.getElementById("lightboxPrev").addEventListener("click", () => showPhoto(currentPhotoIndex - 1));
document.getElementById("lightboxNext").addEventListener("click", () => showPhoto(currentPhotoIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});
document.addEventListener("keydown", (event) => {
  if (lightbox.classList.contains("hidden")) return;
  if (event.key === "Escape") closePhoto();
  if (event.key === "ArrowLeft") showPhoto(currentPhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(currentPhotoIndex + 1);
});

// Little personal notes
document.querySelectorAll(".note-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("noteText").textContent = card.dataset.note;
    document.getElementById("noteReveal").classList.remove("hidden");
    document.getElementById("noteReveal").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
document.getElementById("noteClose").addEventListener("click", () => {
  document.getElementById("noteReveal").classList.add("hidden");
});


// Secret Love Box
const loveBoxButton = document.getElementById("loveBoxButton");
loveBoxButton.addEventListener("click", () => {
  const message = document.getElementById("loveBoxMessage");
  const opening = message.classList.contains("hidden");
  message.classList.toggle("hidden", !opening);
  loveBoxButton.classList.toggle("opened", opening);
  loveBoxButton.setAttribute("aria-expanded", String(opening));
  loveBoxButton.querySelector("span").textContent = opening ? "Your love note is open 💌" : "Tap to open";
  if (opening) message.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Final surprise hug: reveal a full-screen-feeling romantic moment.
(() => {
  const button = document.getElementById('finalHugButton');
  const reveal = document.getElementById('finalHugReveal');
  const again = document.getElementById('hugAgainButton');
  if (!button || !reveal) return;
  const sendHug = () => {
    reveal.classList.remove('hidden');
    reveal.classList.remove('hug-replay');
    void reveal.offsetWidth;
    reveal.classList.add('hug-replay');
    button.textContent = 'Your hug is waiting right here 💗';
    launchConfetti();
    startFloatingHearts();
    const symbols = ['💖','💕','✨','💗','🌸','🫶'];
    for (let i=0; i<34; i++) {
      const bit = document.createElement('span');
      bit.className = 'hug-burst';
      bit.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      bit.style.left = `${Math.random()*100}vw`;
      bit.style.top = `${55 + Math.random()*35}vh`;
      bit.style.setProperty('--x', `${Math.random()*260-130}px`);
      bit.style.setProperty('--y', `${-100-Math.random()*260}px`);
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), 1900);
    }
    reveal.scrollIntoView({behavior:'smooth', block:'center'});
  };
  button.addEventListener('click', sendHug);
  if (again) again.addEventListener('click', sendHug);
})();

// Extra effects: gentle reveal animations, sparkle trail, romantic petals, glow pulse.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const glow = document.createElement('div');
  glow.id = 'loveGlow';
  document.body.appendChild(glow);

  // Reveal content as it enters the viewport.
  const revealTargets = document.querySelectorAll('section h2, .gallery-item, .timeline-item, .reason-card, .note-card, .love-box, .voice-player, .hug-reveal');
  revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));

  // Tiny sparkles follow taps/mouse, but limit frequency for smooth mobile performance.
  let lastSparkle = 0;
  function sparkleAt(x, y) {
    const now = Date.now();
    if (now - lastSparkle < 65) return;
    lastSparkle = now;
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    sparkle.textContent = ['✦', '♡', '✧', '♥'][Math.floor(Math.random() * 4)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty('--sx', `${Math.random() * 50 - 25}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  }
  document.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') sparkleAt(e.clientX, e.clientY); }, { passive: true });
  document.addEventListener('pointerdown', e => {
    sparkleAt(e.clientX, e.clientY);
    glow.classList.add('active');
    setTimeout(() => glow.classList.remove('active'), 550);
  }, { passive: true });

  // Floating rose petals drift gently down the page at intervals.
  const petalSymbols = ['🌸', '🌹', '💗', '✿'];
  function makePetal() {
    if (document.hidden) return;
    const petal = document.createElement('span');
    petal.className = 'romantic-petal';
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${12 + Math.random() * 15}px`;
    petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    const duration = 8 + Math.random() * 7;
    petal.style.animationDuration = `${duration}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }
  for (let i = 0; i < 5; i++) setTimeout(makePetal, i * 650);
  setInterval(makePetal, 1700);

  // Add gentle hover glow to common interactive cards.
  document.querySelectorAll('.gallery-item, .reason-card, .note-card, .timeline-item, .love-box').forEach(el => el.classList.add('glow-card'));
})();


// Little promise reveal
const promiseButton = document.getElementById("promiseButton");
const promiseMessage = document.getElementById("promiseMessage");
if (promiseButton && promiseMessage) {
  promiseButton.addEventListener("click", () => {
    const isOpen = !promiseMessage.classList.contains("hidden");
    promiseMessage.classList.toggle("hidden", isOpen);
    promiseButton.setAttribute("aria-expanded", String(!isOpen));
    promiseButton.querySelector("span").textContent = isOpen ? "Tap for my promise" : "My heart is yours 💖";
    if (!isOpen) promiseMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}


// Virtual hug: bright screen glow, then reveal the heartfelt message.
(() => {
  const button = document.getElementById('hugButton');
  const message = document.getElementById('hugMessage');
  const flash = document.getElementById('loveFlash');
  if (!button || !message) return;
  let busy = false;
  button.addEventListener('click', () => {
    const opening = message.classList.contains('hidden');
    if (!opening) {
      message.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('.hug-button-label').textContent = 'Tap to get your hug';
      return;
    }
    if (busy) return;
    busy = true;
    button.classList.add('hug-launch');
    if (flash) { flash.classList.remove('flash-play'); void flash.offsetWidth; flash.classList.add('flash-play'); }
    const symbols = ['💖','💕','✨','💗','🌸','♡','⭐'];
    for (let i=0; i<42; i++) {
      const bit = document.createElement('span');
      bit.className = 'hug-burst'; bit.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      bit.style.left = `${window.innerWidth/2}px`; bit.style.top = `${window.innerHeight*.48}px`;
      bit.style.setProperty('--x', `${Math.random()*window.innerWidth-window.innerWidth/2}px`);
      bit.style.setProperty('--y', `${Math.random()*-window.innerHeight*.75-30}px`);
      document.body.appendChild(bit); setTimeout(()=>bit.remove(),1900);
    }
    setTimeout(() => {
      message.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('.hug-button-label').textContent = 'Your hug is here 💗';
      message.scrollIntoView({behavior:'smooth', block:'center'});
      button.classList.remove('hug-launch'); busy = false;
    }, 850);
  });
})();

// Every button gets a little press sparkle/ripple for a delightful response.
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button.disabled || button.classList.contains('music-btn')) return;
    const rect = button.getBoundingClientRect();
    const spark = document.createElement('span');
    spark.className = 'tap-sparkle'; spark.textContent = ['✨','💖','✦','💕'][Math.floor(Math.random()*4)];
    spark.style.left = `${Math.min(Math.max(event.clientX || rect.left+rect.width/2, 0),window.innerWidth)}px`;
    spark.style.top = `${Math.min(Math.max(event.clientY || rect.top+rect.height/2, 0),window.innerHeight)}px`;
    document.body.appendChild(spark); setTimeout(()=>spark.remove(),950);
    button.classList.remove('button-pop'); void button.offsetWidth; button.classList.add('button-pop');
    setTimeout(()=>button.classList.remove('button-pop'),500);
  });
});

// Memory jar: reveal a sweet note from each heart.
document.querySelectorAll('.memory-heart').forEach((button) => {
  button.addEventListener('click', () => {
    const reveal = document.getElementById('memoryJarReveal');
    document.getElementById('memoryJarText').textContent = button.dataset.memory;
    reveal.classList.remove('hidden');
    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    button.classList.add('heart-picked');
  });
});

// Birthday day planner: let her choose exactly three activities.
const dateChoices = [...document.querySelectorAll('.date-choice')];
const datePickCounter = document.getElementById('datePickCounter');
const confirmDatePlan = document.getElementById('confirmDatePlan');
const dateChoiceResult = document.getElementById('dateChoiceResult');
const selectedBirthdayPlans = new Set();

dateChoices.forEach((button) => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    const activity = button.dataset.date;
    if (selectedBirthdayPlans.has(activity)) {
      selectedBirthdayPlans.delete(activity);
      button.classList.remove('date-selected');
      button.setAttribute('aria-pressed', 'false');
    } else if (selectedBirthdayPlans.size < 3) {
      selectedBirthdayPlans.add(activity);
      button.classList.add('date-selected');
      button.setAttribute('aria-pressed', 'true');
    } else {
      datePickCounter.textContent = 'You already picked 3, birthday girl! Unselect one to change your plan. 💕';
      return;
    }
    datePickCounter.textContent = `${selectedBirthdayPlans.size} / 3 selected`;
    confirmDatePlan.disabled = selectedBirthdayPlans.size !== 3;
    dateChoiceResult.classList.add('hidden');
  });
});

confirmDatePlan.addEventListener('click', () => {
  if (selectedBirthdayPlans.size !== 3) return;
  const picks = [...selectedBirthdayPlans];
  dateChoiceResult.innerHTML = `<h3>Our birthday adventure is planned! 💖</h3><p>Baby, your 3 wishes are my plan for your special day:</p><ol>${picks.map((pick) => `<li>${pick}</li>`).join('')}</ol><p class="date-love-note">And you know what? The best part of every plan is getting to spend the day with you. Your smile, your happiness, and your wishes matter to me. Get ready for a day full of fun, cuddles, surprises, and memories we'll keep forever. I love you, birthday girl. ❤️</p><p class="date-signoff">Sending you all my love ❤️</p>`;
  dateChoiceResult.classList.remove('hidden');
  dateChoiceResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (typeof startFloatingHearts === 'function') startFloatingHearts();
});


// Birthday cake: tap each candle to blow it out, then play a synthesized Happy Birthday tune.
(() => {
  const candles = [...document.querySelectorAll('.cake-candle')];
  const counter = document.getElementById('candlesCounter');
  const wish = document.getElementById('cakeWish');
  let celebrationStarted = false;
  candles.forEach((candle, index) => {
    candle.addEventListener('click', () => {
      if (candle.classList.contains('blown') || celebrationStarted) return;
      candle.classList.add('blown');
      candle.setAttribute('aria-label', `Candle ${index + 1} blown out`);
      const remaining = candles.filter(c => !c.classList.contains('blown')).length;
      counter.textContent = remaining ? `${remaining} candle${remaining === 1 ? '' : 's'} left! Tap them all to make your birthday wish come true. ✨` : 'All candles are out! Make a wish, birthday girl! 💖';
      if (remaining === 0) {
        celebrationStarted = true;
        wish.classList.remove('hidden');
        setTimeout(startBirthdayCelebration, 900);
      }
    });
  });

  function playHappyBirthdayTune() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    ctx.resume().catch(() => {});
    // Familiar Happy Birthday melody, synthesized in-browser (no external audio file needed).
    const melody = [
      [392,.32],[392,.18],[440,.5],[392,.5],[523,.5],[494,.9],
      [392,.32],[392,.18],[440,.5],[392,.5],[587,.5],[523,.9],
      [392,.32],[392,.18],[784,.5],[659,.5],[523,.5],[494,.5],[440,.9],
      [698,.32],[698,.18],[659,.5],[523,.5],[587,.5],[523,1.0]
    ];
    let time = ctx.currentTime + .12;
    melody.forEach(([frequency,duration]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001,time);
      gain.gain.exponentialRampToValueAtTime(.16,time+.025);
      gain.gain.setTargetAtTime(.0001,time+Math.max(.05,duration-.06),.035);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(time); osc.stop(time+duration);
      time += duration + .035;
    });
    setTimeout(() => ctx.close().catch(()=>{}), 16000);
  }

  function startBirthdayCelebration() {
    const overlay = document.createElement('div');
    overlay.className = 'cake-celebration';
    overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
    overlay.innerHTML = `<div class="celebration-cake" aria-hidden="true">🎂</div><h2>Happy Birthday, My Love! 🎉</h2><p>Make your sweetest wish, beautiful. I hope your year is filled with laughter, adventures, peaceful days, and all the love your heart can hold. You deserve to feel celebrated today and always. ❤️</p><p style="font-family:Georgia,serif;font-size:1.5rem">With all my love, always ❤️</p><button class="cake-close" type="button">Back to my surprises 💗</button>`;
    for (let i=0;i<90;i++) {
      const bit=document.createElement('span'); bit.className='cake-confetti';
      bit.textContent=['💖','✨','🌸','💕','🎊','⭐'][Math.floor(Math.random()*6)];
      bit.style.left=Math.random()*100+'%'; bit.style.fontSize=(14+Math.random()*22)+'px';
      bit.style.setProperty('--drift',(Math.random()*220-110)+'px');
      bit.style.animationDuration=(3+Math.random()*4)+'s'; bit.style.animationDelay=(Math.random()*1.5)+'s';
      overlay.appendChild(bit);
    }
    document.body.appendChild(overlay);
    document.body.style.overflow='hidden';
    playHappyBirthdayTune();
    if (typeof startFloatingHearts === 'function') startFloatingHearts();
    overlay.querySelector('.cake-close').addEventListener('click',()=>{
      overlay.remove(); document.body.style.overflow='';
    });
  }
})();


// Cake's Open your surprise button smoothly takes her into the birthday surprise.
document.getElementById('cakeOpenSurprise')?.addEventListener('click', () => {
  document.getElementById('hero')?.scrollIntoView({behavior:'smooth', block:'start'});
  if (typeof startFloatingHearts === 'function') startFloatingHearts();
});
