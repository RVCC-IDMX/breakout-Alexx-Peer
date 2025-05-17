// collision.js - Handles collision detection and response
// This file manages all collision-related logic in the game

import { DEFAULTS } from './constants.js';

export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  // Check for all collisions in the game
  checkCollisions() {
    if (!this.game.ball || !this.game.paddle) {
      return;
    }

    // - Call checkPaddleCollision() to handle ball-paddle collisions
    this.checkPaddleCollision();
    // - Call checkBrickCollisions() to handle ball-brick collisions
    this.checkBrickCollisions();
  }

  // Check if ball collides with paddle
  checkPaddleCollision() {

    // 1. Get references to the ball and paddle from the game object
    const ball = this.game.ball;
    const paddle = this.game.paddle;

    // 2. Check if the ball overlaps with the paddle:
    //    - Ball's bottom edge is below paddle's top edge

    //define ball boundaries
    const ballBottom = ball.y + ball.size;
    const ballTop = ball.y - ball.size;
    const ballLeft = ball.x - ball.size;
    const ballRight = ball.x + ball.size;

    //define paddle boundaries
    const paddleTop = paddle.y;
    const paddleBottom = paddle.y + paddle.height;
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;

    //check for collision
    const collision =
      ballBottom > paddleTop &&
      ballTop < paddleBottom &&
      ballRight > paddleLeft &&
      ballLeft < paddleRight;

    // 3. If a collision is detected:
    if (collision) {
      //increase speed on collision but not more than MAX_BALL_SPEED
      ball.speed = Math.min(ball.speed + .2, DEFAULTS.MAX_BALL_SPEED);

      //    - Reverse the ball's vertical direction (set dy to negative)
      const direction = -1;
      ball.dy = direction * ball.speed;

      //    - Adjust the horizontal direction based on where the ball hit the paddle
      //      (This creates different bounce angles depending on where the ball hits)
      const hitPosition = (ball.x - paddle.x) / paddle.width;
      ball.dx = ball.speed * (hitPosition * 2 - 1) * 1.5;

    }
  }

  // Check if ball collides with any bricks
  checkBrickCollisions() {
    // 1. Get reference to the ball from the game object
    const ball = this.game.ball;

    // 2. Loop through all bricks in the game
    for (const brick of this.game.bricks) {

      // 3. For each brick that isn't broken:
      //    - Check if the ball collides with it using ball.collidesWith(brick)
      if (!brick.broken && ball.collidesWith(brick)) {

        //    - If collision detected:
        //      a. Call brick.break() to break the brick
        brick.break();

        //      b. Add points to the score using game.addScore(DEFAULTS.POINTS_PER_BRICK)
        this.game.addScore(DEFAULTS.POINTS_PER_BRICK);

        //      c. Call calculateBounceDirection() to determine how the ball should bounce
        this.calculateBounceDirection(ball, brick);

        //increase ball speed on collision but not more than max
        ball.speed = Math.min(ball.speed + 0.2, DEFAULTS.MAX_BALL_SPEED);

        //continue direction
        const direction = Math.sign(ball.dy);
        ball.dy = direction * ball.speed;
      }
    }
  }

  // Calculate how the ball should bounce after hitting a brick
  calculateBounceDirection(ball, brick) {
    // 1. Calculate the distances from the ball's center to each edge of the brick
    const distLeft = Math.abs((ball.x + ball.size) - brick.x);
    const distRight = Math.abs((brick.x + brick.width) - (ball.x - ball.size));
    const distTop = Math.abs((ball.y + ball.size) - brick.y);
    const distBottom = Math.abs((brick.y + brick.height) - (ball.y - ball.size));


    // 2. Find the shortest distance to determine which side was hit
    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    // 3. If the ball hit the left or right side of the brick, reverse ball.dx
    if (minDist === distLeft || minDist === distRight) {
      ball.dx = -ball.dx;
    }

    // 4. If the ball hit the top or bottom of the brick, reverse ball.dy
    if (minDist === distTop || minDist === distBottom) {
      ball.dy = -ball.dy;
    }
  }
}