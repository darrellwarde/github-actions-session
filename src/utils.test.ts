import { reverseString } from "./utils";

test("reverseString reverses a string", () => {
  expect(reverseString("test")).toEqual("tset");
});
