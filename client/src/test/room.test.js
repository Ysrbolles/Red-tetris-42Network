import { mount } from "enzyme";
import { Provider } from "react-redux";
import Room from "../Components/room";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

it("should render components without crashing", () => {
  const store = createStore(rootReducer, {
    sockets: { rooms: ["f", "g"] },
  });

  const wrapper = mount(
    <Provider store={store}>
      <Room
        data={{
          created: false,
          setcreated: () => {},
          roomName: "roomname",
          setroomName: () => {},
          mode: "solo",
          start: true,
        }}
      />
    </Provider>
  );
  wrapper.find(".inputfield").simulate("change", { target: { value: "test" } });
  wrapper.find(".list-item").map((item) => {
    item.simulate("click");
    // wrapper.find("#id-name");
    // wrapper.find("#id-mode");
    // wrapper.find("#id-players");
    // wrapper.find("#id-status");
  });
  wrapper.find(".room-button").simulate("click");
});
