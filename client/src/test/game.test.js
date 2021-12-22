import { mount } from "enzyme";
import { Provider } from "react-redux";
// import store from "../redux/store";
import Game from "../Components/game";
import NextPiece from "../Components/NextPiece";
import Board from "../Components/board";
import chat from "../Components/chat";
import PlayersStage from "../Components/PlayersStage";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

describe("Game", () => {
  const store = createStore(rootReducer, {
    sockets: { tetriminos: [], Stages: [{ stage: [[]], username: "" }], userName: "khaoula" },
  });
  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Game
          data={{
            clicked: 1,
            setclicked: () => {},
            username: "khaoula",
            setusername: () => {},
            roomName: "room",
            setroomName: () => {},
            setmode: () => {},
            start: true,
            setstart: () => {},
          }}
        />
      </Provider>
    );
    expect(wrapper.find(Board).length).toEqual(1);
    expect(wrapper.find(chat).length).toEqual(1);
    wrapper.find(".room-field").simulate("keypress", { key: "Enter" });
    wrapper.find(".room-field").simulate("keydown");
  });

  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Game
          data={{
            clicked: 1,
            setclicked: () => {},
            username: "khaoula",
            setusername: () => {},
            roomName: "room",
            setroomName: () => {},
            setmode: () => {},
            start: false,
            setstart: () => {},
          }}
        />
      </Provider>
    );
    expect(wrapper.find(Board).length).toEqual(1);
    expect(wrapper.find(chat).length).toEqual(1);
    expect(wrapper.find(NextPiece).length).toEqual(1);
    expect(wrapper.find(PlayersStage).length).toEqual(1);
  });
});
