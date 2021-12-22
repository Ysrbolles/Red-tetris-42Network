import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
