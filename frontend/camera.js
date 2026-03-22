// Elements
const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const canvasCtx = canvasElement.getContext("2d");

// UI elements
const repText = document.getElementById("repCount");
const feedbackText = document.getElementById("feedback");
const accuracyText = document.getElementById("accuracy");

// Exercise name
const exercise = localStorage.getItem("exercise");

// Counters
let count = 0;
let stage = "down";
let correctReps = 0;
let totalReps = 0;

// Angle calculation
function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180) angle = 360 - angle;

  return angle;
}

// Initialize Pose
const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// Pose results
pose.onResults((results) => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.drawImage(results.image, 0, 0, 500, 400);

  if (results.poseLandmarks) {

    // Draw skeleton
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 2
    });

    // Draw landmarks
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "red",
      lineWidth: 2
    });

    // 👉 RIGHT ARM (shoulder-elbow-wrist)
    const shoulder = results.poseLandmarks[12];
    const elbow = results.poseLandmarks[14];
    const wrist = results.poseLandmarks[16];

    const angle = calculateAngle(shoulder, elbow, wrist);

    // DOWN position
    if (angle < 50) {
      stage = "down";
    }

    // UP position → count rep
    if (angle > 150 && stage === "down") {
      stage = "up";

      count++;
      totalReps++;

      repText.innerText = "Reps: " + count;

      // GOOD FORM
      feedbackText.innerText = "Good rep ✅";
      correctReps++;
    }

    // BAD FORM
    if (angle > 80 && angle < 140) {
      feedbackText.innerText = "Raise your arm higher ❌";
    }

    // Accuracy calculation
    let accuracy = ((correctReps / totalReps) * 100 || 0).toFixed(1);
    accuracyText.innerText = "Accuracy: " + accuracy + "%";
  }

  canvasCtx.restore();
});

// Camera setup
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement });
  },
  width: 500,
  height: 400
});

// Start camera
function startCamera() {
  camera.start();
}

// 🔥 Save Result Function
async function saveResult() {
  const accuracy = ((correctReps / totalReps) * 100 || 0).toFixed(1);

  await fetch("http://localhost:5000/api/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      exercise: exercise,
      reps: count,
      accuracy: accuracy
    })
  });

  alert("Result Saved ✅");
}