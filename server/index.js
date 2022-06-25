const express = require("express");
const http = require("http");
const serverless = require('serverless-http');
const router = express.Router();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users.js");
const socketio = require("socket.io");



const PORT = process.env.PORT || 5000;

//const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
  cors: {
    origin: "*",
  },
});



io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    // Welcoming message when you create a room
    socket.emit("message", {
      user: "Admin",
      text: `${user.name}, welcome to the room ${user.room}.`,
    });
    console.log(socket.rooms);
    // Send a broadcast message to all the users in the room
    socket.broadcast.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has joined the room !`,
    });
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),

      
    });


    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left the room.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});


app.use(router);
app.get("/", (req, res) => {
  res.json("Server is running");
});
module.exports.handler = serverless(app);


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
