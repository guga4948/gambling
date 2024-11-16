// Initialize variables
const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const authButton = document.getElementById('auth-button');
const toggleAuth = document.getElementById('toggle-auth');
const userDisplay = document.getElementById('user-display');
const userBalance = document.getElementById('user-balance');
const logoutButton = document.getElementById('logout-button');

// Helper: Get user data from localStorage
function getUserData() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

// Helper: Save user data to localStorage
function saveUserData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

// Helper: Set the current user
function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

// Helper: Get the current user
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Show main content
function showMain(username) {
    authContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    userDisplay.textContent = username;

    // Fetch the user's balance
    const users = getUserData();
    userBalance.textContent = users[username].balance;
}

// Logout functionality
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    mainContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
});

// Login/Register Toggle
let isLogin = true;
toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    authButton.textContent = isLogin ? 'Login' : 'Register';
    toggleAuth.innerHTML = isLogin
        ? "Don't have an account? <a href='#'>Register here</a>."
        : "Already have an account? <a href='#'>Login here</a>.";
});

// Handle form submission (Login/Register)
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('Please enter a valid username and password.');
        return;
    }

    const users = getUserData();

    if (isLogin) {
        // Login logic
        if (!users[username] || users[username].password !== password) {
            alert('Invalid username or password.');
            return;
        }

        // Login successful
        setCurrentUser(username);
        showMain(username);
    } else {
        // Registration logic
        if (users[username]) {
            alert('Username already exists.');
            return;
        }

        // Register the user
        users[username] = { password, balance: 1000 }; // Default balance: $1000
        saveUserData(users);
        setCurrentUser(username);
        showMain(username);
    }

    // Clear input fields
    usernameInput.value = '';
    passwordInput.value = '';
});

// Auto-login if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        showMain(currentUser);
    } else {
        authContainer.classList.remove('hidden');
    }
});
