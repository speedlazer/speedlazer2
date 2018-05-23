const STARTING_LIVES = 3;

class Player {
  constructor(controls) {
    this.reset();
    this.controls = controls;
  }

  reset() {
    this.lives = STARTING_LIVES;
    this.score = 0;
  }

  isGameOver() {
    return this.lives < 0;
  }
}

export default Player;
