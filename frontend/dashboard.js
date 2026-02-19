const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// Fetch exercises
async function fetchExercises() {
  try {
    const response = await fetch("http://localhost:5000/api/exercises", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const exercises = await response.json();

    const list = document.getElementById("exerciseList");
    list.innerHTML = "";

   exercises.forEach(ex => {
  const li = document.createElement("li");

  li.innerHTML = `
    ${ex.name} - ${ex.targetArea}
    <button onclick="startExercise('${ex._id}')">
      Start
    </button>
  `;

  list.appendChild(li);
});

   function startExercise(id) {
  console.log("Starting exercise:", id);
  localStorage.setItem("selectedExercise", id);
  window.location.href = "camera.html";
}



  } catch (error) {
    console.error(error);
  }
}

fetchExercises();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
