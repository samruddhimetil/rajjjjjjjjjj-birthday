
// BIRTHDAY DATE: 15 NOVEMBER 2026, 12:00 AM IST
const birthdayDate = new Date("2026-11-15T00:00:00+05:30").getTime();

const lockScreen = document.getElementById("lockScreen");
const unlockScreen = document.getElementById("unlockScreen");
const birthdayWebsite = document.getElementById("birthdayWebsite");

const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";

// BACKGROUND BIRTHDAY MUSIC
const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
  bgMusic.volume = 0.7;
  bgMusic.loop = true;
}

function showUnlockScreen() {
  lockScreen.style.display = "none";
  unlockScreen.classList.add("show");
}

function showBirthdaySite() {
  lockScreen.style.display = "none";
  unlockScreen.classList.remove("show");
  birthdayWebsite.classList.add("show");
  document.body.style.overflow = "auto";
  window.scrollTo(0, 0);
}

function updateCountdown() {
  const now = new Date().getTime();
  const difference = birthdayDate - now;

  if (difference <= 0) {
    showUnlockScreen();
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// 15 REASONS
const reasons = [
  "Your smile can make an ordinary day feel special.",
  "The way you make me laugh.",
  "Your little efforts mean more than you know.",
  "The person you are, inside and out.",
  "Your dreams and the way you work for them.",
  "The way you make memories out of little things.",
  "Your silly side that always makes me smile.",
  "The comfort of talking to you.",
  "Your kindness and your heart.",
  "The way you make me feel appreciated.",
  "Your determination to keep going.",
  "All the little things that make you, you.",
  "The memories we have made together.",
  "The person I get to share so many moments with.",
  "Simply because you are Raj, and that is special to me."
];

function buildReasons() {
  const reasonsGrid = document.getElementById("reasonsGrid");
  const reasonCounter = document.getElementById("reasonCounter");
  const reasonEnding = document.getElementById("reasonEnding");

  let openedCount = 0;

  reasons.forEach((reason, index) => {
    const card = document.createElement("button");
    card.className = "reason-card";
    card.type = "button";

    const number = document.createElement("span");
    number.className = "reason-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const text = document.createElement("span");
    text.className = "reason-text";
    text.textContent = reason;

    card.appendChild(number);
    card.appendChild(text);

    card.addEventListener("click", () => {
      if (card.classList.contains("revealed")) {
        return;
      }

      card.classList.add("revealed");
      openedCount++;

      reasonCounter.textContent = `${openedCount} / 15 opened`;

      if (openedCount === 15) {
        reasonEnding.textContent =
          "And these are only 15 reasons. There are so many more. ♡";
      }
    });

    reasonsGrid.appendChild(card);
  });
}

// UNLOCK BUTTON + MUSIC
document.getElementById("enterButton").addEventListener("click", () => {
  if (bgMusic) {
    bgMusic.play().catch((error) => {
      console.log("Music playback error:", error);
    });
  }

  showBirthdaySite();
});

// HERO BUTTON
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("surprise").textContent =
    "Here is to all the little moments that make our story special. ♡";

  document.getElementById("memories").scrollIntoView({
    behavior: "smooth"
  });
});

// LETTER BUTTON
document.getElementById("letterButton").addEventListener("click", () => {
  const letterContent = document.getElementById("letterContent");
  const letterButton = document.getElementById("letterButton");

  letterContent.hidden = false;
  letterButton.textContent = "Your letter is open ♡";
  letterButton.disabled = true;

  letterContent.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// INITIALIZE WEBSITE
buildReasons();

if (isPreview || new Date().getTime() >= birthdayDate) {
  showUnlockScreen();
} else {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
