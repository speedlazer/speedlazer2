import Phaser from "phaser";

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }

  create({ player }) {
    this.player = player;
    this.add.text(80, 80, `GAME OVER. Score: ${player.score}`);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.player.reset();
      this.scene.start("gameplay", { player: this.player });
    }
  }
}

export default GameOver;
