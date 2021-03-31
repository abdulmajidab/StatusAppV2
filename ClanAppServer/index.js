const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const db = require('./DB/db');

const config =require("config");
const { saveUserLastSeen} =require("./Controller/lastSeenController");
// const cors =require("cors");
// Database Connection Function
db();

// Router
const UserRoute = require('./Router/UserRoute');
const ChatRouter = require('./Router/chatRouter');
const roomRouter = require('./Router/roomRouter');
const statusRouter = require('./Router/statusRouter');


//Middlewares
app.use(express.json());
app.use('/api/users',UserRoute);
app.use('/api/chat',ChatRouter);
app.use("/api/room", roomRouter);
app.use("/api/status", statusRouter);

//use config module to get the privatekey, if no private key set, end the application
// if (!config.get("privateKey")) {
//   console.error("FATAL ERROR: privateKey is not defined.");
//   process.exit(1);
// }
//index Route
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// Server Listener
http.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`);
})

socket.on("connection", (socketConnection) => {
  console.log("Socket.io connected");

  socketConnection.on("CHAT_LIST", (msg) => {
    // console.log("CHAT_LIST == ", msg);

    // Save User unread count to Chat List table
    // saveUserUnreadCount(msg);

    socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("CHAT_ROOM", (msg) => {
    // console.log("CHAT_ROOM == ", msg);
    socket.emit("CHAT_ROOM", msg);
    // socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("SCAN_QR_CODE", (msg) => {
    // console.log("SCAN_QR_CODE == ", msg);
    socket.emit("SCAN_QR_CODE", msg);
  });

  socketConnection.on("LAST_SEEN", (msg) => {
    // console.log("LAST_SEEN == ", msg);

    // Save User Last seen to Chat Room table
    saveUserLastSeen(msg);

    socket.emit("LAST_SEEN", msg);
  });

  socketConnection.on("USER_STATUS", (msg) => {
    // console.log("USER_STATUS == ", msg);
    socket.emit("USER_STATUS", msg);
  });
});



