import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzEj0eB-LxpYBI--kxraYEEeL-9zfwphg",
  authDomain: "loginpage-4b6f8.firebaseapp.com",
  projectId: "loginpage-4b6f8",
  storageBucket: "loginpage-4b6f8.appspot.com",
  messagingSenderId: "904532002765",
  appId: "1:904532002765:web:d340d3781c15affebbe684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Access form and error message elements
const form = document.getElementById('signupForm');
const errorMessage = document.getElementById('error-message');
const togglePassword = document.getElementById('toggle-password');
const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.setAttribute('name', type === 'password' ? 'eye' : 'eye-off');
});

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.setAttribute('name', type === 'password' ? 'eye' : 'eye-off');
});

// Add event listener to the form's submit event
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Clear previous error
    errorMessage.textContent = '';

    // Validation
    if (!name) {
        errorMessage.textContent = 'Full name is required.';
        return;
    }
    if (!email) {
        errorMessage.textContent = 'Email is required.';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }
    if (!password) {
        errorMessage.textContent = 'Password is required.';
        return;
    }
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // Clear the form
            form.reset();
            // Redirect to login page
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessageText = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                errorMessage.textContent = 'An account with this email already exists.';
            } else {
                errorMessage.textContent = 'Signup failed: ' + errorMessageText;
            }
        });
});
