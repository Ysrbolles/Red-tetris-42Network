const initialState = {
  userexists: null,
  socket: null,
  userName: "",
  roomname: "",
  roomData: [],
  connected: false,
  tetriminos: [],
  rooms: [],
  roomPlayers: [],
  chat: [],
  Stages: [],
  GameOver: false,
  GameFinished: false,
  wall: false,
};

export const sockets = (state = initialState, action) => {
  switch (action.type) {
    case "SOCKET_CONNECT":
      return {
        ...state,
        connected: true,
        socket: action.socket,
      };
    case "SOCKET_DISCONNECT":
      return {
        ...state,
        connected: false,
        socket: null,
      };
    case "NEW_TETRIMINOS":
      return {
        ...state,
        tetriminos: action.tetriminos,
      };
    case "USER_EXISTS":
      return { ...state, userexists: action.userexists };
    case "NEW_PLAYER":
      return { ...state, userName: action.userName };
    case "NEW_ROOM":
      return { ...state, roomname: action.roomname };
    case "UPDATE_ROOM_DATA":
      return {
        ...state,
        roomData: action.room,
      };
    case "START_GAME":
      return {
        ...state,
        GameOver: false,
        GameFinished: false,
        tetriminos: action.tetriminos,
      };
    case "GAME_OVER":
      return {
        ...state,
        GameOver: true,
      };
    case "SET_ROOMS":
      return {
        ...state,
        rooms: action.rooms,
      };
    case "ADD_STAGES": {
      return { ...state, Stages: action.Stages };
    }
    case "UPDATE_STAGES":
      return { ...state, Stages: action.Stages };
    case "ROOM_PLAYERS_LIST":
      return {
        ...state,
        roomPlayers: action.roomPlayers,
      };
    case "CHAT_MESSAGES":
      return {
        ...state,
        chat: [...state.chat, action.messages],
      };
    case "CLEAR_CHAT_MESSAGES":
      return {
        ...state,
        chat: [],
        roomData: [],
      };

    case "CLEAR_ALL_STATE":
      return {
        ...state,
        userName: "",
        tetriminos: [],
        rooms: [],
        roomPlayers: [],
        chat: [],
        Stages: [],
        wall: false,
      };
    case "GAME_FINISHED":
      return {
        ...state,
        GameFinished: true,
        wall: false,
        tetriminos: [],
        roomPlayers: [],
      };
    case "CLEAR_STATE_LEAVED_ROOM":
      return {
        ...state,
        roomPlayers: [],
        chat: [],
        Stages: [],
        tetriminos: [],
        GameFinished: false,
        roomname: "",
      };
    case "ADD_WALL":
      return {
        ...state,
        wall: action.wall,
      };
    default:
      return state;
  }
};
