// game.js - Main game controller
// Student Task: Implement the Game class for managing game state and main loop

import { Paddle } from './entities/paddle.js';
import { Ball } from './entities/ball.js';
import { Brick } from './entities/brick.js';
import { InputHandler } from './input-handler.js';
import { CollisionManager } from './collision.js';
import { UI } from './ui.js';
import { GAME_STATES, DEFAULTS, BRICK_CONFIG } from './constants.js';

export class Game {
  constructor(canvasId) {
    // Canvas setup
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // - gameState: set to GAME_STATES.START
    this.gameState = GAME_STATES.START;

    // - score: set to 0
    this.score = 0;

    // - lives: set to DEFAULTS.LIVES
    this.lives = DEFAULTS.LIVES;

    // - debugMessage: empty string for debug output
    this.debugMessage = '';

    // - paddle: set to null
    this.paddle = null;

    // - ball: set to null
    this.ball = null;

    // - bricks: empty array
    this.bricks = [];

    // Game systems are provided for you
    this.ui = new UI(this);
    this.collisionManager = new CollisionManager(this);
    this.input = new InputHandler(this);

    // - Call init()
    this.init();

    // Set up canvas scale (provided for you)
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };

    // Add window resize listener (provided for you)
    window.addEventListener('resize', () => {
      this.updateCanvasScale();
    });
  }

  // Initialize the game
  init() {
    // - Call createEntities() to create the paddle and ball
    this.createEntities();

    // - Call setupBricks() to create the brick layout
    this.setupBricks();

    // - Use ui.showScreen(GAME_STATES.START) to show the start screen
    this.ui.showScreen(GAME_STATES.START);
  }

  // Create game entities
  createEntities() {
    // - Create a new Paddle instance and assign it to this.paddle
    this.paddle = new Paddle(this);

    // - Create a new Ball instance and assign it to this.ball
    this.ball = new Ball(this);
  }

  // Update canvas scale calculation (provided for you)
  updateCanvasScale() {
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };
  }

  // Set up brick layout
  setupBricks() {

    // 1. Clear the bricks array
    this.bricks = [];

    const rows = BRICK_CONFIG.ROWS;
    const colms = BRICK_CONFIG.COLUMNS;
    const brickWidth = BRICK_CONFIG.WIDTH;
    const brickHeight = BRICK_CONFIG.HEIGHT;
    const padding = BRICK_CONFIG.PADDING;
    const offsetTop = BRICK_CONFIG.OFFSET_TOP;
    const offsetLeft = BRICK_CONFIG.OFFSET_LEFT;
    const colors = BRICK_CONFIG.COLORS;

    // 2. Use nested loops to create a grid of bricks
    //    - Outer loop for rows (BRICK_CONFIG.ROWS)
    for (let row = 0; row < rows; row++) {

      //    - Inner loop for columns (BRICK_CONFIG.COLUMNS)
      for (let colm = 0; colm < colms; colm++) {

        // 3. For each brick:
        //    - Calculate its position (x, y) using BRICK_CONFIG
        const x = offsetLeft + colm * (brickWidth + padding);
        const y = offsetTop + row * (brickHeight + padding);

        //    - Assign a color based on the row (use BRICK_CONFIG.COLORS)
        const color = colors[row % colors.length];

        //    - Create a new Brick instance and add it to the bricks array
        this.bricks.push(new Brick(this, x, y, brickWidth, brickHeight, color));
      }
    }
  }

  // Start the game
  startGame() {
    // 1. Set gameState to PLAYING
    this.gameState = GAME_STATES.PLAYING;

    // 2. Use ui.showScreen(GAME_STATES.PLAYING) to show the playing screen
    this.ui.showScreen(GAME_STATES.PLAYING);

    // 3. Connect the input handler to the paddle (this.input.setPaddle(this.paddle))
    this.input.setPaddle(this.paddle);

    // 4. Start the game loop (call gameLoop())
    this.gameLoop();
  }

  // Restart the game
  restartGame() {
    // 1. Reset game state (gameState, score, lives)
    this.gameState = GAME_STATES.START;
    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.debugMessage = '';

    // 2. Create new entities (call createEntities())
    this.createEntities();

    // 3. Set up new bricks (call setupBricks())
    this.setupBricks();

    // 4. Update the input handler with the new paddle
    this.input.setPaddle(this.paddle);

    // 5. Update the UI stats
    this.ui.updateStats(this.score, this.lives);
    this.ui.showScreen(GAME_STATES.PLAYING);

    // 6. Show the playing screen
    this.gameState = GAME_STATES.PLAYING;

    // 7. Start the game loop
    this.gameLoop();

  }

  // Main game loop
  gameLoop() {
    // 1. Check if the game is still in PLAYING state, return if not
    if (this.gameState !== GAME_STATES.PLAYING) {
      return;
    }

    // 2. Clear the canvas (ctx.clearRect)
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 3. Update game entities (paddle and ball)
    this.paddle.update();
    this.ball.update();

    // 4. Check for collisions (collisionManager.checkCollisions())
    this.collisionManager.checkCollisions();

    // 5. Draw game entities paddle, ball
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    // draw bricks
    // 6. Check for win condition (all bricks broken)
    let remainingBricks = 0;

    this.bricks.forEach(brick => {
      if (!brick.broken) {
        remainingBricks++;
        brick.draw(this.ctx);
      }
    });

    // Win condition
    if (remainingBricks === 0) {
      this.win();
      return;
    }

    // 7. Render debug message if there is one
    this.ui.renderDebug(this.debugMessage);

    // 8. Request the next animation frame to continue the loop
    requestAnimationFrame(() => this.gameLoop());
  }

  // Handle ball out of bounds
  ballLost() {
    // 1. Decrease lives
    this.lives--;

    // 2. Update the UI stats
    this.ui.updateStats(this.score, this.lives);

    // 3. Check if the player is out of lives (call gameOver() if so)
    if (this.lives <= 0) {
      this.gameOver();
      return;
    }
    // 4. If the player still has lives, reset the ball position
    this.ball.reset();
  }

  // Handle game over
  gameOver() {
    // 1. Set gameState to GAMEOVER
    this.gameState = GAME_STATES.GAMEOVER;

    // 2. Show the game over screen
    this.ui.showScreen(GAME_STATES.GAMEOVER);
  }

  // Handle win
  win() {
    // 1. Set gameState to WIN
    this.gameState = GAME_STATES.WIN;

    // 2. Show the win screen
    this.ui.showScreen(GAME_STATES.WIN);
  }

  // Add to score
  addScore(points) {
    // 1. Increase the score by the given points
    this.score += points;

    // 2. Update the UI stats
    this.ui.updateStats(this.score, this.lives);
  }

  // Debug message helper (provided for you)
  debug(message) {
    this.debugMessage = message;
  }
}