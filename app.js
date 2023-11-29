const express = require("express");
const expressSession = require("./configs/session");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.json());
app.use(expressSession());
app.use(express.urlencoded({extended: true}));

var indexRouter = require("./router/index");
var boardRouter = require("./router/board");
var scheduleRouter = require("./router/schedule");
var loginRouter = require("./router/login")
var chatRouter = require("./router/chat")(io);

app.use("/", indexRouter);
app.use("/", boardRouter);
app.use("/", scheduleRouter);
app.use("/", loginRouter);
app.use("/", chatRouter);


http.listen(5222, ()=>{
    console.log("서버시작");
});