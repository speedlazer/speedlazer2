import Phaser from "phaser";
import Player from "src/objects/player";
import KeyboardControls from "src/objects/keyboard-controls";

class Startup extends Phaser.Scene {
  constructor() {
    super({ key: "startup" });
  }

  create() {
    const player = new Player(new KeyboardControls(this));

    this.scene.start("gameplay", { player: player });
  }
}

export default Startup;
