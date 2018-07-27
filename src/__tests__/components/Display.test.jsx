import "../../config/spec_helper";
import Display from "../../components/Display";

describe("Display", () => {
  const wrapper = mount(<Display />);

  describe("when given the props", () => {
    it("renders the right display", () => {
      expect(wrapper.find(".display")).toHaveLength(1);
    });
  });
});
