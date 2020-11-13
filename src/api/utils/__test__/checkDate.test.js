import validateDate from "../checkDate";

describe("Unit test isEmpty Checker", () => {
  it("should return true with valid date", () => {
    const data = validateDate("2020-12-12");
    expect(data).toBeTruthy();
  });

  it("should return false with invalid format", () => {
    const data = validateDate("22-12-444");
    expect(data).toBeFalsy();
  });

  it("should return false when date entered is in the past", () => {
    const data = validateDate("2019-03-12");
    expect(data).toBeFalsy();
  });
});
