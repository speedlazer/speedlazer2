//import "babel-polyfill";
import Phaser from "phaser";
import GamePlay from "src/scenes/game-play.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: [GamePlay]
};

new Phaser.Game(config);
