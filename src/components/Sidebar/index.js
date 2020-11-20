import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";

import "./sidebar.css";
import SideBarChat from "./SidebarChat";
import db from "../../firebase";
import { UseStateValue } from "../../stateProvider";

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = UseStateValue();

  useEffect(() => {
    //for optimization
    const unsubscribe = db.collection("rooms").onSnapshot((snapShot) => {
      setRooms(snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="side__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search here ..." className="input" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideBarChat addNewChat />

        {rooms.map(({ id, data }) => (
          <SideBarChat key={id} id={id} name={data.name} />
        ))}
      </div>
    </div>
  );
}
