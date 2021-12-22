import { mount } from "enzyme";
import { Provider } from "react-redux";
import Chat from "../Components/chat";
import store from "../redux/store";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

it("should render components without crashing", () => {
  const store = createStore(rootReducer, {
    sockets: { roomPlayers: [""], chat: [""] },
  });
  const wrapper = mount(
    <Provider store={store}>
      <Chat
        data={{
          username: "khaoula",
          setusername: () => {},
          roomName: "roomname",
          setroomName: () => {},
          submited: false,
          setsubmited: () => {},
        }}
      />
    </Provider>
  );
  wrapper.find(".send-icon").simulate("click");
  wrapper.find(".input-message").simulate("click");
  wrapper.find(".input-message").simulate("change", { target: { value: "test" } });
  wrapper.find(".input-form").simulate("submit");
});
