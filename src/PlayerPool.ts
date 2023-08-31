import { Player } from "./Player";

export class PlayerPool {
  private pool: Array<Player> = []
  private currentPlayerIndex: number = 0;

  constructor() {
  }

  registerPlayer(player: Player) {
    this.pool.push(player)
    console.log(`Add player ${player.getName()}`)

    console.log(`How many players: ${this.pool.length}`)

    console.log(`Init player ${player.getName()} - position ${this.pool.findIndex(el => el.getName() === player.getName())}`)
  }

  determineCurrenPlayer() {
    return this.pool[this.currentPlayerIndex]
  }

  changePlayer() {
    console.log(`Move to next player`);
    this.currentPlayerIndex += 1;

    if (this.currentPlayerIndex == this.pool.length) this.currentPlayerIndex = 0;

    const currentPlayer = this.pool[this.currentPlayerIndex]
    console.log(`Player ${currentPlayer.getName()} is now playing`);
  }


}