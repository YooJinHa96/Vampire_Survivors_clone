import Phaser from "phaser";

export default class ButtonManager {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  static createButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback: () => void
  ) {
    const button = scene.add.text(x, y, text, {
      fontSize: "14px",
      backgroundColor: "#000",
      color: "#fff",
      padding: { x: 10, y: 5 },
    });

    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", callback);
  }
}
