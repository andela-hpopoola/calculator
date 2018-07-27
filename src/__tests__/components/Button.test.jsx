import "../../config/spec_helper";
import Button from "../../components/Button";

describe("Button", () => {
  let label;
  const wrapper = () => shallow(<Button label={label} />);

  describe("when given the props", () => {
    beforeEach(() => {
      label = "A";
    });
    it("renders the right props", () => {
      expect(wrapper().text()).toEqual("A");
    });
  });
});
