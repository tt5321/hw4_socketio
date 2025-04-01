import { useState, useEffect } from "react";
import socket from "./socket/MySocket.js";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault()
    const input = e.target.msg;
    const message = input.value;
    socket.emit("message", message);
    input.value = "";
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
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
      <ul id="messages"></ul>
      <form id="form" onSubmit={handleSendMessage} >
        <input id="input" autocomplete="off" name="msg" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
