export class Player {
  private readonly name: string;
  private purse: number
  constructor(name: string) {
    this.name = name;
    this.purse = 0
  }
  public getName() {
    return this.name
  }

  givePoint() {
    this.purse += 1
  }

  isWinning() {
    return this.purse == 6
  }
}