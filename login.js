import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// Access the login button
const loginButton = document.getElementById('login');
const errorMessage = document.getElementById('error-message');
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.setAttribute('name', type === 'password' ? 'eye' : 'eye-off');
});

// Add event listener to the login button
loginButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous error
    errorMessage.textContent = '';

    // Validation
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

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Redirect to success page
            window.location.href = 'success.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessageText = error.message;
            if (errorCode === 'auth/user-not-found') {
                errorMessage.textContent = 'No account found with this email.';
            } else if (errorCode === 'auth/wrong-password') {
                errorMessage.textContent = 'Incorrect password.';
            } else {
                errorMessage.textContent = 'Login failed: ' + errorMessageText;
            }
        });
});
