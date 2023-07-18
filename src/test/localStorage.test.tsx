import { getLocalStorageValue } from "../utils/localStorage";

describe("getLocalStorageValue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty array if local storage value is null", () => {
    const key = "testKey";
    const result = getLocalStorageValue(key);
    expect(result).toEqual([]);
  });

  it("should parse and return array if local storage value is not null", () => {
    const key = "testKey";
    const value = JSON.stringify(["testValue"]);
    localStorage.setItem(key, value);
    const result = getLocalStorageValue(key);
    expect(result).toEqual(["testValue"]);
  });
});
