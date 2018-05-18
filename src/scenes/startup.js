import Phaser from "phaser";
import Player from "src/objects/player";

class Startup extends Phaser.Scene {
  constructor() {
    super({ key: "startup" });
  }

  create() {
    const player = new Player();

    this.scene.start("gameplay", { player: player });
  }
}

export default Startup;
