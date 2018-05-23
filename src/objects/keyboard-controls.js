class KeyboardControls {
  constructor(scene) {
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  axis(keyNegative, keyPositive) {
    let result = 0;
    if (keyNegative.isDown) result -= 1;
    if (keyPositive.isDown) result += 1;
    return result;
  }

  getMotionAxis() {
    return {
      x: this.axis(this.cursors.left, this.cursors.right),
      y: this.axis(this.cursors.up, this.cursors.down)
    };
  }

  isConfirmDown() {
    return this.cursors.space.isDown;
  }
}

export default KeyboardControls;
