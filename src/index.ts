export class Game {
  private playersNames: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    console.log('Init game')
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    const rockQuestion = "Rock Question " + index;
    console.log(`Create rock question: ${rockQuestion}`)
    return rockQuestion;
  }

  public add(name: string) {
    this.playersNames.push(name);
    console.log(`Add player ${name}`)
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;
    console.log(`Init player ${name} - position ${this.howManyPlayers() - 1}`)
  }

  private howManyPlayers(): number {
    console.log(`How many players: ${this.playersNames.length}`)
    return this.playersNames.length;
  }

  public roll(roll: number) {
    console.log(`Roll: ${roll}`)

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.playersNames[this.currentPlayer]} is in penalty box`)

      if (roll % 2 != 0) {
        console.log(`Player ${this.playersNames[this.currentPlayer]} is getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = true;

        console.log(`Player ${this.playersNames[this.currentPlayer]} was in position ${this.places[this.currentPlayer]}`)
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }
        console.log(`Player ${this.playersNames[this.currentPlayer]} is now in position ${this.places[this.currentPlayer]} after roll ${roll}`)

        this.askQuestion();
      } else {
        console.log(`Player ${this.playersNames[this.currentPlayer]} is not getting out of penalty box`)
        this.isGettingOutOfPenaltyBox = false;
      }

    } else {
      console.log(`Player ${this.playersNames[this.currentPlayer]} is not in penalty box`)

      console.log(`Player ${this.playersNames[this.currentPlayer]} was in position ${this.places[this.currentPlayer]}`)
      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }
      console.log(`Player ${this.playersNames[this.currentPlayer]} is now in position ${this.places[this.currentPlayer]} after roll ${roll}`)

      this.askQuestion();
    }
  }

  private askQuestion(): void {
    if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
    if (this.currentCategory() == "Science") console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == "Sports") console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock") console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.places[this.currentPlayer] == 0) return "Pop";
    if (this.places[this.currentPlayer] == 4) return "Pop";
    if (this.places[this.currentPlayer] == 8) return "Pop";
    if (this.places[this.currentPlayer] == 1) return "Science";
    if (this.places[this.currentPlayer] == 5) return "Science";
    if (this.places[this.currentPlayer] == 9) return "Science";
    if (this.places[this.currentPlayer] == 2) return "Sports";
    if (this.places[this.currentPlayer] == 6) return "Sports";
    if (this.places[this.currentPlayer] == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    const isWinning = this.purses[this.currentPlayer] == 6;
    console.log(`Player ${this.playersNames[this.currentPlayer]} is winning: ${isWinning}`)

    return isWinning;
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.playersNames[this.currentPlayer]} answered wrong`)

    this.inPenaltyBox[this.currentPlayer] = true;
    console.log(`Player ${this.playersNames[this.currentPlayer]} is in penalty box`)

    console.log(`Move to next player`)
    this.currentPlayer += 1;
    if (this.currentPlayer == this.playersNames.length) this.currentPlayer = 0;
    console.log(`Player ${this.playersNames[this.currentPlayer]} is now playing`)

    return false;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.playersNames[this.currentPlayer]} answered correctly`)

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.playersNames[this.currentPlayer]} is in penalty box`)
      if (this.isGettingOutOfPenaltyBox) {
        this.inPenaltyBox[this.currentPlayer] = false;
        this.purses[this.currentPlayer] += 1;

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.playersNames.length) this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.playersNames.length) this.currentPlayer = 0;
        return false;
      }
    } else {
      this.purses[this.currentPlayer] += 1;

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.playersNames.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
