import React, { useState, useEffect } from "react";

import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "../../../firebase";
import { Link } from "react-router-dom";

export default function SideBarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  // const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapShot) =>
          setMessages(snapShot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const addChat = () => {
    const room = prompt("Enter the room name");

    if (room) {
      // setRoomName(room);

      db.collection("rooms").add({
        name: room
      });
    }
  };

  return !addNewChat ? (
    <div className="sidebarchat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

      <Link to={`/room/${id}`}>
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </Link>
    </div>
  ) : (
    <div className="sidebarchat" onClick={addChat}>
      <h2>ADD NEW CHAT</h2>
    </div>
  );
}
