import { Board } from "./Board";
import { Questions } from "./Questions";

export class Player {
  protected readonly name: string;
  private purse: number
  protected place: number
  protected board: Board
  private isInPenaltyBox: boolean
  protected isGettingOutOfPenaltyBox: boolean = false;

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
    const isWinning =  this.purse == 6
    console.log(`Player ${this.name} is winning: ${isWinning}`)

    return isWinning;
  }

  move(roll: number) {
    console.log(`Player ${this.name} was in position ${this.place}`);
    this.place = this.board.computePosition(this.place, roll)
    console.log(`Player ${this.name} is now in position ${this.place} after roll ${roll}`);
  }

  moveToPenaltyBox() {
    this.isInPenaltyBox = true
  }

  moveOutOfPenaltyBox() {
    this.isInPenaltyBox = false
  }

  roll(questions: Questions, roll: number){
    console.log(`Roll: ${roll}`)

    if(this.isInPenaltyBox){
      console.log(`Player ${this.name} is in penalty box`)

      if (roll % 2 != 0) {
        console.log(`Player ${this.name} is getting out of penalty box`)

        this.isGettingOutOfPenaltyBox = true;

        this.move(roll);

        questions.askQuestion(this.board.getCategory(this.place));

      } else {
        console.log(`Player ${this.name} is not getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = false
      }
    } else {
      console.log(`Player ${this.name} is not in penalty box`)

      this.move(roll);

      questions.askQuestion(this.board.getCategory(this.place));
    }
  }

  wasCorrectlyAnswered() {
    console.log(`Player ${this.name} answered correctly`)

    if(this.isInPenaltyBox) {
      console.log(`Player ${this.name} is in penalty box`)

      if(this.isGettingOutOfPenaltyBox) {
        this.moveOutOfPenaltyBox();
        this.givePoint()

        console.log(`Player ${this.name} is getting out of penalty box`)
        return this.isWinning();

      } else {
        console.log(`Player ${this.name} in penalty box, switch player`)
        return false;
      }
    } else {
      this.givePoint();

      return this.isWinning();

    }
  }

  hasWronglyAnswered() {
    console.log(`Player ${this.name} answered wrong`)
    this.moveToPenaltyBox();
    console.log(`Player ${this.name} is in penalty box`)

    return true;
  }
}