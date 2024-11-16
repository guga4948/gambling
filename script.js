// Manage login/register
let currentUser = null;
let userData = {}; // Simulating a database

// Event listeners
document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("register-form").addEventListener("submit", register);

function login(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (userData[username] && userData[username].password === password) {
        currentUser = username;
        alert(`Welcome back, ${username}!`);
        showSection("account");
        updateAccount();
    } else {
        alert("Invalid login details.");
    }
}

function register(e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!userData[username]) {
        userData[username] = { password, balance: 1000 };
        alert("Account created successfully!");
        document.getElementById("register-form").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
    } else {
        alert("Username already taken.");
    }
}

// Show specific sections
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Update account details
function updateAccount() {
    if (currentUser) {
        document.getElementById("user-name").textContent = currentUser;
        document.getElementById("user-balance").textContent = userData[currentUser].balance;
    }
}

// Daily reward logic
document.getElementById("daily-reward").addEventListener("click", () => {
    if (currentUser) {
        userData[currentUser].balance += 100;
        alert("You claimed your daily reward of $100!");
        updateAccount();
    }
});
