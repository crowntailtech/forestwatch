// project_form.js (API-ready)

const projectForm = document.getElementById('project-form');
const backBtn = document.getElementById('back-btn');

// Example: Get project ID from query string (e.g., ?id=789)
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// If editing, load project data
if (projectId) {
  fetch(`/api/projects/${projectId}`)
    .then(res => res.json())
    .then(project => {
      const inputs = projectForm.querySelectorAll('input, select');
      inputs[0].value = project.name;
      inputs[1].value = project.region;
      inputs[2].value = project.status;
      inputs[3].value = project.start_date;
      inputs[4].value = project.trees_target;
      inputs[5].value = project.trees_planted;
    })
    .catch(err => {
      console.error('Error loading project data:', err);
    });
}

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const payload = {
    name: projectForm.querySelector('input:nth-of-type(1)').value,
    region: projectForm.querySelector('input:nth-of-type(2)').value,
    status: projectForm.querySelector('select').value,
    start_date: projectForm.querySelector('input:nth-of-type(3)').value,
    trees_target: parseInt(projectForm.querySelector('input:nth-of-type(4)').value),
    trees_planted: parseInt(projectForm.querySelector('input:nth-of-type(5)').value)
  };

  const method = projectId ? 'PUT' : 'POST';
  const url = projectId ? `/api/projects/${projectId}` : '/api/projects';

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      alert('Project saved successfully!');
      window.location.href = 'forest_dashboard.html';
    })
    .catch(err => {
      console.error('Error saving project:', err);
      alert('Failed to save project');
    });
});

backBtn.addEventListener('click', () => {
  window.location.href = 'forest_dashboard.html';
});
