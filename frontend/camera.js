// ==========================
// ELEMENTS
// ==========================
const video = document.getElementById("video");
const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");

const repsEl = document.getElementById("reps");
const accuracyEl = document.getElementById("accuracy");
const stageEl = document.getElementById("stage");
const aiMessage = document.getElementById("aiMessage");
const fatigueEl = document.getElementById("fatigue");
const fatigueBar = document.getElementById("fatigueBar");
const scoreEl = document.getElementById("score");

// ==========================
// VARIABLES
// ==========================
let reps = 0;
let stage = null;
let accuracy = 100;

let accuracyHistory = [];
let fatigueScore = 0;
let sessionScore = 0;

let cameraInstance = null;

// 🔊 VOICE
let lastSpoken = "";
let speechEnabled = true;

// ==========================
// VOICE FUNCTION
// ==========================
function speak(text) {
  if (!speechEnabled || text === lastSpoken) return;

  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);

  lastSpoken = text;
}

function toggleVoice() {
  speechEnabled = !speechEnabled;
  alert(speechEnabled ? "Voice ON" : "Voice OFF");
}

// ==========================
// ANGLE
// ==========================
function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let angle = Math.abs((radians * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;

  return angle;
}

// ==========================
// FATIGUE
// ==========================
function checkFatigue(currentAccuracy) {
  accuracyHistory.push(currentAccuracy);

  if (accuracyHistory.length > 8) accuracyHistory.shift();
  if (accuracyHistory.length < 5) return false;

  let drops = 0;
  for (let i = 1; i < accuracyHistory.length; i++) {
    if (accuracyHistory[i] < accuracyHistory[i - 1] - 5) drops++;
  }

  return drops >= 3;
}

// ==========================
// SCORE
// ==========================
function calculateScore() {
  let accScore = accuracy;
  let repScore = Math.min(reps * 5, 100);
  let fatiguePenalty = fatigueScore;

  sessionScore = Math.round(
    accScore * 0.5 +
    repScore * 0.3 +
    (100 - fatiguePenalty) * 0.2
  );
}

function getScoreFeedback(score) {
  if (score > 85) return "🏆 Excellent!";
  if (score > 70) return "🔥 Great job!";
  if (score > 50) return "👍 Good effort!";
  return "⚠️ Needs improvement";
}

// ==========================
// SKELETON
// ==========================
function drawSkeleton(ctx, lm) {
  const connections = [
    [11,13],[13,15],
    [12,14],[14,16],
    [11,12],
    [11,23],[12,24],
    [23,24],
    [23,25],[25,27],
    [24,26],[26,28]
  ];

  ctx.strokeStyle = "#00FFAA";
  ctx.lineWidth = 3;

  connections.forEach(([i, j]) => {
    ctx.beginPath();
    ctx.moveTo(lm[i].x * canvas.width, lm[i].y * canvas.height);
    ctx.lineTo(lm[j].x * canvas.width, lm[j].y * canvas.height);
    ctx.stroke();
  });

  ctx.fillStyle = "#FF3B3B";
  lm.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
    ctx.fill();
  });
}

// ==========================
// MEDIAPIPE
// ==========================
const pose = new Pose({
  locateFile: file =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// ==========================
// MAIN LOOP
// ==========================
pose.onResults((results) => {
  if (!results.poseLandmarks) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  const lm = results.poseLandmarks;
  drawSkeleton(ctx, lm);

  const angle = calculateAngle(lm[11], lm[13], lm[15]);

  if (angle > 150) stage = "down";
  if (angle < 60 && stage === "down") {
    stage = "up";
    reps++;
  }

  accuracy = Math.max(0, Math.min(100, 100 - Math.abs(angle - 90)));

  // FATIGUE
  fatigueScore += checkFatigue(accuracy) ? 5 : -2;
  fatigueScore = Math.max(0, Math.min(100, fatigueScore));

  // SCORE
  calculateScore();

  // MESSAGE
  let message = "";

  if (fatigueScore > 60) {
    message = "You are very tired. Take a break.";
  } else if (accuracy > 90) {
    message = "Perfect form.";
  } else {
    message = "Keep going.";
  }

  let feedback = getScoreFeedback(sessionScore);
  aiMessage.innerText = `${message} ${feedback}`;
  speak(message);

  // UPDATE UI
  repsEl.innerText = reps;
  accuracyEl.innerText = Math.round(accuracy) + "%";
  stageEl.innerText = stage || "-";
  fatigueEl.innerText = fatigueScore + "%";
  fatigueBar.style.width = fatigueScore + "%";
  scoreEl.innerText = sessionScore;
});

// ==========================
// CAMERA
// ==========================
function startCamera() {
  if (cameraInstance) return;

  cameraInstance = new Camera(video, {
    onFrame: async () => {
      await pose.send({ image: video });
    },
    width: 640,
    height: 480,
  });

  cameraInstance.start();
}

function stopCamera() {
  if (!cameraInstance) return;

  const stream = video.srcObject;
  if (stream) stream.getTracks().forEach(t => t.stop());

  // SAVE TO BACKEND
  fetch("/api/results", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      reps,
      accuracy,
      fatigue: fatigueScore,
      score: sessionScore
    })
  });

  // 🔥 STORE RESULT LOCALLY
  localStorage.setItem("sessionResult", JSON.stringify({
    reps,
    accuracy,
    fatigue: fatigueScore,
    score: sessionScore
  }));

  // 🔥 REDIRECT TO RESULT PAGE
  window.location.href = "result.html";
}

// BUTTONS
document.getElementById("startBtn").onclick = startCamera;
document.getElementById("stopBtn").onclick = stopCamera;