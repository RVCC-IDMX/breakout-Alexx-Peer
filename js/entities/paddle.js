// paddle.js - Paddle entity
// This file contains the Paddle class that represents the player-controlled paddle

import { DEFAULTS } from '../constants.js';

//init paddle properties
export class Paddle {
  constructor(game) {

    //set game instance
    this.game = game;

    //set width
    this.width = DEFAULTS.PADDLE_WIDTH;

    //set height
    this.height = DEFAULTS.PADDLE_HEIGHT;

    //center paddle
    this.x = (game.width - this.width) / 2;

    //position paddle near bottom of canvas
    this.y = game.height - this.height - 10;

    //set paddle speed
    this.speed = DEFAULTS.PADDLE_SPEED;
    this.dx = 0; //direction of movement
  }

  update() {
    //update paddle position based on current direction
    this.x += this.dx;

    // keep paddle within canvas bounds
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }
  }

  draw(ctx) {
    // draaw the paddle as a rectangle
    ctx.fillStyle = '#0095DD'; // paddle color light blue
    ctx.fillRect(this.x, this.y, this.width, this.height); //paddle size
  }

  moveLeft() {
    // Set the paddle's direction to move left
    this.dx = -this.speed;
  }

  moveRight() {
    //Set the paddle's direction to move right
    this.dx = this.speed;
  }

  stop() {
    // Stop the paddle's movement
    this.dx = 0;
  }

  // Set the paddle's position based on mouse/touch input
  setPosition(x) {
    // - Set the paddle's x position, centering it on the input x
    this.x = x - this.width / 2;

    // - Make sure the paddle stays within the game boundaries
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }

  }
}