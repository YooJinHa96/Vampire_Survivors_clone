import Projectile from "../Projectile/Projectile";
import Player from "../player/Player";
import Weapon from "./weapon";

class Staff extends Weapon {
  private attackTimer: Phaser.Time.TimerEvent | null = null;
  private particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, player, "staff");
    const { x, y } = this.player.getPosition();
    const config = {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
      frequency: 500, // 초깃값, 이후 랜덤으로 조정
      lifespan: 2000,
      alpha: { start: 1, end: 0 }, // 투명도가 1에서 0으로 점차 변경
    };
    for (let i = 0; i < 50; i++) {
      const emmiter = this.scene.add.particles(x, y, "fire", config);
      emmiter.setScale(0.2);
      emmiter.stop(); // 공격 시작 시 파티클 활성화
      this.particles.push(emmiter);
    }
  }

  public attack(): void {
    if (this.attackTimer) {
      return; // 이미 공격 중인 경우 무시
    }

    // 파티클 빈도 랜덤 설정
    this.particles.forEach((emitter, index) => {
      setTimeout(() => {
        const randomX = Phaser.Math.Between(0, 800);
        const randomY = Phaser.Math.Between(0, 600);
        emitter.setPosition(randomX, randomY);
        emitter.frequency = Phaser.Math.Between(100, 500);
        emitter.start();
      }, index * 100); // 각 파티클이 순차적으로 활성화
    });

    this.attackTimer = this.scene.time.addEvent({
      delay: 500, // 500ms마다 발사체 생성

      callbackScope: this,
      loop: true,
    });

    // 3초 후에 공격 종료
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.attackTimer?.remove();
        this.attackTimer = null;
        this.particles.forEach((emitter, index) => {
          setTimeout(() => {
            emitter.stop();
          }, index * 100);
        });
      },
    });
  }
}
export default Staff;
