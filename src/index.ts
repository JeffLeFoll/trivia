import { Questions } from "./Questions";
import { Player } from "./Player";
import { Board } from "./Board";
import { PlayerPool } from "./PlayerPool";

export class Game {
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
    const currentPlayer = this.playerPool.determineCurrenPlayer()

    currentPlayer.roll(this.questions, roll)
  }

  public wrongAnswer(): boolean {
    const currentPlayer = this.playerPool.determineCurrenPlayer()

    const hasWronglyAnswered = currentPlayer.hasWronglyAnswered();
    this.playerPool.changePlayer();

    return !hasWronglyAnswered;
  }

  public wasCorrectlyAnswered(): boolean {
    const currentPlayer = this.playerPool.determineCurrenPlayer()

    const answeredCorrectly = currentPlayer.wasCorrectlyAnswered()
    this.playerPool.changePlayer();

    return answeredCorrectly;
  }
}
