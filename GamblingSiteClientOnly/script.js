
// Store users and their data in localStorage
const USERS_KEY = "gambling_users";
const CURRENT_USER_KEY = "current_user";

// Elements
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("username");
const authError = document.getElementById("auth-error");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("logout-btn");
const gamesSection = document.getElementById("games");
const balanceSpan = document.getElementById("balance");
const dailyRewardBtn = document.getElementById("daily-reward-btn");
const playSlotsBtn = document.getElementById("play-slots-btn");
const slotsResult = document.getElementById("slots-result");

// Helper functions
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(username) {
    localStorage.setItem(CURRENT_USER_KEY, username);
}

function getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY);
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    location.reload();
}

// Login/Register logic
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    const users = getUsers();
    if (!users[username]) {
        users[username] = { balance: 1000, lastReward: null };
        saveUsers(users);
    }
    setCurrentUser(username);
    loadUserInterface(username);
});

function loadUserInterface(username) {
    const users = getUsers();
    const user = users[username];

    if (!user) {
        authError.classList.remove("hidden");
        return;
    }

    // Show welcome message and balance
    welcomeMessage.textContent = `Welcome, ${username}!`;
    balanceSpan.textContent = `$${user.balance}`;

    // Show/hide sections
    document.getElementById("login-register").classList.add("hidden");
    gamesSection.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
}

// Daily Reward logic
dailyRewardBtn.addEventListener("click", () => {
    const username = getCurrentUser();
    const users = getUsers();
    const user = users[username];

    const now = new Date();
    const lastReward = new Date(user.lastReward || 0);
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastReward < oneDay) {
        alert("You can only claim the daily reward once every 24 hours!");
        return;
    }

    user.balance += 100;
    user.lastReward = now;
    saveUsers(users);
    balanceSpan.textContent = `$${user.balance}`;
    alert("You claimed $100!");
});

// Slots game logic
playSlotsBtn.addEventListener("click", () => {
    const username = getCurrentUser();
    const users = getUsers();
    const user = users[username];

    if (user.balance < 100) {
        alert("Not enough balance to play Slots!");
        return;
    }

    user.balance -= 100;
    const winnings = Math.random() < 0.5 ? 200 : 0;
    user.balance += winnings;

    saveUsers(users);
    balanceSpan.textContent = `$${user.balance}`;
    slotsResult.textContent = winnings > 0 ? `You won $${winnings}!` : "You lost! Try again.";
});

// Logout logic
logoutBtn.addEventListener("click", logout);

// Auto-login current user
const currentUser = getCurrentUser();
if (currentUser) {
    loadUserInterface(currentUser);
}
