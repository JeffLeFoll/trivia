// eslint-disable-next-line import/no-extraneous-dependencies
import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

test("My first scenario", async () => {
  runGoldenMaster(async () => {
    const game = new Game();
    game.add("Mathieu");
    game.add("Thomas");
    game.add("Clément");
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
  });
});

describe("can play trivia game", () => {
  test("can add players", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.add("Clément");
    });
  });

  test("can roll dice and move to position 3", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.roll(3);
    });
  });

  test("can roll dice and move to position 1 after making a whole round", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.roll(10);
      game.roll(3);
    });
  });

  test("can roll dice and move to position 1 after making a whole round when getting out of penalty box", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.roll(10);
      game.wrongAnswer()
      game.roll(3);
    });
  });

  test("can win after 6 correct answers", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.wasCorrectlyAnswered();
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
    });
  });

  test("can get out of penalty box with odd roll", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.roll(3)
      game.wasCorrectlyAnswered();
    });
  });

  test("cannot get out of penalty box with even roll", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.roll(4)
    });
  });

  test("is stuck in penalty box", async () => {
    runGoldenMaster(async () => {
      const game = new Game();
      game.add("Mathieu");
      game.add("Thomas");
      game.wrongAnswer()
      game.wasCorrectlyAnswered();
      game.roll(4)
      game.wasCorrectlyAnswered();
    });
  });
});
