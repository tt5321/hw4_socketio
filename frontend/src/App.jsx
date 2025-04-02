import { useState, useEffect } from "react";
import socket from "./socket/MySocket.js";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentOpt, setCurrentOpt] = useState("All");

  const handleSendMessage = (e) => {
    e.preventDefault()
    const input = e.target.msg;
    const message = input.value;
    socket.emit("message", message, currentOpt); // Send the message and the selected user to the server
    input.value = "";
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      const time = new Date().toLocaleTimeString();
      const fullMsg = msg + " [" + time + "]"; // Add the timestamp to the message
      console.log("Message received:", fullMsg); // Log the message to the console
      setMessages((prevMessages) => [...prevMessages, fullMsg]);
    });

    socket.on("users", (users) => {
      console.log("Users connected:", users); // Log the users to the console
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Socket.IO Chat</h1>
      <h2>Message History</h2>
      <ul>  
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h2>Send Message:</h2>
      <form id="form" onSubmit={handleSendMessage} >
        <select id="select" onChange={(e) => setCurrentOpt(e.target.value)}>
          <option value="All">All</option>
          {users.filter(usr => usr !== socket.id).map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>
        <input id="input" autocomplete="off" name="msg" />
        <button type="submit">Send</button>
      </form>
      <br />
      <text>* I am: {socket.id}</text>
      <h2>Online Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </>
  )
}

export default App
