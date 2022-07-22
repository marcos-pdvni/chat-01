const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const User = require("./model/user");
const Message = require("./model/messages");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");

// routes
const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");
const reset = require("./routes/reset");
const auth = require("./routes/auth");
const application = require("./routes/application");
const logout = require("./routes/logout");

app.use(logout);
app.use(application);
app.use(auth);
app.use(reset);
app.use(users);
app.use(register);
app.use(login);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

io.on("connection", async (socket) => {
  const allMessages = await Message.find();

  socket.emit("prevMessages", allMessages);

  socket.on("message", async (data) => {
    const { creator, message, imageUrl } = data;
    const allowedUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
    const allowedImage = allowedUrl.exec(imageUrl);
    try {
      const user = await User.findOne({
        username: creator,
      });

      const newMessage = await Message.create({
        creator: user._id,
        message: message,
        imageUrl: allowedImage ? imageUrl : null,
        nameCreator: user.username,
      });

      await newMessage.save();

      socket.broadcast.emit("newMessage", {
        creator: creator,
        message: message,
        imageUrl,
      });

      console.log("Message saved!");
    } catch (error) {
      console.log(error);
    }
  });
});

const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://marcos:${process.env.DB_PASS}@cluster0.fe4kkjn.mongodb.net/chat?retryWrites=true&w=majority`,
  () => {
    console.log("Mongo connected.");
    server.listen(port, () => {
      console.log("Server runnin on port", port);
    });
  }
);
