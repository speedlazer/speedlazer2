import Phaser from "phaser";
import playerShipImage from "src/assets/sprites/player-ship.png";

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "gameplay" });
  }

  preload() {
    this.load.spritesheet("playerShip", playerShipImage, {
      frameWidth: 96,
      frameHeight: 64
    });
    //console.log("preload", playerShipImage)
  }

  create() {
    //console.log("create")
    this.ship = this.add.sprite(400, 300, "playerShip", 0);

  }

  update() {
    //console.log("update")
  }
}

export default GamePlay;
