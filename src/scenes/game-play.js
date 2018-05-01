import Phaser from "phaser";
import playerShipImage from "src/assets/sprites/player-ship.png";
import particlesImage from "src/assets/sprites/particles.png";

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "gameplay" });
  }

  preload() {
    this.load.spritesheet("playerShip", playerShipImage, {
      frameWidth: 96,
      frameHeight: 64
    });
    this.load.image("particles", particlesImage);
  }

  create() {
    this.createShip();
    this.createControls();
  }

  createShip() {
    const particles = this.add.particles("particles");
    const zone = new Phaser.Geom.Circle(0, 0, 10);
    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1.5, end: 0.2 },
      x: -50,
      gravityX: -140,
      angle: 180,
      acceleration: true,
      blendMode: "ADD",
      emitZone: {
        type: "random",
        source: zone
      }
    });

    this.ship = this.physics.add.sprite(400, 300, "playerShip", 0);
    this.ship.body.allowDrag = true;
    this.ship.body.drag.x = 1000;
    this.ship.body.drag.y = 1000;
    emitter.startFollow(this.ship);
    this.ship.setCollideWorldBounds(true);
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.updateShipControls();
  }

  updateShipControls() {
    this.ship.setFrame(0);
    if (this.cursors.left.isDown) {
      this.ship.body.velocity.x = -300;
    }
    if (this.cursors.right.isDown) {
      this.ship.body.velocity.x = 300;
    }
    if (this.cursors.up.isDown) {
      this.ship.setFrame(2);
      this.ship.body.velocity.y = -300;
    }
    if (this.cursors.down.isDown) {
      this.ship.setFrame(1);
      this.ship.body.velocity.y = 300;
    }
  }
}

export default GamePlay;
