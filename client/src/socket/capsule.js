import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  StartGame,
  newTetriminos,
  getRoomPlayerslist,
  getChatMessages,
  clearAllState,
  setStages,
  updateStages,
  userExists,
  deleteUserfromStages,
  updateRoomList,
  GameFinished,
  ClearStateAfterLeavedRoom,
  updateRoomData,
  getRooms,
  addWall,
} from "../redux/actions/sockets/socketsActions";
import { socket } from "./socket";
import { toast } from "react-toastify";

const Socketscapsule = (props) => {
  const { tetriminos, Stages, roomname } = props;

  useEffect(() => {
    //initial Socket connection
    socket.on("connect", () => {
      try {
        props.getRooms();
      }
      catch { }
    });

    socket.on("disconnect", () => {
      try {
        window.location.href = `${window.location.origin}/`;
        props.clearAllState();
      }
      catch { }
    });

    socket.on("clearStages", (data) => {
      props.deleteUserfromStages(data.username, Stages);
    });

    // User Already Exists
    socket.on("useralready_exist", (res) => {
      props.userExists(res.res);
    });

    // connot add this user from URL
    socket.on("cannot_add_user", (res) => {
      if (res.res) {
        window.location.href = `${window.location.origin}/`;
        toast("This user is already exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    // listen for starting the Game
    socket.on("startGame", (tetris) => {
      props.StartGame(tetris);
    });
    // get the new tetriminos from the server and update the state with it
    socket.on("newTetriminos", (tetris) => {
      props.newTetriminos(tetris, tetriminos);
    });
    // get players Stages State
    socket.on("getstages", (stage) => {
      props.setStages(Stages, stage, roomname);
    });
    // Add a wall to the other players Stages
    socket.on("addWall", () => {
      props.addWall({ wall: true });
    });
    // Update the Stages State
    socket.on("updateStages", (stages) => {
      props.updateStages(stages);
    });
    // Listen for the room Players list
    socket.on("roomPlayers", (playersList) => {
      props.getRoomPlayerslist(playersList);
    });
    // Update Room data
    socket.on("update_room_data", (room) => {
      props.updateRoomData(room);
    });
    // Chat Listener
    socket.on("chat", (message) => {
      props.getChatMessages(message);
    });
    // Just admin can start the game
    socket.on("wait_admin", () => {
      toast("Wait until admin start the game", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    // joined room access
    socket.on("joined_denided", () => {
      window.location.href = `${window.location.origin}/`;
    });
    // Update rooms details
    socket.on("update_rooms", async (rooms) => {
      try {
        props.updateRoomList(rooms);
      }
      catch { }
    });
    // Game finished
    socket.on("Game_finish", (data) => {
      props.GameFinished();
      toast(`You are the winer ${data.winer.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    // leaved room
    socket.on("leaved_room", () => {
      props.ClearStateAfterLeavedRoom();
    });
    //Room Already Exists
    socket.on("room_exist", () => {
      window.location.href = `${window.location.origin}/`;
    })
    // Clean up the event listeners
    return () => {
      socket.off("leaved_room");
      socket.off("useralready_exist");
      socket.off("startGame");
      socket.off("newTetriminos");
      socket.off("getstages");
      socket.off("roomPlayers");
      socket.off("chat");
      socket.off("update_rooms");
      socket.off("joined_denided");
      socket.off("wait_admin");
      socket.off("Game_finish");
      socket.off("update_room_data");
      socket.off("addWall");
      socket.off("room_exist");
      socket.off("disconnect");
    };
  }, [props]);

  return props.children;
};

const mapStateToProps = (state) => ({
  sockets: state.sockets,
  tetriminos: state.sockets.tetriminos,
  Stages: state.sockets.Stages,
  roomname: state.sockets.roomname,
});

const mapDispatchToProps = {
  StartGame,
  newTetriminos,
  getRoomPlayerslist,
  getChatMessages,
  clearAllState,
  setStages,
  updateStages,
  userExists,
  deleteUserfromStages,
  updateRoomList,
  GameFinished,
  ClearStateAfterLeavedRoom,
  updateRoomData,
  getRooms,
  addWall,
};

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule);
