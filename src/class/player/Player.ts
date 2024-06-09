import Phaser from "phaser";
import IWeapon from "../../interface/Iweapon";
import { weaponManager } from "../weapon/weaponManager";

export default class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private weapons: IWeapon[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(400, 300, "player");
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setScale(0.5);
    this.sprite.body.setSize(this.sprite.width * 0.5, this.sprite.height * 0.5);
    this.sprite.body.setOffset(
      this.sprite.width * 0.25,
      this.sprite.height * 0.33
    );

    this.weapons = [];
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.sprite.setVelocity(0);

    if (cursors.left?.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.setFlipX(false);
    } else if (cursors.right?.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.setFlipX(true);
    }

    if (cursors.up?.isDown) {
      this.sprite.setVelocityY(-160);
    } else if (cursors.down?.isDown) {
      this.sprite.setVelocityY(160);
    }

    // 무기 업데이트

    weaponManager.updateWeaponPositions(this.sprite.x, this.sprite.y);

    this.attack();
  }

  addWeapon(weapon: IWeapon) {
    this.weapons.push(weapon);
  }

  attack() {
    this.weapons.forEach((weapon) => weapon.attack());
  }

  getSprite() {
    return this.sprite;
  }
  getPosition() {
    return { x: this.sprite.x, y: this.sprite.y };
  }
}
