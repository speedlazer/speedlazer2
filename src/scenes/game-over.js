import Phaser from "phaser";

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }

  create(args) {
    this.add.text(80, 80, `GAME OVER. Score: ${args.score}`);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start("gameplay");
    }
  }
}

export default GameOver;
