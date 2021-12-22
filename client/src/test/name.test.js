import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../redux/store";
import Name from "../Components/name";
import Room from "../Components/room";
import Game from "../Components/game";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

describe("Name", () => {
  const store = createStore(rootReducer, {
    sockets: { userexists: null },
  });

  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Name data={{ username: "", setusername: () => {}, clicked: 0, setclicked: () => {} }} />
      </Provider>
    );
    expect(wrapper.find(Name).length).toEqual(1);
  });
});
