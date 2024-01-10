import { getItemKey } from "../util";

describe("test for getItemKey", () => {
  test("should only return array of string", () => {
    const data = ["apple", "banana", "mango"];
    const result = data.map(getItemKey);
    expect(result).toEqual(result);
  });
});
