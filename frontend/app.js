// Shared application utilities and navigation

// Navigation setup
document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
  initializeApp();
});

function setupNavigation() {
  // Add navigation to pages that don't have it
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Create navBar if it doesn't exist
  if (!document.querySelector('nav')) {
    const nav = createNavBar();
    document.body.insertBefore(nav, document.body.firstChild);
  }
  
  // Set active nav link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href === '/' + currentPage)) {
      link.classList.add('active');
    }
  });
}

function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="nav-container">
      <div class="nav-brand">
        <a href="index.html">🏥 RehabAI</a>
      </div>
      <div class="nav-links">
        <a href="index.html" class="nav-link">Home</a>
        <a href="dashboard.html" class="nav-link">Dashboard</a>
        <a href="pain.html" class="nav-link">Pain Assessment</a>
        <a href="progress.html" class="nav-link">Progress</a>
        <a href="physio.html" class="nav-link">Find Physio</a>
        <button class="logout-btn" onclick="logout()">Logout</button>
      </div>
    </div>
  `;
  return nav;
}

function initializeApp() {
  // Initialize any common functionality
  console.log('App initialized');
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear();
    window.location.href = 'index.html';
  }
}

// Navigation functions
function goTo(page) {
  window.location.href = page;
}

function goToDashboard() {
  goTo('dashboard.html');
}

function goToExercise(exerciseName) {
  localStorage.setItem('selectedExercise', exerciseName);
  goTo('camera.html');
}

function goToHome() {
  goTo('index.html');
}

// API utilities
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

async function postAPI(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

// Feedback messages
function showMessage(message, type = 'info') {
  const messageDiv = document.getElementById('message') || createMessageDiv();
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  if (type !== 'error') {
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 3000);
  }
}

function createMessageDiv() {
  const div = document.createElement('div');
  div.id = 'message';
  div.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    max-width: 400px;
  `;
  document.body.appendChild(div);
  return div;
}

// Add styles for message
const style = document.createElement('style');
style.textContent = `
  .message {
    animation: slideIn 0.3s ease;
  }
  
  .message.success {
    background: rgba(76, 175, 80, 0.9);
    color: white;
    border: 1px solid #4caf50;
  }
  
  .message.error {
    background: rgba(244, 67, 54, 0.9);
    color: white;
    border: 1px solid #f44336;
  }
  
  .message.info {
    background: rgba(33, 150, 243, 0.9);
    color: white;
    border: 1px solid #2196f3;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 0;
    color: white;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-brand a {
    font-size: 1.8em;
    font-weight: 700;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  
  .nav-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 25px;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover,
  .nav-link.active {
    color: white;
    background: rgba(255, 255, 255, 0.2);
  }
  
  .logout-btn {
    background: rgba(244, 67, 54, 0.2);
    color: white;
    border: 1px solid rgba(244, 67, 54, 0.5);
    padding: 8px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .logout-btn:hover {
    background: #f44336;
    border-color: #f44336;
    transform: translateY(-2px);
  }
`;
document.head.appendChild(style);
