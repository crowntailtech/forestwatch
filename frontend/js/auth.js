// auth.js (API-ready with redirect support)

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const origin = window.location.origin; // e.g., http://localhost:8000
const apiBaseUrl = origin.split(':').slice(0, 2).join(':');

let showingLogin = true;

toggleLink.addEventListener('click', () => {
  if (showingLogin) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.innerText = 'Register';
    toggleText.childNodes[0].nodeValue = "Already have an account? ";
    toggleLink.textContent = "Login here";
  } else {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    formTitle.innerText = 'Login';
    toggleText.childNodes[0].nodeValue = "Don't have an account? ";
    toggleLink.textContent = "Register here";
  }
  showingLogin = !showingLogin;
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const payload = { email, password };

  fetch(`${apiBaseUrl}:5000/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.token && data.role) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role === 'citizen') {
        window.location.href = '/citizen_dashboard.html';
      } else if (data.role === 'forest_dept') {
        window.location.href = '/forest_dashboard.html';
      } else {
        alert('Unknown role. Cannot redirect.');
      }
    } else {
      alert('Login failed: Invalid credentials');
    }
  })
  .catch(err => {
    console.error('Login error:', err);
    alert('Login failed due to error');
  });
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const phone = registerForm.querySelector('input[type="text"]:nth-of-type(2)').value;
  const region = registerForm.querySelector('input[type="text"]:nth-of-type(3)').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  const payload = { name, email, phone, region, password };

  fetch(`${apiBaseUrl}:5000/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful. Redirecting to login...');
      window.location.href = '/login.html';
    } else {
      alert('Registration failed. Try again.');
    }
  })
  .catch(err => {
    console.error('Register error:', err);
    alert('Registration failed due to error');
  });
});
