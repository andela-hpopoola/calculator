import "../../lib/spec_helper";
import Display from "../../components/Display";

describe("Display", () => {
  let result;
  let calculation;
  const wrapper = () =>
    mount(<Display result={result} calculation={calculation} />);

  describe("when given the props", () => {
    beforeEach(() => {
      calculation = "22 + 32";
      result = "54";
    });
    it("renders the display screen", () => {
      expect(wrapper().find(".display")).toHaveLength(1);
      expect(wrapper().find(".display__calculation")).toHaveLength(1);
      expect(wrapper().find(".display__result")).toHaveLength(1);
    });
    it("displays the right result", () => {
      expect(
        wrapper()
          .find(".display__calculation")
          .text()
      ).toEqual(calculation);
      expect(
        wrapper()
          .find(".display__result")
          .text()
      ).toEqual(result);
    });
  });
});
