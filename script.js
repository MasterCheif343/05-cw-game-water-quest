// Game configuration and state variables
const GOAL_CANS = 20;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;          // Holds the interval for spawning items
const gameGrid = document.querySelector('.game-grid');
let currentTimerTime = 30;
let timerInterval;

let winMessageArray = ["Congrats! You collected a lot of water cans!", "Great Job on collecting all those water cans!", "You're a water can collecting champion!", `Congratulations! You collected ${currentCans} water cans and won the game!`];

let loseMessageArray = ["Game Over! You didn't collect enough water cans. Try again!", "Better luck next time! Collect more water cans!", "Don't give up! You can do better next time!", "Keep trying! You can collect more water cans!"];

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

function startTimer(){
  currentTimerTime = 30; // Reset timer to 30 seconds

  document.getElementById('timer').textContent = currentTimerTime; // Update timer display

  timerInterval = setInterval(() => {
    currentTimerTime--; // Decrease timer by 1 second
    document.getElementById('timer').textContent = currentTimerTime; // Update display

    if(currentTimerTime <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);

}

// Ensure the grid is created when the page loads
createGrid();

 gameGrid.addEventListener('click', function(event) {
  const clickedOnCan = event.target.closest('.water-can-wrapper');

  if (clickedOnCan && gameActive) {
    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;

    clickedOnCan.remove();
  }
});


// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');

  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;

  currentCans = 0; // Reset the count of collected items

  document.getElementById('current-cans').textContent = currentCans; // Update the display for collected items

  createGrid(); // Set up the game grid

  startTimer(); 

  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second

}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(timerInterval); // Stop the timer

  if(currentCans >= GOAL_CANS) {
    const randomWinMessage = winMessageArray[Math.floor(Math.random() * winMessageArray.length)];
    alert(randomWinMessage);

    confetti({
      particleCount: 175,
      angle: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

     confetti({
      particleCount: 175,
      angle: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  else{
    const randomLoseMessage = loseMessageArray[Math.floor(Math.random() * loseMessageArray.length)];
    alert(randomLoseMessage);
  }

}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);
