// complaint_status.js (API-ready)

const complaintInfoDiv = document.getElementById('complaint-info');
const backBtn = document.getElementById('back-btn');
const origin = window.location.origin; // "http://localhost:8000"
const apiBaseUrl = origin.split(':').slice(0, 2).join(':');

// Example: Get complaint ID from query string (e.g., ?id=456)
const urlParams = new URLSearchParams(window.location.search);
const complaintId = urlParams.get('id');

function loadComplaintDetails() {
  fetch(`${apiBaseUrl}:5000/api/complaints/${complaintId}`)
    .then(res => res.json())
    .then(complaint => {
      complaintInfoDiv.innerHTML = `
        <h2>Complaint Description</h2>
        <p>${complaint.description}</p>

        <h3>Category</h3>
        <p>${complaint.category}</p>

        <h3>Location</h3>
        <p>${complaint.location}</p>

        <h3>Status</h3>
        <p>${complaint.status}</p>

        <h3>Submitted Image</h3>
        <img src="${complaint.image_url}" alt="Complaint Image" style="max-width:100%; border-radius:5px;">
      `;
    })
    .catch(err => {
      console.error('Error loading complaint details:', err);
      complaintInfoDiv.innerHTML = '<p>Error loading complaint details.</p>';
    });
}

backBtn.addEventListener('click', () => {
  window.location.href = 'citizen_dashboard.html';
});

// Initialize
loadComplaintDetails();
