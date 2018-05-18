//import "babel-polyfill";
import Phaser from "phaser";
import GamePlay from "src/scenes/game-play.js";
import GameOver from "src/scenes/game-over.js";
import Startup from "src/scenes/startup.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: [Startup, GamePlay, GameOver]
};

new Phaser.Game(config);
