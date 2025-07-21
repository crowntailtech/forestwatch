// auth.js (API-ready)

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');

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

  const payload = {
    email: email,
    password: password
  };

  fetch('http://backend.local:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Login response:', data);
    // Example: redirect to dashboard if successful
    // window.location.href = '/citizen_dashboard.html';
    alert('Login successful (future: redirect to dashboard)');
  })
  .catch(err => {
    console.error('Login error:', err);
    alert('Login failed');
  });
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const phone = registerForm.querySelector('input[type="text"]:nth-of-type(2)').value;
  const region = registerForm.querySelector('input[type="text"]:nth-of-type(3)').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  const payload = {
    name: name,
    email: email,
    phone: phone,
    region: region,
    password: password
  };

  fetch('http://backend.local:5000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Register response:', data);
    alert('Registration successful (future: redirect to login)');
  })
  .catch(err => {
    console.error('Register error:', err);
    alert('Registration failed');
  });
});
