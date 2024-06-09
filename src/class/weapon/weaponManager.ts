import Weapon from "./weapon";

class WeaponManager {
  totalWeapons: number = 0;
  weapons: Weapon[] = [];
  weaponAngle = 0;
  private radius: number = 100;

  addWeapon(weapon: Weapon) {
    this.weapons.push(weapon);
    this.totalWeapons++;
  }
  getIndex() {
    return this.totalWeapons;
  }
  updateWeaponPositions(x: number, y: number) {
    const totalWeapons = this.weapons.length;
    this.weaponAngle += 0.05;
    this.weapons.forEach((weapon, index) => {
      const angle = (index / totalWeapons) * Math.PI * 2;
      const weaponX = x + this.radius * Math.cos(angle + this.weaponAngle);
      const weaponY = y + this.radius * Math.sin(angle + this.weaponAngle);
      weapon.setPosition(weaponX, weaponY);
    });
  }
}
const weaponManager = new WeaponManager();
export { weaponManager };
