import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  console.log(onlineUsers)
  return onlineUsers.find((user) => user.username === username);
  
};

io.on("connection", (socket) => {

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    console.log("소케또 아이디", socket.id)
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log("리시바",receiver)
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {});
  removeUser(socket.id);
});
io.listen(5034);
