let slider = document.getElementById("painRange");
let value = document.getElementById("painValue");
let result = document.getElementById("recommendation");
let exercisesDiv = document.getElementById("exercises");

slider.addEventListener("input", () => {
  let pain = slider.value;
  value.innerText = pain;

  let exercises = [];

  if (pain <= 3) {
    result.innerText = "Low Pain 😊 - Light Exercises Recommended";
    exercises = ["Stretching", "Yoga", "Light Walking"];
  } else if (pain <= 7) {
    result.innerText = "Moderate Pain 😐 - Strength Exercises";
    exercises = ["Resistance Band", "Core Exercises"];
  } else {
    result.innerText = "High Pain 😣 - Consult Physiotherapist";
    exercises = ["Rest", "Breathing Exercises"];
  }

  exercisesDiv.innerHTML = "";
  exercises.forEach(ex => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = ex;
    exercisesDiv.appendChild(card);
  });
});