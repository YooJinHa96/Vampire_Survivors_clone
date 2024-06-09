import IWeapon from "../../interface/Iweapon";
import Player from "../player/Player";

import { weaponManager } from "./weaponManager";

class Weapon implements IWeapon {
  player: Player;
  scene: Phaser.Scene;
  weapon: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  weaponAngle = 0;
  weaponRadius = 100;

  index: number;

  constructor(scene: Phaser.Scene, player: Player, texture: string) {
    this.player = player;
    this.scene = scene;

    const { x, y } = this.player.getPosition();

    this.weapon = this.scene.physics.add.image(
      x + this.weaponRadius,
      y,
      texture
    );
    this.weapon.setScale(0.8); // 무기 크기 조정
    this.weapon.body.setAllowGravity(false); // 무기에 중력 비활성화
    this.weapon.body.setImmovable(true); // 무기 객체를 움직이지 않도록 설정

    const { x: playerX, y: playerY } = this.player.getPosition();
    this.index = weaponManager.getIndex();
    weaponManager.addWeapon(this);
    weaponManager.updateWeaponPositions(playerX, playerY);
  }

  setPosition(x: number, y: number) {
    this.weapon.setPosition(x, y);
  }

  public attack(): void {}
}

export default Weapon;
