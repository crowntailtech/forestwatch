// submit_complaint.js (API-ready)

const complaintForm = document.getElementById('complaint-form');
const backBtn = document.getElementById('back-btn');

complaintForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = complaintForm.querySelector('textarea').value;
  const category = complaintForm.querySelector('select').value;
  const location = complaintForm.querySelector('input[type="text"]').value;
  const imageFile = complaintForm.querySelector('input[type="file"]').files[0];

  const formData = new FormData();
  formData.append('description', description);
  formData.append('category', category);
  formData.append('location', location);
  formData.append('image', imageFile);

  fetch('http://backend.local:5000/api/complaints', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log('Complaint submitted:', data);
      alert('Complaint submitted successfully!');
      // Future: Redirect to dashboard or complaint list
    })
    .catch(err => {
      console.error('Error submitting complaint:', err);
      alert('Failed to submit complaint');
    });
});

backBtn.addEventListener('click', () => {
  window.location.href = 'citizen_dashboard.html';
});
