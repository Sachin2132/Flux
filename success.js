import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// Success Animation (Confetti)
window.addEventListener('DOMContentLoaded', () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2ff', '#7000ff', '#10b981']
    });
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', function() {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = 'index.html';
    }).catch((error) => {
        // An error happened.
        alert('Logout failed: ' + error.message);
    });
});