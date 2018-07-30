import "../../lib/spec_helper";
import Buttons from "../../components/Buttons";

describe("Buttons", () => {
  const buttonList = [
    { name: "A", label: "A", type: "number" },
    { name: "B", label: "B", type: "number" }
  ];
  const wrapper = () =>
    mount(<Buttons buttonList={buttonList} onClick={() => {}} />);

  describe("when rendered", () => {
    it("has the right class names", () => {
      expect(wrapper().find(".container")).toHaveLength(1);
      expect(wrapper().find(".row")).toHaveLength(1);
    });

    it("renders the right buttonList", () => {
      expect(wrapper().find("Button")).toHaveLength(2);
      expect(
        wrapper()
          .find("Button")
          .at(1)
          .props().name
      ).toEqual(buttonList[1].name);
    });
    it("renders the right label", () => {
      const labels = wrapper()
        .find("Button")
        .map(button => button.text());
      expect(labels).toEqual(["A", "B"]);
    });
  });
});
