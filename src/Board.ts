import { Category } from "./Category";

export class Board {

  private categories: Record<number, Category> = {
    0 : 'Pop',
    1: 'Science',
    2: 'Sports',
    3: 'Rock'
  }

  public getCategory(position: number) {
    const positionModulo = position % 4

    return this.categories[positionModulo]
  }

  computePosition(current: number, delta: number) {
    return (current + delta) % 12
  }

}