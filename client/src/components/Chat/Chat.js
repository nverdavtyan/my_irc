import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import { useLocation} from 'react-router-dom';
import "./Chat.css";

let socket;

const Chat = () => { 
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://peaceful-river-71218.herokuapp.com/";
  const { search } = useLocation();
  const [rooms, setRooms] = useState([]);
  console.log(rooms)
  useEffect(() => {
    // location.search will give the URL after the "chat" part (?user=xxxx&room=xxxx) and store it as an object with consts user/room
    const { name, room } = queryString.parse(search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    
    console.log(ENDPOINT, search)
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT,search]);

  useEffect(() => {
    socket.on("getAllRooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [rooms]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };


  return (
    <div className="chatOuterContainer">
      <div className="chatContainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
      <ul className="">
                {rooms.map((room) => {
                  return (
                    <li key={room.id} >
                      {room.id}
                    </li>
                  );
                })}
              </ul>
    </div>
  );
};

export default Chat;
