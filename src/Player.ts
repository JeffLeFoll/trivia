import { Board } from "./Board";

export class Player {
  private readonly name: string;
  private purse: number
  private place: number
  private board: Board
  private isInPenaltyBox: boolean

  constructor(name: string, board: Board) {
    this.name = name;
    this.purse = 0
    this.place = 0
    this.board = board
    this.isInPenaltyBox = false
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

  move(roll: number) {
    console.log(`Player ${this.name} was in position ${this.place}`);
    this.place = this.board.computePosition(this.place, roll)
    console.log(`Player ${this.name} is now in position ${this.place} after roll ${roll}`);
  }

  deprecatedGetPosition() {
    return this.place;
  }

  deprecatedIsInPenaltyBox() {
    return this.isInPenaltyBox
  }

  moveToPenaltyBox() {
    this.isInPenaltyBox = true
  }

  moveOutOfPenaltyBox() {
    this.isInPenaltyBox = false
  }
}