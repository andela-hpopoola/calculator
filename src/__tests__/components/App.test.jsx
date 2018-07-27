import "../../config/spec_helper";
import App from "../../components/App";

describe("App", () => {
  const wrapper = mount(<App />);

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

  describe("Snapshot", () => {
    it("matches the existing snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
