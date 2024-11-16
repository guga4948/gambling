// DOM Elements
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const mainContainer = document.getElementById('main-container');
const slotsContainer = document.getElementById('slots-container');
const rouletteContainer = document.getElementById('roulette-container');
const blackjackContainer = document.getElementById('blackjack-container');
const userBalance = document.getElementById('user-balance');
const welcomeMessage = document.getElementById('welcome-message');

// Login/Registration Forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Users Data
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = sessionStorage.getItem('currentUser');

// Utility Functions
function saveUserData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('users'));
}

function updateBalanceDisplay() {
    userBalance.textContent = users[currentUser].balance;
}

function redirectToLogin() {
    loginContainer.classList.remove('hidden');
    registerContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');
}

// Page Initialization
if (!currentUser || !users[currentUser]) {
    redirectToLogin();
} else {
    welcomeMessage.textContent = `Hello, ${currentUser}!`;
    updateBalanceDisplay();
    loginContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
}

// Login Handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        sessionStorage.setItem('currentUser', username);
        welcomeMessage.textContent = `Hello, ${username}!`;
        updateBalanceDisplay();
        loginContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
    } else {
        loginError.textContent = "Invalid username or password!";
    }
});

// Registration Handling
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users[username]) {
        registerError.textContent = "Username already exists!";
    } else {
        users[username] = { password, balance: 1000 };
        saveUserData(users);
        registerError.textContent = "Account created successfully! You can now login.";
        redirectToLogin();
    }
});

// Show Login/Register
showRegister.addEventListener('click', () => {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
});

showLogin.addEventListener('click', () => {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Logout Handling
document.getElementById('logout-button').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    redirectToLogin();
});

// Existing Game Code (Slots, Roulette, Blackjack)
// Slots functionality (example)
slotsContainer.addEventListener('click', () => {
    if (users[currentUser].balance >= 10) {
        users[currentUser].balance -= 10; // Deduct 10 for the bet
        saveUserData(users);
        updateBalanceDisplay();
        // Simulate Slot Spin (you can replace this with actual game logic)
        let outcome = Math.floor(Math.random() * 3); // Example: 0 = lose, 1 = win, 2 = jackpot
        if (outcome === 1) {
            users[currentUser].balance += 20; // Winning
        } else if (outcome === 2) {
            users[currentUser].balance += 100; // Jackpot
        }
        saveUserData(users);
        updateBalanceDisplay();
    } else {
        alert('Insufficient balance for this bet!');
    }
});

// Roulette functionality (example)
rouletteContainer.addEventListener('click', () => {
    if (users[currentUser].balance >= 10) {
        users[currentUser].balance -= 10; // Deduct 10 for the bet
        saveUserData(users);
        updateBalanceDisplay();
        // Simulate Roulette Spin (you can replace this with actual game logic)
        let spinResult = Math.floor(Math.random() * 37); // Example: 0-36 representing roulette slots
        if (spinResult === 7) {
            users[currentUser].balance += 50; // Win on lucky number
        }
        saveUserData(users);
        updateBalanceDisplay();
    } else {
        alert('Insufficient balance for this bet!');
    }
});

// Blackjack functionality (example)
blackjackContainer.addEventListener('click', () => {
    if (users[currentUser].balance >= 10) {
        users[currentUser].balance -= 10; // Deduct 10 for the bet
        saveUserData(users);
        updateBalanceDisplay();
        // Simulate Blackjack Game (you can replace this with actual game logic)
        let blackjackOutcome = Math.random();
        if (blackjackOutcome > 0.5) {
            users[currentUser].balance += 20; // Win
        } else {
            users[currentUser].balance -= 10; // Lose
        }
        saveUserData(users);
        updateBalanceDisplay();
    } else {
        alert('Insufficient balance for this bet!');
    }
});
