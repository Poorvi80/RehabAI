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

// ==========================
// VARIABLES
// ==========================
let reps = 0;
let stage = null;
let accuracy = 100;

let lastAccuracy = 100;
let fatigueCount = 0;

let cameraInstance = null;

// ==========================
// ANGLE FUNCTION
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
// MEDIAPIPE SETUP
// ==========================
const pose = new Pose({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// ==========================
// RESULTS
// ==========================
pose.onResults((results) => {
  if (!results.poseLandmarks) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  const lm = results.poseLandmarks;

  const shoulder = lm[11];
  const elbow = lm[13];
  const wrist = lm[15];

  const angle = calculateAngle(shoulder, elbow, wrist);

  // REPS
  if (angle > 150) stage = "down";
  if (angle < 60 && stage === "down") {
    stage = "up";
    reps++;
  }

  // ACCURACY
  accuracy = Math.max(0, Math.min(100, 100 - Math.abs(angle - 90)));

  // FATIGUE
  if (accuracy < lastAccuracy - 10) {
    fatigueCount++;
  } else {
    fatigueCount = 0;
  }
  lastAccuracy = accuracy;

  // AI MESSAGE
  if (fatigueCount >= 3) {
    aiMessage.innerText = "😣 You're getting tired!";
  } else if (accuracy > 90) {
    aiMessage.innerText = "🔥 Perfect form!";
  } else if (accuracy > 70) {
    aiMessage.innerText = "💪 Good!";
  } else {
    aiMessage.innerText = "⚠️ Fix posture!";
  }

  // UPDATE UI
  repsEl.innerText = reps;
  accuracyEl.innerText = Math.round(accuracy) + "%";
  stageEl.innerText = stage || "-";
});

// ==========================
// CAMERA CONTROL
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
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  video.srcObject = null;
  cameraInstance = null;
}

// ==========================
// BUTTON EVENTS
// ==========================
document.getElementById("startBtn").addEventListener("click", startCamera);
document.getElementById("stopBtn").addEventListener("click", stopCamera);