const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
import { shallow, mount } from "enzyme";
import Socketscapsule from "../socket/capsule";
import Home from "../Components/home";
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";
import exp from "constants";

describe("my awesome project", () => {
  const store = createStore(rootReducer, {
    sockets: { roomPlayers: [""], chat: [""] },
  });

  let io, serverSocket, clientSocket;


  beforeAll((done) => {
    const wrapper = mount(<Provider store={store}><Socketscapsule>
      <Home />
    </Socketscapsule></Provider>);
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  test("Start the Game", (done) => {
    serverSocket.on("startGame", (data) => {
      expect(data.tetris).toStrictEqual(["T","T","S","Z","L","I","O","S", "L","O"])
      done();
    });
    clientSocket.emit("startGame", {tetris: ["T","T","S","Z","L","I","O","S", "L","O"]});
  })
  test("clear Stage", (done) => {
    clientSocket.on("clearStages", (data) => {
      expect(data.username).toEqual("Hello");
      done();
    });
    serverSocket.emit("clearStages", { username: "Hello" });
  });
  test("User already exists", (done) => {
    clientSocket.on("useralready_exist", (res) => {
      expect(res.res).toBe(true);
      done();
    });
    serverSocket.emit("useralready_exist", { res: true });
  });
  test("Room Chat", (done) => {
    clientSocket.on("chat", (data) => {
      expect(data.message).toBe("Hello");
      done();
    });
    serverSocket.emit("chat", { message: "Hello" });
  });
  test("joined denided to room", (done) => {
    clientSocket.on("joined_denided", () => {
      expect(window.location.href).toBe(`${window.location.origin}/`);
      done();
    });
    serverSocket.emit("joined_denided");
  });
  test("add Wall", (done) => {
    clientSocket.on("addWall", () => {
      done();
    });
    serverSocket.emit("addWall");
  });
  test("Wait Admin", (done) => {
    clientSocket.on("wait_admin", () => {
      done();
    });
    serverSocket.emit("wait_admin");
  });
  test("cannot_add_user", (done) => {
    clientSocket.on("cannot_add_user", (res) => {
      expect(res.res).toBe(true);
      done();
    });
    serverSocket.emit("cannot_add_user", { res: true });
  });
  test("update rooms", (done) => {
    clientSocket.on("update_rooms", (data) => {
      expect(data.rooms).toStrictEqual([{ name: "room", state: false, mode: "solo", players: 1, maxplayers: 1 }, { name: "room2", state: false, mode: "solo", players: 1, maxplayers: 1 }]);
      done();
    });
    serverSocket.emit("update_rooms", { rooms: [{ name: "room", state: false, mode: "solo", players: 1, maxplayers: 1 }, { name: "room2", state: false, mode: "solo", players: 1, maxplayers: 1 }] });
  });
  test("Game Finished and the winner is", (done) => {
    clientSocket.on("Game_finish", (data) => {
      expect(data.winer.name).toEqual("Hello");
      done();
    });
    serverSocket.emit("Game_finish", { winer: { name: "Hello" } });
  });

  test("Player Leaving room", (done) => {
    clientSocket.on("leaved_room", () => {
      expect().toBe();
      done();
    });
    serverSocket.emit("leaved_room");
  });
   test("update room data", (done) => {
    clientSocket.on("update_room_data", (data) => {
      expect(data.room).toStrictEqual({name: "room", state: false, mode: "solo", players: 1, maxplayers: 1});
      done();
    });
    serverSocket.emit("update_room_data", {room: {name: "room", state: false, mode: "solo", players: 1, maxplayers: 1}});
  });


  afterAll(() => {
    io.close();
    clientSocket.close();
  });

});