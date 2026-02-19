// Get selected exercise ID
const exerciseId = localStorage.getItem("selectedExercise");

if (!exerciseId) {
  alert("No exercise selected");
  window.location.href = "dashboard.html";
}

// Show exercise ID on page (temporary)
document.getElementById("exerciseName").innerText =
  "Exercise ID: " + exerciseId;

// Start camera
const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error(err);
    alert("Camera permission denied");
  });
