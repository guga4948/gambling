// User Information
let username = "Guest";
let balance = 1000;
let hasClaimedReward = false;

// Update balance and username display
const updateDisplay = () => {
    document.getElementById("username").textContent = `Player: ${username}`;
    document.getElementById("balance").textContent = `Balance: $${balance}`;
};

// Claim daily reward
document.getElementById("daily-reward").addEventListener("click", () => {
    if (hasClaimedReward) {
        alert("You have already claimed your daily reward!");
    } else {
        balance += 100;
        hasClaimedReward = true;
        alert("You claimed your daily reward of $100!");
        updateDisplay();
    }
});

// Play Slots
document.getElementById("play-slots").addEventListener("click", () => {
    if (balance < 10) {
        alert("Not enough balance to play Slots!");
        return;
    }

    balance -= 10;
    const outcome = Math.random();
    if (outcome > 0.5) {
        const winnings = 50;
        balance += winnings;
        alert(`You won $${winnings} playing Slots!`);
    } else {
        alert("You lost playing Slots!");
    }

    updateDisplay();
});

// Play Blackjack
document.getElementById("play-blackjack").addEventListener("click", () => {
    if (balance < 20) {
        alert("Not enough balance to play Blackjack!");
        return;
    }

    balance -= 20;
    const outcome = Math.random();
    if (outcome > 0.5) {
        const winnings = 40;
        balance += winnings;
        alert(`You won $${winnings} playing Blackjack!`);
    } else {
        alert("You lost playing Blackjack!");
    }

    updateDisplay();
});

// Play Roulette
document.getElementById("play-roulette").addEventListener("click", () => {
    if (balance < 15) {
        alert("Not enough balance to play Roulette!");
        return;
    }

    balance -= 15;
    const outcome = Math.random();
    if (outcome > 0.5) {
        const winnings = 100;
        balance += winnings;
        alert(`You won $${winnings} playing Roulette!`);
    } else {
        alert("You lost playing Roulette!");
    }

    updateDisplay();
});

// Initialize the display
updateDisplay();
