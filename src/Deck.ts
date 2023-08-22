import { Category } from "./Category";

export class Deck<C extends Category> {
  private questions: Array<string>;
  constructor( category: C) {
    this.questions = this.initQuestions(category, 50)
  }

  private initQuestions(category: C, numberOfCards: number) {
    const cards = []
    for (let i = 0; i < numberOfCards; i++) {
      cards.push(`${category} Question ${i}`)
    }
    return cards
  }

  public pick() {
    const question = this.questions.shift()
    console.log(question)

    return question
  }
}