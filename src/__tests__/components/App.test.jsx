import "../../lib/spec_helper";
import App from "../../components/App";

describe("App", () => {
  const wrapper = mount(<App />);
  const button = { name: "one", label: "1", type: "number" };

  describe("when rendered", () => {
    it("renders the Header component", () => {
      expect(wrapper.find("Header")).toHaveLength(1);
      expect(wrapper.find("Header").text()).toEqual("Calculator");
    });
    it("renders the Display component", () => {
      expect(wrapper.find("Display")).toHaveLength(1);
    });
    it("renders the Buttons component", () => {
      expect(wrapper.find("Buttons")).toHaveLength(1);
    });
  });

  it("calls click on clicked", () => {
    const instance = wrapper.instance();
    expect(wrapper.state("calculation")).toEqual("");
    instance.handleClick(button);
    expect(wrapper.state("calculation")).toEqual("1");
  });

  describe("Snapshot", () => {
    it("matches the existing snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
