import Phaser from "phaser";
import meteorImage from "src/assets/sprites/meteor.png";
import {
  PlayerShip,
  preload as preloadShip
} from "src/game-objects/player-ship";

const HEALTH_PER_LIFE = 1000;

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "gameplay" });
  }

  preload() {
    preloadShip(this);
    this.load.image("meteor", meteorImage);
  }

  healthToBar() {
    const blocks = Math.ceil(this.health / 50);
    return new Array(blocks).fill("*").join("");
  }

  create() {
    this.lives = 3;
    this.health = HEALTH_PER_LIFE;
    this.score = 0;
    this.timeScore = 0;
    this.collisionCooldowns = {};

    this.meteors = this.physics.add.group({});
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`);
    this.livesText = this.add.text(400, 10, `Lives: ${this.lives}`);
    this.healthText = this.add.text(400, 25, `Health: ${this.healthToBar()}`);

    this.ship = new PlayerShip(this);
    this.createControls();
    this.spawnMeteor();

    this.physics.add.overlap(
      this.ship,
      this.meteors,
      this.meteorImpact,
      null,
      this
    );
  }

  meteorImpact(ship, meteor) {
    const impactDamage = meteor.damage.impact.dmgPSec;
    const applyDamage = impactDamage / 1000 * this.delta;

    this.health -= applyDamage;

    if (this.health <= 0) {
      this.health = HEALTH_PER_LIFE;
      this.lives -= 1;
    }

    if (this.lives < 0) {
      this.scene.start("gameover", { score: this.score });
    }
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  spawnMeteor() {
    const meteor = this.add.image(600, 200, "meteor");
    meteor.depth = -1;
    meteor.damage = {
      impact: {
        dmgPSec: 300
      }
    };
    this.meteors.add(meteor);
  }

  update(time, delta) {
    this.updateShipControls();
    this.timeScore += delta;
    this.delta = delta;

    const maxTimeScore = Math.floor(this.timeScore / 3000) * 10;
    if (this.score < maxTimeScore) {
      this.score += 1;
    }

    this.scoreText.setText(`Score: ${this.score}`);
    this.livesText.setText(`Lives: ${this.lives}`);
    this.healthText.setText(`Health: ${this.healthToBar()}`);
  }

  axis(keyNegative, keyPositive) {
    let result = 0;
    if (keyNegative.isDown) result -= 1;
    if (keyPositive.isDown) result += 1;
    return result;
  }

  updateShipControls() {
    this.ship.setMovementAxis({
      x: this.axis(this.cursors.left, this.cursors.right),
      y: this.axis(this.cursors.up, this.cursors.down)
    });
  }
}

export default GamePlay;
