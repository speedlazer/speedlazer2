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

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  update() {
    if (this.left.isDown) {
      this.ship.body.velocity.x = -300;
    }
    if (this.right.isDown) {
      this.ship.body.velocity.x = 300;
    }
    if (this.up.isDown) {
      this.ship.body.velocity.y = -300;
    }
    if (this.down.isDown) {
      this.ship.body.velocity.y = 300;
    }
  }
}

export default GamePlay;
