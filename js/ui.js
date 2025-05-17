// ui.js - Handles UI elements and screen management

import { GAME_STATES } from './constants.js';

export class UI {
  constructor(game) {
    this.game = game;

    // UI elements
    this.scoreElement = document.getElementById('score');
    this.livesElement = document.getElementById('lives');
    this.finalScoreElement = document.getElementById('finalScore');
    this.winScoreElement = document.getElementById('winScore');

    // Screen elements
    this.startScreen = document.getElementById('startScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.winScreen = document.getElementById('winScreen');
    this.pauseScreen = document.getElementById('pauseScreen');

    // Button event listeners
    this.setupButtonListeners();
  }

  // Setup button event listeners
  setupButtonListeners() {
    document.getElementById('startButton').addEventListener('click', () => {
      this.game.startGame();
    });

    document.getElementById('restartButton').addEventListener('click', () => {
      this.game.restartGame();
    });

    document.getElementById('winRestartButton').addEventListener('click', () => {
      this.game.restartGame();
    });

    document.getElementById('resumeButton').addEventListener('click', () => {
      this.game.resumeGame();
    });

    document.getElementById('pauseRestartButton').addEventListener('click', () => {
      this.game.restartGame();
    });
  }

  // Show a specific screen
  showScreen(screenType) {
    // Hide all screens first
    this.startScreen.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    this.winScreen.classList.add('hidden');
    this.pauseScreen.classList.add('hidden');

    // Show the requested screen
    switch (screenType) {
      case GAME_STATES.START:
        this.startScreen.classList.remove('hidden');
        break;
      case GAME_STATES.GAMEOVER:
        this.finalScoreElement.textContent = this.game.score;
        this.gameOverScreen.classList.remove('hidden');
        break;
      case GAME_STATES.WIN:
        this.winScoreElement.textContent = this.game.score;
        this.winScreen.classList.remove('hidden');
        break;
      case GAME_STATES.PAUSED:
        this.pauseScreen.classList.remove('hidden');
        break;
      // For PLAYING state, all screens remain hidden
    }
  }

  // Update score and lives display
  updateStats() {
    this.scoreElement.textContent = this.game.score;
    this.livesElement.textContent = this.game.lives;
  }

  // Display debug information on the canvas
  renderDebug(ctx, message) {
    if (!message) {
      return;
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial';
    ctx.fillText(message, 10, this.game.height - 20);
  }
}