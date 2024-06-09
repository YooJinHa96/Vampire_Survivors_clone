import Phaser from "phaser";

class Projectile {
  scene: Phaser.Scene;
  projectile: Phaser.Physics.Arcade.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    direction: Phaser.Math.Vector2,
    texture: string
  ) {
    this.scene = scene;
    this.projectile = this.scene.physics.add.image(x, y, texture);
    this.projectile.setScale(0.3);
    this.projectile.setCollideWorldBounds(true);
    this.projectile.body.onWorldBounds = true;
    this.projectile.setVelocity(direction.x * 300, direction.y * 300); // 발사체 속도 설정
    // 방향에 맞게 회전 설정
    const angle = Phaser.Math.RadToDeg(direction.angle()) + 180;
    this.projectile.setAngle(angle);
    this.projectile.body.world.on(
      "worldbounds",
      (body: Phaser.Physics.Arcade.Body) => {
        if (body.gameObject === this.projectile) {
          this.destroy();
        }
      },
      this
    );
  }

  public destroy() {
    this.projectile.destroy();
  }
}

export default Projectile;
