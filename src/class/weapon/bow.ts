import Projectile from "../Projectile/Projectile";
import Player from "../player/Player";
import Weapon from "./weapon";

class Bow extends Weapon {
  private attackTimer: Phaser.Time.TimerEvent | null = null;
  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, player, "bow");
  }

  public attack(): void {
    if (this.attackTimer) {
      return; // 이미 공격 중인 경우 무시
    }

    this.attackTimer = this.scene.time.addEvent({
      delay: 500, // 500ms마다 발사체 생성
      callback: this.fireProjectile,
      callbackScope: this,
      loop: true,
    });

    // 3초 후에 공격 종료
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.attackTimer?.remove();
        this.attackTimer = null;
      },
    });
  }
  private fireProjectile() {
    const weaponPosition = this.weapon.getCenter();
    const playerPosition = this.player.getPosition();
    const direction = new Phaser.Math.Vector2(
      weaponPosition.x - playerPosition.x,
      weaponPosition.y - playerPosition.y
    ).normalize(); // 방향 벡터를 정규화
    new Projectile(
      this.scene,
      weaponPosition.x,
      weaponPosition.y,
      direction,
      "arrow"
    );
  }
}
export default Bow;
