// constants.js - Game constants and configuration

// Game states
export const GAME_STATES = Object.freeze({
  START: 'start',
  PLAYING: 'playing',
  GAMEOVER: 'gameover',
  WIN: 'win'
});

// Default settings
export const DEFAULTS = Object.freeze({
  LIVES: 3,
  BALL_SPEED: 3,
  PADDLE_SPEED: 8,
  BALL_SIZE: 10,
  PADDLE_WIDTH: 100,
  PADDLE_HEIGHT: 15,
  POINTS_PER_BRICK: 10,
  MAX_BALL_SPEED: 10
});

// Brick configuration
export const BRICK_CONFIG = Object.freeze({
  ROWS: 5,
  COLUMNS: 8,
  WIDTH: 80,
  HEIGHT: 20,
  PADDING: 10,
  OFFSET_TOP: 60,
  OFFSET_LEFT: 35,
  COLORS: [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF'  // Blue
  ]
});

// Keyboard keys for controls
export const KEYS = Object.freeze({
  LEFT: ['ArrowLeft', 'a', 'A', 'h', 'H'],
  RIGHT: ['ArrowRight', 'd', 'D', 'l', 'L'],
  KEY_CODES: {
    LEFT: 37,
    RIGHT: 39
  }
});
