# hw4 - socketio
Implement Socket IO with React/vite to achieve a basic chat application

## Setting Up
1. Download the zip file and unzip
2. Install modules and build
```
cd hw4_socketio-main
npm install
cd frontend
npm install
npm run build
```
3. To start running the web server:
```
cd ..
npm start
```
4. Visit http://localhost:3000/

## Features
- Send messages to all users
- Send messages to a specific user (except "me")
- Display message history
- Display online users

## Implementations
- Re-implement the code with frontend as React19 + vite for steps 1 to 5 of https://socket.io/docs/v4/tutorial/step-5.
- Add sender and message receive timestamps:
    - The server logs the timestamp when the message is received from the client
    - The server adds the sender’s socket ID to the message, then sends it to the client(s)
    - Clients log and display the message (with the sender’s socket ID) and the timestamp when the message is received from the server
- Add creative features (see below)

## Creative Features
- Display a list of online users by their socket IDs: Whenever a new user connects or an existing user disconnects, the list will be updated in real-time for all connected clients.
- Send private messages to a single user: Users can select a recipient from a dropdown menu, with options including 'All' (to broadcast to all users) and all other users except themselves. The private messages will only be visible to the sender and the selected recipient on their respective webpages.

## Videos
- Demo video: https://youtu.be/9XNdOgOvIF0
- Code explanation video: https://youtu.be/2S2yuJDUoss

## Use of AI
1. Prompt: Using socket IO, I want to send a message back to the sender. What's wrong with my code?
```
            socket.to(currentOpt).emit('message', message); 
            socket.to(socket.id).emit('message',message);
```
- Model: ChatGPT 4o mini
- AI response: Use socket.emit() instead of socket.to(socket.id).emit()
- Use: To debug my code of sending a private message back to the sender ("socket.on('message',. ..)" in index.js).

2. Use ChatGPT (4o mini) to improve the clarity and phrasing of the expressions in this README.md.

## Author
Tiantian Ma