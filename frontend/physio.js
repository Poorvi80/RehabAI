const container = document.getElementById("doctorList");
const searchInput = document.getElementById("searchInput");

let doctors = [];

// 🔹 Fetch doctors from backend
async function fetchDoctors() {
  try {
    const res = await fetch("/api/physio");
    doctors = await res.json();
    displayDoctors(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
  }
}

// 🔹 Display doctors
function displayDoctors(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No doctors found</p>";
    return;
  }

  list.forEach(doc => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${doc.name}</h3>
      <p><strong>Specialization:</strong> ${doc.spec}</p>
      <p><strong>Experience:</strong> ${doc.exp}</p>
      <p><strong>Location:</strong> ${doc.location}</p>
      <p>⭐ ${doc.rating}</p>
      <button class="btn" onclick="contactDoctor('${doc.name}')">
        Contact
      </button>
    `;

    container.appendChild(card);
  });
}

// 🔹 Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(value) ||
    doc.location.toLowerCase().includes(value) ||
    doc.spec.toLowerCase().includes(value)
  );

  displayDoctors(filtered);
});

// 🔹 Contact
function contactDoctor(name) {
  alert("Contacting " + name);
}

// 🔹 Load data
fetchDoctors();