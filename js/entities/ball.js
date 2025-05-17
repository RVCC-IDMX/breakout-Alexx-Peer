// ball.js - Ball entity
// This file contains the Ball class that represents the bouncing ball

import { DEFAULTS } from '../constants.js';

export class Ball {
  constructor(game) {
    // - Set the game reference
    this.game = game;

    // - Set the size (radius) using DEFAULTS.BALL_SIZE
    this.size = DEFAULTS.BALL_SIZE;

    // - Set initial position to the center horizontally and just above the paddle
    this.x = game.width / 2;
    this.y = game.height - 30;

    // - Set the ball speed using DEFAULTS.BALL_SPEED
    this.speed = DEFAULTS.BALL_SPEED;

    // - Set initial direction: dx to a positive value and dy to a negative value
    //   (This will make the ball move up and to the right initially)
    this.dx = this.speed;
    this.dy = -this.speed;
  }

  update() {
    // 1. Update position based on direction (add dx to x, add dy to y)
    this.x += this.dx;
    this.y += this.dy;

    // 2. Handle wall collisions:
    //    - If ball hits left or right wall, reverse dx
    if (this.x - this.size < 0 || this.x + this.size > this.game.width) {
      this.dx *= -1;
    }
    //    - If ball hits top wall, reverse dy
    if (this.y - this.size < 0) {
      this.dy *= -1;
    }
    //    - If ball goes below bottom edge, call game.ballLost()
    if (this.y - this.size > this.game.height) {
      this.game.ballLost();
    }
  }

  draw(ctx) {
    // - Use beginPath(), arc(), fillStyle, and fill() to draw a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //ball size
    ctx.fillStyle = '#0095DD'; //ball color--light blue
    ctx.fill();
    ctx.closePath();
  }

  collidesWith(object) {
    // - Return true if the ball's bounding box overlaps with the object's rectangle
    // - Remember to account for the ball's radius in the calculation
    const ballLeft = this.x - this.size; //left edge of ball
    const ballRight = this.x + this.size; //right edge of ball
    const ballTop = this.y - this.size; //top edge of ball
    const ballBottom = this.y + this.size; //bottom edge of ball

    const objLeft = object.x; //obj left edge
    const objRight = object.x + object.width; //obj right edge
    const objTop = object.y; //obj top edge
    const objBottom = object.y + object.height; // obj bottom edge

    return (
      ballRight > objLeft &&
      ballLeft < objRight &&
      ballBottom > objTop &&
      ballTop < objBottom
    );
  }

  reset() {
    // Reset the ball position after losing a life
    this.x = this.game.width / 2;
    this.y = this.game.height - 30;

    //reset ball speed to default
    this.speed = DEFAULTS.BALL_SPEED;

    // - Set position back to initial values
    // - Reset direction to initial values
    this.dx = this.speed;
    this.dy = -this.speed;
  }
}