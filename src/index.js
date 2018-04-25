//import "babel-polyfill";

import Phaser from "phaser";

const SpeedLazer = {
  preload() {
    this.ship = Object.create(Ship);
    this.ship.init();
    this.ship.loadSprite.call(this, "arwing");
  },

  create() {
    this.ship.addSprite.call(this, 200, 200, "arwing");
  }
};

const Ship = {
  init(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  },

  loadSprite(type) {
    this.load.image(type, "assets/arwing.png");
  },

  addSprite(x, y, type) {
    this.add.image(x, y, type);
  }
};

const speedlazer = Object.create(SpeedLazer);

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: speedlazer.preload,
    create: speedlazer.create,
    update: speedlazer.update
  }
};

new Phaser.Game(config);
