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

    // TODO: Call the methods to check different types of collisions
    // - Call checkPaddleCollision() to handle ball-paddle collisions
    // - Call checkBrickCollisions() to handle ball-brick collisions
  }

  // Check if ball collides with paddle
  checkPaddleCollision() {
    // TODO: Implement paddle collision detection and response
    // 1. Get references to the ball and paddle from the game object
    // 2. Check if the ball overlaps with the paddle:
    //    - Ball's bottom edge is below paddle's top edge
    //    - Ball's bottom edge is above paddle's bottom edge
    //    - Ball's horizontal position is between paddle's left and right edges
    // 3. If a collision is detected:
    //    - Reverse the ball's vertical direction (set dy to negative)
    //    - Adjust the horizontal direction based on where the ball hit the paddle
    //      (This creates different bounce angles depending on where the ball hits)
  }

  // Check if ball collides with any bricks
  checkBrickCollisions() {
    // TODO: Implement brick collision detection and response
    // 1. Get reference to the ball from the game object
    // 2. Loop through all bricks in the game
    // 3. For each brick that isn't broken:
    //    - Check if the ball collides with it using ball.collidesWith(brick)
    //    - If collision detected:
    //      a. Call brick.break() to break the brick
    //      b. Add points to the score using game.addScore(DEFAULTS.POINTS_PER_BRICK)
    //      c. Call calculateBounceDirection() to determine how the ball should bounce
  }

  // Calculate how the ball should bounce after hitting a brick
  calculateBounceDirection(ball, brick) {
    // TODO: Determine how the ball should bounce off a brick
    // 1. Calculate the distances from the ball's center to each edge of the brick
    // 2. Find the shortest distance to determine which side was hit
    // 3. If the ball hit the left or right side of the brick, reverse ball.dx
    // 4. If the ball hit the top or bottom of the brick, reverse ball.dy
  }
}