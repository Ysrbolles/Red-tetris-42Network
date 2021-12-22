import { useEffect, useState } from "react";
import "../scss/home.scss";
import Name from "../Components/name";
import Room from "../Components/room";
import Game from "../Components/game";
import { ToastContainer } from "react-toastify";
import { socket } from "../socket/socket";
import { connect } from "react-redux";
import { clearChatMessages, newPLayer, newRoom, newTetriminos } from "../redux/actions/sockets/socketsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import sound from "../assets/tetrisSound.mp3";

function Home(props) {
  const { clearChatMessages, stages, newPLayer, newRoom, newTetriminos } = props;
  const [username, setusername] = useState("");
  const [clicked, setclicked] = useState(0);
  const [created, setcreated] = useState(false);
  const [roomName, setroomName] = useState("");
  const [mode, setmode] = useState("solo");
  const [start, setstart] = useState(true);
  const [Sound, setSound] = useState(false);
  const [audio] = useState(new Audio(sound));

  //Play sound when its ended
  useEffect(() => {
    audio.addEventListener("ended", () => audio.play());
  }, [audio]);

  //Handle window location hash
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const regex = /^[a-zA-Z0-9]{1,12}[[][a-zA-Z0-9]{1,12}]$/;
      if (regex.test(hash)) {
        //Hash valid
        let i = 0;
        while (i < hash.length) {
          if (hash[i] === "[") {
            setroomName(hash.substring(0, i));
            setusername(hash.substring(i + 1, hash.length - 1));
            setclicked(2);
            setcreated(true);
            if (username && roomName) {
              socket.emit("create_user_room", { username, room: roomName, stages });
              newPLayer(username);
              newRoom(roomName);
            }
            break;
          }
          i++;
        }
      } else {
        //Hash is not valid
        if (clicked === 0) window.location.href = `${window.location.origin}/#`;
      }
    } else {
      //No hash
      if (username && roomName && created) {
        window.location.href = `${window.location.origin}/#${roomName}[${username}]`;
      }
    }
  }, [roomName, username, created, clicked]);

  return (
    <div className="home">
      <div className="navigation">
        <div style={{ width: "33%" }}>
          {created ? (
            <button
              className="home-button"
              onClick={() => {
                newTetriminos([], []);
                setstart(true);
                setcreated(false);
                setclicked(1);
                setroomName("");
                window.location.href = `${window.location.origin}/#`;
                socket.emit("leaveRoom");
                clearChatMessages();
              }}
            >
              home
            </button>
          ) : (
            ""
          )}
        </div>
        <h1 className="title">Tetris</h1>
        <div className="sound-div" style={{ width: "33%" }}>
          {!start ? (
            Sound && audio.play() ? (
              <div
                className="sound-button"
                onClick={() => {
                  setSound(false);
                  audio.pause();
                }}
              >
                <FontAwesomeIcon icon={faVolumeUp} className="sound-icon" />
              </div>
            ) : (
              <div
                className="sound-button-mute"
                onClick={() => {
                  setSound(true);
                  audio.play();
                }}
              >
                <FontAwesomeIcon icon={faVolumeMute} className="sound-icon" />
              </div>
            )
          ) : (
            audio.pause()
          )}
          <div className="name-player">{clicked ? username : ""}</div>
        </div>
      </div>
      {clicked === 1 ? (
        <Room data={{ created, setcreated, roomName, setroomName, mode, start }} />
      ) : clicked === 0 ? (
        <Name data={{ username, setusername, clicked, setclicked }} />
      ) : (
        ""
      )}
      {created ? (
        <Game
          data={{
            clicked,
            setclicked,
            username,
            setusername,
            roomName,
            setroomName,
            setmode,
            start,
            setstart,
            setSound,
            audio,
          }}
        />
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
}

const mapStatetoProps = (state) => ({
  stages: state.sockets.stages,
  tetriminos: state.sockets.tetriminos,
});

const mapDispatchtoProps = { clearChatMessages, newPLayer, newRoom, newTetriminos };
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
