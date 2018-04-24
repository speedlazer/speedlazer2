//import "babel-polyfill";

import Phaser from "phaser";

const preload = () => {
  // console.log("preload")
};

const create = () => {
  // console.log("create")
};

const update = () => {
  // console.log("update")
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);
