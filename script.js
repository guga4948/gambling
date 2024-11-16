// Add Slots Machine Logic to Existing Code

// DOM Elements for Slots
const slotsContainer = document.getElementById('slots-container');
const slotsDisplay = document.getElementById('slots-display');
const spinButton = document.getElementById('spin-button');
const slotsMessage = document.getElementById('slots-message');
const backButton = document.getElementById('back-button');

// Randomize Slots Numbers
function spinSlots() {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)); // Random numbers 0-9
}

// Calculate Slots Result
function calculatePayout(result) {
    if (result[0] === result[1] && result[1] === result[2]) {
        return 100; // All three match
    } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        return 20; // Two match
    }
    return 0; // No match
}

// Slots Button Logic
spinButton.addEventListener('click', () => {
    const users = getUserData();
    const currentUser = getCurrentUser();

    // Deduct $10 for spin
    if (users[currentUser].balance < 10) {
        slotsMessage.textContent = "Insufficient balance! Please add more funds.";
        slotsMessage.style.color = "#e74c3c"; // Red for error
        return;
    }

    users[currentUser].balance -= 10;
    saveUserData(users);
    userBalance.textContent = users[currentUser].balance;

    // Generate Slots Result
    const result = spinSlots();
    slotsDisplay.textContent = result.map(num => `🎰${num}`).join(" ");
    
    // Check Payout
    const payout = calculatePayout(result);
    if (payout > 0) {
        slotsMessage.textContent = `Congratulations! You won $${payout}!`;
        slotsMessage.style.color = "#27ae60"; // Green for success
        users[currentUser].balance += payout;
        saveUserData(users);
        userBalance.textContent = users[currentUser].balance;
    } else {
        slotsMessage.textContent = "No luck this time! Try again.";
        slotsMessage.style.color = "#e74c3c"; // Red for loss
    }
});

// Navigation Buttons
document.getElementById('play-slots').addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    slotsContainer.classList.remove('hidden');
});

backButton.addEventListener('click', () => {
    slotsContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
});
