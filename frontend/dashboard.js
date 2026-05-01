// ==========================
// ELEMENTS
// ==========================
const container = document.getElementById("exerciseList");
const streakEl = document.getElementById("streak");
const goalSelect = document.getElementById("goalSelect"); // 🔥 NEW

// ==========================
// LOAD DASHBOARD
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedGoal(); // 🔥 NEW
  fetchExercises();
  fetchStreak();
});

// ==========================
// LOAD SAVED GOAL
// ==========================
function loadSavedGoal() {
  const savedGoal = localStorage.getItem("rehabGoal");
  if (savedGoal && goalSelect) {
    goalSelect.value = savedGoal;
  }
}

// ==========================
// FILTER FUNCTION (🔥 CORE)
// ==========================
function filterExercises(goal, exercises) {
  if (!goal || goal === "all") return exercises;

  return exercises.filter((exercise) => {
    const name = exercise.name.toLowerCase();

    if (goal === "knee") {
      return (
        name.includes("knee") ||
        name.includes("squat") ||
        name.includes("lunge") ||
        name.includes("leg")
      );
    }

    if (goal === "shoulder") {
      return (
        name.includes("shoulder") ||
        name.includes("arm") ||
        name.includes("press")
      );
    }

    return true;
  });
}

// ==========================
// FETCH EXERCISES
// ==========================
async function fetchExercises() {
  try {
    container.innerHTML = `
      <p class="text-center text-lg">Loading exercises...</p>
    `;

    const res = await fetch("/api/exercises");

    if (!res.ok) {
      throw new Error("Failed to fetch exercises");
    }

    let data = await res.json();

    // 🔥 APPLY GOAL FILTER
    if (goalSelect) {
      data = filterExercises(goalSelect.value, data);
    }

    // Clear container
    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = `
        <div class="text-center p-6 bg-white/10 rounded-xl">
          <h2 class="text-xl font-bold">No Exercises Found</h2>
          <p class="text-sm opacity-70">Try changing your rehab goal</p>
        </div>
      `;
      return;
    }

    // ==========================
    // CREATE CARDS
    // ==========================
    data.forEach((exercise) => {
      const card = document.createElement("div");

      card.className =
        "bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300";

      card.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${exercise.name}</h2>
        <p class="text-sm opacity-80 mb-2">${
          exercise.description || "No description"
        }</p>
        <p class="text-xs mb-1">🎯 Target: ${
          exercise.targetArea || "General"
        }</p>
        <p class="text-xs mb-3">⚡ Difficulty: ${
          exercise.difficulty || "Beginner"
        }</p>

        <button class="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition">
          ▶ Start Exercise
        </button>
      `;

      // 👉 Button click → go to camera page
      card.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("selectedExercise", exercise.name); // 🔥 BONUS
        window.location.href = "camera.html";
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p class="text-red-400 text-center">
        ❌ Error loading exercises
      </p>
    `;
  }
}

// ==========================
// FETCH STREAK
// ==========================
async function fetchStreak() {
  try {
    const res = await fetch("/api/results");
    const data = await res.json();

    if (streakEl) {
      streakEl.innerText = data.streak || 0;
    }
  } catch (err) {
    console.error("Error fetching streak:", err);
  }
}

// ==========================
// GOAL CHANGE EVENT
// ==========================
if (goalSelect) {
  goalSelect.addEventListener("change", () => {
    localStorage.setItem("rehabGoal", goalSelect.value);
    fetchExercises(); // 🔥 re-filter instantly
  });
}