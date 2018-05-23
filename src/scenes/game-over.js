import Phaser from "phaser";

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }

  create({ player }) {
    this.player = player;
    this.add.text(80, 80, `GAME OVER. Score: ${player.score}`);
  }

  update() {
    if (this.player.controls.isConfirmDown()) {
      this.player.reset();
      this.scene.start("gameplay", { player: this.player });
    }
  }
}

export default GameOver;
