import Phaser from "phaser";

const preload = (scene: Phaser.Scene) => {
  scene.load.image("player", "assets/player.png");
  scene.load.image("background", "assets/background.png");
  scene.load.image("weapon", "assets/sword.png"); // 무기 이미지 로드
};
export { preload };
