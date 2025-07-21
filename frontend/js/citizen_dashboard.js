// citizen_dashboard.js (API-ready)

const projectsList = document.getElementById('projects-list');
const complaintsList = document.getElementById('complaints-list');
const newComplaintBtn = document.getElementById('new-complaint-btn');
const logoutBtn = document.getElementById('logout-btn');

// Load projects from API
function loadProjects() {
  fetch('/api/projects')
    .then(res => res.json())
    .then(projects => {
      projectsList.innerHTML = '';

      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${project.name}</h3>
          <p>Region: ${project.region}</p>
          <p>Status: ${project.status}</p>
        `;
        projectsList.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading projects:', err);
    });
}

// Load complaints from API
function loadComplaints() {
  fetch('/api/complaints')
    .then(res => res.json())
    .then(complaints => {
      complaintsList.innerHTML = '';

      complaints.forEach(c => {
        const card = document.createElement('div');
        card.className = 'complaint-card';
        card.innerHTML = `
          <p>${c.desc}</p>
          <p>Status: ${c.status}</p>
        `;
        complaintsList.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading complaints:', err);
    });
}

newComplaintBtn.addEventListener('click', () => {
  alert('Redirecting to complaint submission page');
  window.location.href = 'submit_complaint.html';
});

logoutBtn.addEventListener('click', () => {
  // Future: Clear session, call logout API, and redirect
  alert('Logging out (future: clear session and redirect)');
});

// Initialize
loadProjects();
loadComplaints();
