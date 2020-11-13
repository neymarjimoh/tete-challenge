import isEmpty from "../isEmpty";
const emptyObj = {};
const obj = {
  a: "abc",
  b: 123,
};

describe("Unit test isEmpty Checker", () => {
  it("should return true when object is empty", () => {
    const data = isEmpty(emptyObj);
    expect(data).toBeTruthy();
  });

  it("should return false when object is not empty", () => {
    const data = isEmpty(obj);
    expect(data).toBeFalsy();
  });
});
