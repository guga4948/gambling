let balance = 1000;
document.getElementById("balance").textContent = `Balance: $${balance}`;

function playSlots() {
    const result = Math.random() > 0.5 ? "You won $100!" : "You lost $50.";
    balance += result.includes("won") ? 100 : -50;
    document.getElementById("game-result").textContent = result;
    updateBalance();
}

function playBlackjack() {
    const result = Math.random() > 0.5 ? "You won $200!" : "You lost $100.";
    balance += result.includes("won") ? 200 : -100;
    document.getElementById("game-result").textContent = result;
    updateBalance();
}

function playRoulette() {
    const result = Math.random() > 0.5 ? "You won $50!" : "You lost $25.";
    balance += result.includes("won") ? 50 : -25;
    document.getElementById("game-result").textContent = result;
    updateBalance();
}

function claimDailyReward() {
    balance += 100;
    document.getElementById("reward-message").textContent = "You claimed your daily reward of $100!";
    updateBalance();
}

function updateBalance() {
    document.getElementById("balance").textContent = `Balance: $${balance}`;
}

function logOut() {
    alert("Logging out... See you next time!");
    // Add logout logic here
}
