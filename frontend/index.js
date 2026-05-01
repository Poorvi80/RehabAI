// ==========================
// START BUTTON NAVIGATION
// ==========================
const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
}

// ==========================
// VIDEO FALLBACK HANDLING
// ==========================
const video = document.getElementById("bg-video");

if (video) {
  video.addEventListener("error", () => {
    console.log("Video failed → using fallback background");

    document.body.style.background =
      "linear-gradient(135deg, #667eea, #764ba2)";
  });

  // Try autoplay fix
  video.play().catch(() => {
    video.muted = true;
    video.play();
  });
}