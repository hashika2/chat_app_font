import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import {afterPostMessage} from '../../action/postMessage';
import {connect} from 'react-redux';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { getRoomData } from '../../action/index';
import './Chat.css';

let socket;
const Chat = ({ location,afterPostMessage,chatData ,getRoomData}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/'
  const ENDPOINT ='localhost:5000'
  //const ENDPOINT= 'https://git.heroku.com/chat-app-my.git';

  useEffect(() => { 
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name)
    getRoomData(room);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages,message ])  
    });
    socket.on("roomData", ({ users }) => {
      console.log(users);
      setUsers(users);    
    });     
  }, []);

  useEffect(() => {
    socket.on("output message",chatLists => {
      afterPostMessage(chatLists);
      chatLists.map(chatList=>{
        var message = {
          text:chatList.message,
          user:chatList.name
        }
        setMessages(messages => [ ...messages,message ]) 
      })
    })
    
  },[])

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message,room, () => setMessage(''));
    }
  }
  const getData=(event) => {
    event.preventDefault();   
  }
  
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} getData={getData} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users = {users}/>
    </div>
  );
}
const mapStateToProps=state => ({
  chats:state.postMessage.chats,
  chatData:state.getRoomData.data
})

export default connect(mapStateToProps,{afterPostMessage, getRoomData})(Chat);
