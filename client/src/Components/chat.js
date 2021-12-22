import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../socket/socket";
import { connect } from "react-redux";
const ClickOutHandler = require("react-onclickout");

function Chat(props) {
  const { roomPlayers, chat } = props;
  const [message, setmessage] = useState("");

  const handleChange = (e) => {
    setmessage(e.target.value);
  };

  const insetMsg = (e) => {
    e.preventDefault();
    props.data.setsubmited(false);
    if (message) {
      if (message?.trim() !== "") {
        socket.emit("send_message", {
          name: props?.data?.username,
          message: message,
          room: props.data.roomName,
          type: "chat",
        });
      }
      setmessage("");
    }
  };
  return (
    <div className="chat-field">
      <div className="players">
        <div className="title-PM">
          <p>Players</p>
        </div>
        <div className="name-players">
          {roomPlayers?.length > 0 &&
            roomPlayers?.map((player, i) => {
              return <div key={i}>{player}</div>;
            })}
        </div>
      </div>
      <div className="messages">
        <div className="title-PM">
          <p>Messages</p>
        </div>
        <div className="messages-field">
          <div>
            {chat?.map((chatmsg, index) => {
              return chatmsg.type === "joined" ? (
                <div className="player-room" key={index}>
                  {chatmsg.message}
                </div>
              ) : chatmsg.type === "left" ? (
                <div className="player-left" key={index}>
                  {chatmsg.message}
                </div>
              ) : chatmsg.type === "admin" ? (
                <div className="player-admin" key={index}>
                  {chatmsg.message}
                </div>
              ) : (
                <div key={index}>
                  <div>
                    <div className="chatmsg">
                      <span className="chatsender">{chatmsg?.name} :</span>
                      <span> {chatmsg?.message}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ClickOutHandler onClickOut={() => props.data.setsubmited(true)}>
          <form className="input-form" onSubmit={insetMsg}>
            <input
              type="text"
              value={message}
              onClick={() => props.data.setsubmited(false)}
              placeholder="Write  a  message ..."
              className="input-message"
              onChange={(e) => handleChange(e)}
            />
            <div onClick={(e) => insetMsg(e)} className="send-icon">
              <FontAwesomeIcon icon={faPaperPlane} className="icon" />
            </div>
          </form>
        </ClickOutHandler>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  roomPlayers: state.sockets.roomPlayers,
  chat: state.sockets.chat,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
