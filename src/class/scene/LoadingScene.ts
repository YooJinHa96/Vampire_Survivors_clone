class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("background", "assets/background.png");
    this.load.image("sword", "assets/sword.png");
    this.load.image("bow", "assets/bow.png");
    this.load.image("gun", "assets/gun.png");
    this.load.image("staff", "assets/staff.png");
    this.load.image("beam", "assets/beam.png");
    this.load.image("arrow", "assets/arrow.png");
    this.load.image("fire", "assets/fire.png");
    // 스프라이트 시트와 JSON 파일 로드
    this.load.atlas(
      "swordAttack",
      "assets/swordAttack.png",
      "assets/swordAttack.json"
    );
  }
  create() {
    this.scene.start("MainScene");
  }
}

export default LoadingScene;
