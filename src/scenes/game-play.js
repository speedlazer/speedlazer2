import Phaser from "phaser";
import meteorImage from "src/assets/sprites/meteor.png";
import {
  PlayerShip,
  preload as preloadShip
} from "src/game-objects/player-ship";

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "gameplay" });
  }

  preload() {
    preloadShip(this);
    this.load.image("meteor", meteorImage);
  }

  create() {
    this.lives = 5;
    this.score = 0;
    this.timeScore = 0;
    this.collisionCooldowns = {};

    this.meteors = this.physics.add.group({});
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`);
    this.livesText = this.add.text(400, 10, `Lives: ${this.lives}`);

    this.createShip();
    this.createControls();
    this.meteorCooldown = 10e3;
    this.spawnMeteor();

    this.physics.add.overlap(
      this.ship,
      this.meteors,
      this.meteorImpact,
      this.meteorCollide,
      this
    );
  }

  meteorCollide(ship, meteor) {
    if (this.collisionCooldowns[meteor]) {
      return false;
    }
    this.collisionCooldowns[meteor] = 500;
    return true;
  }

  meteorImpact() {
    this.lives -= 1;

    if (this.lives < 0) {
      this.scene.start("gameover", { score: this.score });
    }
  }

  createShip() {
    this.ship = new PlayerShip(this);
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  spawnMeteor() {
    const meteor = this.add.image(600, 200, "meteor");
    meteor.depth = -1;
    this.meteors.add(meteor);
  }

  update(time, delta) {
    this.meteorCooldown -= delta;
    if (this.meteorCooldown < 0) {
      this.meteorCooldown = 5e3 + Math.random() * 1000;
    }
    this.updateShipControls();
    this.timeScore += delta;

    for (let obj in this.collisionCooldowns) {
      this.collisionCooldowns[obj] -= delta;
      if (this.collisionCooldowns[obj] <= 0) {
        delete this.collisionCooldowns[obj];
      }
    }

    const maxTimeScore = Math.floor(this.timeScore / 3000) * 10;
    if (this.score < maxTimeScore) {
      this.score += 1;
    }

    this.scoreText.setText(`Score: ${this.score}`);
    this.livesText.setText(`Lives: ${this.lives}`);
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
