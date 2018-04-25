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

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  update() {
    if (this.left.isDown) {
      this.ship.x -= 3;
    }
    if (this.right.isDown) {
      this.ship.x += 3;
    }
    if (this.up.isDown) {
      this.ship.y -= 3;
    }
    if (this.down.isDown) {
      this.ship.y += 3;
    }
    //console.log("update")
  }
}

export default GamePlay;
