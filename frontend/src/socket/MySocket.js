import { io } from "socket.io-client"

const socket = io("http://localhost:3000")
socket.on("connect", () => {
  console.log("Connected to server")
})
socket.on("disconnect", () => {
  console.log("Disconnected from server")
})
socket.on("error", (err) => {
  console.error("Error:", err)
})

export default socket;