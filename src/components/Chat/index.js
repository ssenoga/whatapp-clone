import React, { useState, useEffect } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import firebase from "firebase";

import { useParams } from "react-router-dom";
import db from "../../firebase";

import { UseStateValue } from "../../stateProvider";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  const [{ user }] = UseStateValue();

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .onSnapshot((snapShot) => setRoomName(snapShot.data().name));

      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapShot) =>
          setMessages(snapShot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(id).collection("messages").add({
      name: user.displayName,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMessage("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages?.map(({ name, message, timestamp = Date() }) => (
          <p
            className={`chat__message ${
              name === user.displayName && "chat__reciever"
            }`}>
            {name === user.displayName ? null : (
              <span className="chat__name">{name}</span>
            )}
            {message}
            <span className="chat__timestamp">
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type amessage.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
