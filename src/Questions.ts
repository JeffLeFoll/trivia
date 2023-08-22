import { Category } from "./Category";
import { Deck } from "./Deck";

export class Questions {

  private questions: Record<Category, Deck<Category>> = {
    'Pop': new Deck<"Pop">("Pop"),
    'Science': new Deck<"Science">("Science"),
    'Sports': new Deck<"Sports">("Sports"),
    'Rock': new Deck<"Rock">("Rock")
  }

  public askQuestion(category: Category): void {
    this.questions[category].pick()
  }
}