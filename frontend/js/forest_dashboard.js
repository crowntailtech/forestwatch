// forest_dashboard.js (API-ready)

const projectsList = document.getElementById('projects-list');
const complaintsList = document.getElementById('complaints-list');
const newProjectBtn = document.getElementById('new-project-btn');
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
          <button onclick="editProject(${project.id})">Edit</button>
          <button onclick="deleteProject(${project.id})">Delete</button>
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
          <p>${c.description}</p>
          <p>Status: ${c.status}</p>
          <button onclick="updateComplaintStatus(${c.id}, 'In Progress')">Mark In Progress</button>
          <button onclick="updateComplaintStatus(${c.id}, 'Resolved')">Mark Resolved</button>
        `;
        complaintsList.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading complaints:', err);
    });
}

function editProject(id) {
  alert(`Edit project ${id} (future: redirect to edit form)`);
}

function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        alert('Project deleted');
        loadProjects();
      })
      .catch(err => {
        console.error('Error deleting project:', err);
      });
  }
}

function updateComplaintStatus(id, status) {
  fetch(`/api/complaints/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: status })
  })
    .then(res => res.json())
    .then(data => {
      alert(`Complaint marked as ${status}`);
      loadComplaints();
    })
    .catch(err => {
      console.error('Error updating complaint:', err);
    });
}

newProjectBtn.addEventListener('click', () => {
  alert('Redirecting to add new project form (future link)');
});

logoutBtn.addEventListener('click', () => {
  alert('Logging out (future: clear session and redirect)');
});

// Initialize
loadProjects();
loadComplaints();
