import { Questions } from "./Questions";
import { Player } from "./Player";
import { Category } from "./Category";
import { Board } from "./Board";
import { PlayerPool } from "./PlayerPool";

export class Game {
  private isGettingOutOfPenaltyBox: boolean = false;
  private questions: Questions;
  private board: Board;
  private playerPool: PlayerPool

  constructor() {
    console.log('Init game')
    this.questions = new Questions()
    this.board = new Board()
    this.playerPool = new PlayerPool()
  }

  public add(name: string) {
    const player = new Player(name, this.board);
    this.playerPool.registerPlayer(player)
  }

  public roll(roll: number) {
    console.log(`Roll: ${roll}`)
    const currentPlayer = this.playerPool.determineCurrenPlayer()

    if (currentPlayer.deprecatedIsInPenaltyBox()) {
      console.log(`Player ${currentPlayer.getName()} is in penalty box`)

      if (roll % 2 != 0) {
        console.log(`Player ${currentPlayer.getName()} is getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = true;
        this.movePlayer(roll);

        this.questions.askQuestion(this.currentCategory());

      } else {
        console.log(`Player ${currentPlayer.getName()} is not getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = false;
      }

    } else {
      console.log(`Player ${currentPlayer.getName()} is not in penalty box`)

      this.movePlayer(roll);

      this.questions.askQuestion(this.currentCategory());
    }
  }

  private movePlayer(roll: number) {
    const currentPlayer = this.playerPool.determineCurrenPlayer()
    currentPlayer.move(roll)
  }

  private currentCategory(): Category {
    const currentPlayer = this.playerPool.determineCurrenPlayer()
    return this.board.getCategory(currentPlayer.deprecatedGetPosition())
  }

  private didPlayerWin(): boolean {
    const currentPlayer = this.playerPool.determineCurrenPlayer()
    const isWinning = currentPlayer.isWinning()
    console.log(`Player ${currentPlayer.getName()} is winning: ${isWinning}`)

    return isWinning;
  }

  public wrongAnswer(): boolean {
    const currentPlayer = this.playerPool.determineCurrenPlayer()
    console.log(`Player ${currentPlayer.getName()} answered wrong`)

    currentPlayer.moveToPenaltyBox();
    console.log(`Player ${currentPlayer.getName()} is in penalty box`)

    this.playerPool.changePlayer();

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    const currentPlayer = this.playerPool.determineCurrenPlayer()
    console.log(`Player ${currentPlayer.getName()} answered correctly`)

    if (currentPlayer.deprecatedIsInPenaltyBox()) {
      console.log(`Player ${currentPlayer.getName()} is in penalty box`)

      if (this.isGettingOutOfPenaltyBox) {
        currentPlayer.moveOutOfPenaltyBox();
        currentPlayer.givePoint()

        console.log(`Player ${currentPlayer.getName()} is getting out of penalty box`)
        const winner = this.didPlayerWin();
        this.playerPool.changePlayer();

        return winner;

      } else {
        console.log(`Player ${currentPlayer.getName()} in penalty box, switch player`)
        this.playerPool.changePlayer();

        return false;
      }
    } else {
      currentPlayer.givePoint();

      const winner = this.didPlayerWin();

      this.playerPool.changePlayer();

      return winner;
    }
  }
}
