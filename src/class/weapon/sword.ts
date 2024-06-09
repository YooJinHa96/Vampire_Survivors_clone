import Player from "../player/Player";
import Weapon from "./weapon";

class Sword extends Weapon {
  private attackEffect: Phaser.GameObjects.Sprite | null = null;
  private isAttacking: boolean = false;
  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, player, "sword");
    const frames = this.scene.anims.generateFrameNames("swordAttack", {
      prefix: "swordAttack_",
      start: 0,
      end: 7, // 프레임 개수에 따라 조정
      zeroPad: 0,
      suffix: ".png",
    });

    // 공격 애니메이션 생성
    this.scene.anims.create({
      key: "swordAttack",
      frames: frames,
      frameRate: 10,
      repeat: 0,
    });
  }

  public attack(): void {
    if (this.isAttacking) {
      return; // 이미 공격 중이면 중복 호출하지 않음
    }

    this.isAttacking = true; // 공격 중으로 설정

    if (this.attackEffect) {
      this.attackEffect.destroy();
    }
    const { x, y } = this.player.getPosition();

    this.attackEffect = this.scene.add.sprite(x, y, "swordAttack");
    this.attackEffect.setScale(0.5);
    this.attackEffect.play("swordAttack");
    this.attackEffect.on("animationcomplete", () => {
      this.attackEffect?.destroy();
      this.attackEffect = null;
      this.isAttacking = false; // 공격이 끝났음을 설정
    });
  }
}

export default Sword;
