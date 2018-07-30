import "../../lib/spec_helper";
import Header from "../../components/Header";

it("formats temp correctly", () => {
  const title = "Calculator";
  const wrapper = shallow(<Header />);
  expect(wrapper.find(".header").text()).toEqual(title);
});
