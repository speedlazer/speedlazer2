//import "babel-polyfill";

import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.image("arwing", "assets/arwing.png");
    this.load.image("background", "assets/sky.jpg");
  }

  create() {
    this.scene.start("SpeedLazer");
  }
}

class SpeedLazer extends Phaser.Scene {
  constructor() {
    super({ key: "SpeedLazer" });

    this.MAX_SPEED = 5;
  }

  create() {
    this.sky = this.add.tileSprite(0, 0, 1920, 1920, "background");

    this.ship = new Ship(this, 200, 200, "arwing");

    const KEYS = {
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    };

    this.key = {
      up: this.input.keyboard.addKey(KEYS.up),
      down: this.input.keyboard.addKey(KEYS.down),
      left: this.input.keyboard.addKey(KEYS.left),
      right: this.input.keyboard.addKey(KEYS.right)
    };
  }

  update() {
    const key = this.key;

    // tile position instead of x property to prevent scrolling to the 'end'.
    this.sky.tilePositionX += 1;

    if (key.up.isDown) {
      this.ship.y -= this.MAX_SPEED;
    } else if (key.down.isDown) {
      this.ship.y += this.MAX_SPEED;
    } else if (key.left.isDown) {
      this.ship.x -= this.MAX_SPEED;
    } else if (key.right.isDown) {
      this.ship.x += this.MAX_SPEED;
    }
  }
}

class Ship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    this.scaleX = +-1;
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Boot, SpeedLazer]
};

new Phaser.Game(config);
