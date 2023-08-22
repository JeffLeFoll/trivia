import { Questions } from "./Questions";
import { Player } from "./Player";
import { Category } from "./Category";
import { Board } from "./Board";

export class Game {
  private playersNames: Array<string> = [];
  private places: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;
  private questions: Questions;
  private board: Board;
  private players: Array<Player> = []

  constructor() {
    console.log('Init game')
    this.questions = new Questions()
    this.board = new Board()
  }

  public add(name: string) {
    const player = new Player(name);
    this.players.push(player)
    console.log(`Add player ${player.getName()}`)

    this.playersNames.push(player.getName());
    let playerIndex = this.howManyPlayers() - 1;

    this.places[playerIndex] = 0;
    this.inPenaltyBox[playerIndex] = false;
    console.log(`Init player ${player.getName()} - position ${playerIndex}`)
  }

  private howManyPlayers(): number {
    console.log(`How many players: ${this.playersNames.length}`)
    return this.playersNames.length;
  }

  public roll(roll: number) {
    console.log(`Roll: ${roll}`)

    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is in penalty box`)

      if (roll % 2 != 0) {
        console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = true;
        this.movePlayer(roll);

        this.questions.askQuestion(this.currentCategory());
      } else {
        console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is not getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = false;
      }

    } else {
      console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is not in penalty box`)

      this.movePlayer(roll);

      this.questions.askQuestion(this.currentCategory());
    }
  }

  private movePlayer(roll: number) {
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} was in position ${this.places[this.currentPlayerIndex]}`);
    this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] + roll;
    if (this.places[this.currentPlayerIndex] > 11) {
      this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] - 12;
    }
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is now in position ${this.places[this.currentPlayerIndex]} after roll ${roll}`);
  }

  private currentCategory(): Category {
    return this.board.getCategory(this.places[this.currentPlayerIndex])
  }

  private didPlayerWin(): boolean {
    const currentPlayer = this.players[this.currentPlayerIndex]
    const isWinning = currentPlayer.isWinning()
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is winning: ${isWinning}`)

    return isWinning;
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} answered wrong`)

    this.inPenaltyBox[this.currentPlayerIndex] = true;
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is in penalty box`)

    this.changePlayer();

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    const currentPlayer = this.players[this.currentPlayerIndex]
    console.log(`Player ${currentPlayer.getName()} answered correctly`)

    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is in penalty box`)

      if (this.isGettingOutOfPenaltyBox) {
        this.inPenaltyBox[this.currentPlayerIndex] = false;
       currentPlayer.givePoint()

        console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is getting out of penalty box`)
        const winner = this.didPlayerWin();
        this.changePlayer();

        return winner;
      } else {
        console.log(`Player ${this.playersNames[this.currentPlayerIndex]} in penalty box, switch player`)
        this.changePlayer();

        return false;
      }
    } else {
      currentPlayer.givePoint();

      const winner = this.didPlayerWin();

      this.changePlayer();

      return winner;
    }
  }

  private changePlayer() {
    console.log(`Move to next player`);
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.playersNames.length) this.currentPlayerIndex = 0;
    console.log(`Player ${this.playersNames[this.currentPlayerIndex]} is now playing`);
  }
}
