//import "babel-polyfill";

import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.image("arwing", "assets/arwing.png");
    this.load.image("background", "assets/sky.jpg");
    this.load.image("laser", "assets/charmander.png");
  }

  create() {
    this.scene.start("SpeedLazer");
  }
}

class SpeedLazer extends Phaser.Scene {
  constructor() {
    super({ key: "SpeedLazer" });
  }

  create() {
    // To be refactored soon.
    this.sky = this.add.tileSprite(0, 0, 1920, 1920, "background");

    this.ship = new Ship(this, 200, 200, "arwing");
    this.ship.create();
  }

  update() {
    this.ship.update(this.key);
    // tile position instead of x property to prevent scrolling to the 'end'.
    this.sky.tilePositionX += 1;
  }
}

class Ship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);

    this.MAX_SPEED = 5;
    this.TIME_DELAY_BETWEEN_FIRE = 200;
    this.speedlazerScene = scene;
    scene.add.existing(this);
    this.scaleX = -1;
    this.nextFire = 0;
  }

  create() {
    const KEYS = {
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE
    };

    this.key = {
      up: this.speedlazerScene.input.keyboard.addKey(KEYS.up),
      down: this.speedlazerScene.input.keyboard.addKey(KEYS.down),
      left: this.speedlazerScene.input.keyboard.addKey(KEYS.left),
      right: this.speedlazerScene.input.keyboard.addKey(KEYS.right),
      spacebar: this.speedlazerScene.input.keyboard.addKey(KEYS.spacebar)
    };

    this.laser = this.speedlazerScene.add.group({
      classType: Laser,
      runChildUpdate: true // runs the update function from the specified class.
    });
  }

  update() {
    if (this.key.up.isDown) {
      this.y -= this.MAX_SPEED;
    } else if (this.key.down.isDown) {
      this.y += this.MAX_SPEED;
    }

    if (this.key.left.isDown) {
      this.x -= this.MAX_SPEED;
    }
    if (this.key.right.isDown) {
      this.x += this.MAX_SPEED;
    }
    if (this.key.spacebar.isDown) {
      this.fire();
    }
  }

  fire() {
    if (this.speedlazerScene.time.now > this.nextFire) {
      this.laser.get();
      this.setDelayFireRate();
    }
  }

  setDelayFireRate() {
    this.nextFire =
      this.speedlazerScene.time.now + this.TIME_DELAY_BETWEEN_FIRE;
  }
}

class Laser extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, "laser");
    scene.add.existing(this);
    this.speedlazerScene = scene;
    this.BULLET_SPEED = 15;
    this.scaleX = 0.1;
    this.scaleY = 0.1;
    this.x = scene.ship.x;
    this.y = scene.ship.y;
  }

  update() {
    this.x += this.BULLET_SPEED;
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Boot, SpeedLazer]
};

new Phaser.Game(config);
