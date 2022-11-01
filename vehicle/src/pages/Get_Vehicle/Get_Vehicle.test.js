import { expect, test } from "@jest/globals";
import { If_In_Range } from "./Get_vehicle";
import {} from "/Main_Menu/0/Add_Vehicle";

test("it should return if the date isnt between the given dates ", () => {
  expect(
    If_In_Range(
      new Date("10/27/2022, 3:14:00 PM"),
      new Date("10/26/2022, 9:14:00 PM "),
      new Date("10/26/2022, 11:05:00 AM")
    )
  ).toBe(false);
});
