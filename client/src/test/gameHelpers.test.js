import { createStage, checkCollision, STAGE_WIDTH, STAGE_HEIGHT} from "../Components/gameHelpers";
let stage = createStage()
let stageFull = Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill(['T', "merged"]))
test("Test createStage", () => expect(createStage()).toStrictEqual(stage));
test("Test Collision TRUE", () => {
  let player = {
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    collided: false,
  };
  expect(checkCollision(player, stage, { x: 1, y: 0 })).toBeFalsy();
});
test("Test Collision False", () => {
  let player = {
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    collided: false,
  };
  expect(checkCollision(player, stageFull, { x: 1, y: 0 })).toBeTruthy();
});