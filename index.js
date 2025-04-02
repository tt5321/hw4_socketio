import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const ioServer = new Server(server);
let users = [];
app.use(express.static("frontend/dist"));

ioServer.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    users.push(socket.id); // Add the socket ID to the users array
    ioServer.emit('users', users); // Emit the updated users array to all clients

    socket.on('message', (message, currentOpt) => {
        const time = new Date().toLocaleTimeString();
        console.log('Message from client ' + socket.id + "to" + currentOpt + ": " + message + " [" + time + "]"); // Log the message with timestamp to the console
        const msgWithID = "User " + socket.id + ": " + message; // Add the usern socket ID to the message
        if (currentOpt === "All") {
            ioServer.emit('message', msgWithID); // Emit the message to all clients
        }
        else {
            socket.to(currentOpt).emit('message', msgWithID + " (private)"); // Emit the message to the selected user
            socket.emit('message', msgWithID + " (private -> " + currentOpt + ")"); // Emit the message to the sender as well
        }
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
        users = users.filter(usr => usr !== socket.id); // Remove the socket ID from the users array
        ioServer.emit('users', users); // Emit the updated users array to all clients
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});