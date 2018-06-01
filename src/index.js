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

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);

    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY);

    this.TIME_DELAY_BETWEEN_FIRE = 200;
    this.body.collideWorldBounds = true;
    this.ACCELERATION = 0.9;
    this.speedlazerScene = scene;
    scene.add.existing(this);
    this.scaleX = 0.9;
    this.scaleY = 0.9;
    this.flipX = true;
    this.nextFire = 0;

    this.vx = 0;
    this.vy = 0;
    this.ax = this.ACCELERATION;
    this.ay = this.ACCELERATION;
    this.friction = 0.93;
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

  checkKeysUp() {
    if (this.key.right.isUp) {
      this.ax = 0;
    }
    if (this.key.left.isUp) {
      this.ax = 0;
    }
    if (this.key.up.isUp) {
      this.ay = 0;
    } else if (this.key.down.isUp) {
      this.ay = 0;
    }
  }

  checkKeysDown() {
    if (this.key.up.isDown) {
      this.ay = -this.ACCELERATION;
    } else if (this.key.down.isDown) {
      this.ay = this.ACCELERATION;
    }
    if (this.key.left.isDown) {
      this.ax = -this.ACCELERATION;
    }
    if (this.key.right.isDown) {
      this.ax = this.ACCELERATION;
    }

    if (this.key.spacebar.isDown) {
      this.fire();
    }
  }

  update() {
    this.checkKeysDown();

    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    this.checkKeysUp();
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
  scene: [Boot, SpeedLazer],
  physics: {
    default: "arcade"
  }
};

new Phaser.Game(config);
