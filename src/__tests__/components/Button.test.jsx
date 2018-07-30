import "../../lib/spec_helper";
import Button from "../../components/Button";

describe("Button", () => {
  let label;
  let name;
  let type;
  const spy = sinon.spy();
  const wrapper = () =>
    mount(<Button label={label} name={name} type={type} click={spy} />);

  describe("when given the props", () => {
    beforeEach(() => {
      label = "A";
      name = "Btn";
      type = "number";
    });
    it("renders the right props", () => {
      const button = wrapper()
        .find("Button")
        .props();
      expect(button.type).toEqual("number");
      expect(button.label).toEqual("A");
      expect(button.name).toEqual("Btn");
    });

    it("displays the right label", () => {
      expect(wrapper().text()).toEqual("A");
    });

    it("calls click when clicked", () => {
      wrapper()
        .find("div")
        .simulate("click");
      expect(spy.calledOnce).toBe(true);
      expect(spy.calledWithExactly({ name, label, type })).toBe(true);
    });
  });
});
