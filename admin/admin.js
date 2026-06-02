// Default values of wishes text inside index.html
const DEFAULT_MOTHER_WISHES = `Gayathri, you are the greatest joy and the most beautiful blessing in my life. A mother's love is a quiet force that watches over you in every step you take. May your path always be lit with laughter, strength, and endless love. Grow extraordinary, dream without limits, and remember that you are deeply loved, today and always.`;

const DEFAULT_MOHAN_WISHES = `Gayathri, at last, everyone gives gifts, but this was done with efforts. ❤️ Every line of code, every memory, and every particle was written to make this day special for you. I wanted to build something real—a home for our memories that you can always return to.`;

// Elements
const logTerminal = document.getElementById("log-terminal");
const motherWishesInput = document.getElementById("mother-wishes-input");
const mohanWishesInput = document.getElementById("mohan-wishes-input");

// Logger function
function addLog(text, type = "info") {
  const line = document.createElement("div");
  line.className = `log-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  logTerminal.appendChild(line);
  logTerminal.scrollTop = logTerminal.scrollHeight;
}

// Initialise Counters
function animateCounter(id, target, speed = 30) {
  const el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  const interval = setInterval(() => {
    if (count < target) {
      count += Math.ceil(target / 15);
      if (count > target) count = target;
      el.textContent = count;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Page Load
window.addEventListener("load", () => {
  // Animate stats
  animateCounter("val-hours", 12, 40);
  animateCounter("val-lines", 2400, 20);
  animateCounter("val-memories", 16, 50);

  // Load saved values or set defaults
  const savedMother = localStorage.getItem("birthday_mother_wishes");
  const savedMohan = localStorage.getItem("birthday_mohan_wishes");

  motherWishesInput.value = savedMother || DEFAULT_MOTHER_WISHES;
  mohanWishesInput.value = savedMohan || DEFAULT_MOHAN_WISHES;

  addLog("Loaded current wishes configurations.", "system");
});

// Save wishes to LocalStorage
function saveWishes(e) {
  e.preventDefault();
  const motherVal = motherWishesInput.value.trim();
  const mohanVal = mohanWishesInput.value.trim();

  localStorage.setItem("birthday_mother_wishes", motherVal);
  localStorage.setItem("birthday_mohan_wishes", mohanVal);

  addLog("Successfully saved wishes text to localStorage!", "success");
  addLog("Reload the Birthday site to see your customizations active.", "info");
}

// Reset wishes to system defaults
function resetDefaults() {
  if (confirm("Are you sure you want to reset all wishes text to the original system defaults?")) {
    localStorage.removeItem("birthday_mother_wishes");
    localStorage.removeItem("birthday_mohan_wishes");

    motherWishesInput.value = DEFAULT_MOTHER_WISHES;
    mohanWishesInput.value = DEFAULT_MOHAN_WISHES;

    addLog("Reset wishes configurations to factory defaults.", "success");
  }
}
