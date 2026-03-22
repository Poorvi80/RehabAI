// Fetch exercises from backend
async function fetchExercises() {
  try {
    const res = await fetch("http://localhost:5000/api/exercises");
    const data = await res.json();

    const container = document.getElementById("exerciseList");
    container.innerHTML = "";

    data.forEach(ex => {
      const div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
        <h3>🏋️ ${ex.name}</h3>
        <p>${ex.description}</p>
        <p><b>${ex.difficulty}</b></p>
        <button onclick="startExercise('${ex.name}')">Start</button>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
}

// Start exercise → go to camera
function startExercise(name) {
  localStorage.setItem("exercise", name);
  window.location.href = "camera.html";
}

// Load exercises
fetchExercises();