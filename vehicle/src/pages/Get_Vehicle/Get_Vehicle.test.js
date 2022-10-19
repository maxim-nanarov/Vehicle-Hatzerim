import { expect, test } from "@jest/globals";
import { If_In_Range } from "./Get_Vehicle_InRange";

test("it should return if the date isnt between the given dates ", () => {
  expect(
    If_In_Range(
      new Date("2022-01-01 12:00:00"),
      new Date("2022-01-03 12:30:01"),
      new Date("2022-01-03 12:30:01")
    )
  ).toBe(false);
});
