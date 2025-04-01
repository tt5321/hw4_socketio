import { useState, useEffect } from "react";
import socket from "./socket/MySocket.js";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault()
    const input = e.target.msg;
    const message = "User " + socket.id + ": " + input.value; // Add the socket ID to the message
    socket.emit("message", message);
    input.value = "";
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      const time = new Date().toLocaleTimeString();
      console.log("Message received:", msg + " [" + time +"]"); // Log the message to the console
      const full_msg = " [" + time +"] " + msg; // Add the timestamp to the message
      setMessages((prevMessages) => [...prevMessages, full_msg]);
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
      <h3>Send Message:</h3>
      <form id="form" onSubmit={handleSendMessage} >
        <input id="input" autocomplete="off" name="msg" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
