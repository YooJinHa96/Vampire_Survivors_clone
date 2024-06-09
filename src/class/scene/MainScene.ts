import Phaser from "phaser";
import Player from "../player/Player";
import IWeapon from "../../interface/Iweapon";
import Sword from "../weapon/sword";
import ButtonManager from "../button/ButtonManager";
import Bow from "../weapon/bow";
import Staff from "../weapon/staff";

export default class MainScene extends Phaser.Scene {
  private player!: Player;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.add.image(400, 300, "background");
    this.player = new Player(this);

    this.player.addWeapon(new Sword(this, this.player));
    this.cursors = this.input.keyboard.createCursorKeys();

    ButtonManager.createButton(this, 10, 10, "Add Staff", () => {
      this.addWeapon(new Staff(this, this.player));
    });
    ButtonManager.createButton(this, 10, 50, "Add Bow", () => {
      this.addWeapon(new Bow(this, this.player)); // Replace with Axe class when available
    });
  }

  update() {
    this.player.update(this.cursors);
  }
  addWeapon(weapon: IWeapon) {
    // You can change the type to Weapon once you have multiple weapon classes
    this.player.addWeapon(weapon);
  }
}
