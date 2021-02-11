import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { afterPostMessage } from "../../../action/postMessage";
import { connect } from "react-redux";
import Messages from "../../Messages/Messages";
import InfoBar from "../../InfoBar/InfoBar";
import Input from "../../Input/Input";
import "./../Chat.css";
import ChatLIst from "./ChatList";

let socket;

const PrivateChat = ({
  location,
  afterPostMessage,
  currentUsers,
  authToken,
}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/'
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);
    // getRoomData(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    console.log(currentUsers)
    const users = _getUsersDate(currentUsers);
    setUsers(users);
    // socket.on("output data", (currentUsers) => {
    //   console.log(currentUsers);
    //   afterPostMessage(currentUsers);
     

    //   console.log(users);
    //   setUsers(users);
    // });

    socket.on("roomData", ({ users }) => {
      console.log("HASHIKA ");
      //setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, room, () => setMessage(""));
    }
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <ChatLIst users={users} />
    </div>
  );
};

const _getUsersDate = (currentUsers) => {
  let users = [];
  currentUsers.forEach(currentUser => {
    let message = {
      user: currentUser.user.name,
    };
    var name = message.user;
    users.push(name);
  });
  return users;
  // for (let i = 0; i < currentUsers.length; i++) {
  //   console.log(currentUsers[i].user.name);
  //   let message = {
  //     // text: currentUsers[i].message,
  //     user: currentUsers[i].user.name,
  //   };
  //   //setMessages(messages => [ ...messages,message ])
  //   var name = message.user;
  //   return users.push(name);
  // }
};

const mapStateToProps = (state) => ({
  chats: state.postMessage.chats,
  authToken: state.auth.data,
  currentUsers: state.getRoomData.data
});

export default connect(mapStateToProps, {
  afterPostMessage,
})(PrivateChat);
