import Player from "../class/player/Player";

interface IWeapon {
  player: Player;
  scene: Phaser.Scene;

  attack: () => void;
}
export default IWeapon;
