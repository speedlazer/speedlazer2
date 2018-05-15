import Phaser from "phaser";
import playerShipImage from "src/assets/sprites/player-ship.png";
import particlesImage from "src/assets/sprites/particles.png";

export const preload = scene => {
  scene.load.spritesheet("playerShip", playerShipImage, {
    frameWidth: 96,
    frameHeight: 64
  });
  scene.load.image("particles", particlesImage);
};

export class PlayerShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 400, 300, "playerShip", 0);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY);

    this.setupTailFlame();
    this.setupPhysicalProperties();
  }

  setupTailFlame() {
    const particles = this.scene.add.particles("particles");
    const zone = new Phaser.Geom.Circle(0, 0, 5);
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

    emitter.startFollow(this);
  }

  setupPhysicalProperties() {
    this.body.allowDrag = true;
    this.body.drag.x = 500;
    this.body.drag.y = 500;
    this.setCollideWorldBounds(true);
  }
}
