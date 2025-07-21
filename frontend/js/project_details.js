// project_details.js (API-ready)

const projectInfoDiv = document.getElementById('project-info');
const backBtn = document.getElementById('back-btn');
const origin = window.location.origin; // "http://localhost:8000"
const apiBaseUrl = origin.split(':').slice(0, 2).join(':');

// Example: Get project ID from query string (e.g., ?id=123)
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

function loadProjectDetails() {
  fetch(`${apiBaseUrl}:5000/api/projects/${projectId}`)
    .then(res => res.json())
    .then(project => {
      projectInfoDiv.innerHTML = `
        <h2>${project.name}</h2>
        <p><strong>Region:</strong> ${project.region}</p>
        <p><strong>Status:</strong> ${project.status}</p>
        <p><strong>Start Date:</strong> ${project.start_date}</p>
        <p><strong>Target Trees:</strong> ${project.trees_target}</p>
        <p><strong>Trees Planted:</strong> ${project.trees_planted}</p>
      `;
    })
    .catch(err => {
      console.error('Error loading project details:', err);
      projectInfoDiv.innerHTML = '<p>Error loading project details.</p>';
    });
}

backBtn.addEventListener('click', () => {
  window.location.href = 'citizen_dashboard.html';
});

// Initialize
loadProjectDetails();
