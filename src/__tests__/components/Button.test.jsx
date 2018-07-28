import "../../config/spec_helper";
import Button from "../../components/Button";

describe("Button", () => {
  let label;
  let name;
  let color;
  const spy = sinon.spy();
  const wrapper = () =>
    mount(<Button label={label} name={name} color={color} click={spy} />);

  describe("when given the props", () => {
    beforeEach(() => {
      label = "A";
      name = "Btn";
      color = "white";
    });
    it("renders the right props", () => {
      const button = wrapper()
        .find("Button")
        .props();
      expect(button.color).toEqual("white");
      expect(button.label).toEqual("A");
      expect(button.name).toEqual("Btn");
    });

    it("displays the right label", () => {
      expect(wrapper().text()).toEqual("A");
    });

    it("calls click on clicked", () => {
      wrapper()
        .find("div")
        .simulate("click");
      expect(spy.calledOnce).toBe(true);
      expect(spy.calledWithExactly(name, label)).toBe(true);
    });
  });
});
