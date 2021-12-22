import { shallow } from "enzyme";
import App from "../App";
import Home from "../components/Home";

describe("App", () => {
  it("should render home components without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Home).length).toEqual(1);
  });
});
