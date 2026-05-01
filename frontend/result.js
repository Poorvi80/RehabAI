const data = JSON.parse(localStorage.getItem("sessionResult"));

// ==========================
// LEVEL SYSTEM
// ==========================
function getLevel(score) {
  if (score <= 20) return 1;
  if (score <= 30) return 2;
  if (score <= 40) return 3;
  if (score <= 50) return 4;
  if (score <= 60) return 5;
  if (score <= 70) return 6;
  if (score <= 80) return 7;
  if (score <= 85) return 8;
  if (score <= 90) return 9;
  return 10;
}

// ==========================
// FEEDBACK
// ==========================
function getFeedback(score) {
  if (score > 85) return "🏆 Excellent!";
  if (score > 70) return "🔥 Great job!";
  if (score > 50) return "👍 Good effort!";
  return "⚠️ Keep improving!";
}

// ==========================
// INIT
// ==========================
const level = getLevel(data.score);

// 🎉 SHOW LEVEL TEXT
document.getElementById("levelText").innerText =
  `Level ${level} Completed`;

// ==========================
// CLOSE POPUP
// ==========================
function closePopup() {
  document.getElementById("levelPopup").style.display = "none";
  document.getElementById("resultContent").classList.remove("hidden");

  // fill data
  document.getElementById("score").innerText = data.score;
  document.getElementById("reps").innerText = data.reps;
  document.getElementById("accuracy").innerText = data.accuracy;
  document.getElementById("fatigue").innerText = data.fatigue;

  document.getElementById("feedback").innerText =
    getFeedback(data.score);
}

// ==========================
// NAVIGATION
// ==========================
function goBack() {
  window.location.href = "dashboard.html";
}