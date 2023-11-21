const express = require("express");
const expressSession = require("./configs/session");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.json());
app.use(expressSession());


app.use(express.urlencoded({extended: true}));

var indexRouter = require("./router/index");
var resultRouter = require("./router/result");
var uploadRouter = require("./router/upload");
var boardRouter = require("./router/board");
var scheduleRouter = require("./router/schedule");
var loginRouter = require("./router/login")


app.use("/", indexRouter);
app.use("/", resultRouter);
app.use("/", uploadRouter);
app.use("/", boardRouter);
app.use("/schedule", scheduleRouter);
app.use("/", loginRouter);


app.listen(5222, ()=>{
    console.log("서버시작");
});
