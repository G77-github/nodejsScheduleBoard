const express = require("express");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));


app.use(express.urlencoded({extended: true}));

var indexRouter = require("./router/index");
var resultRouter = require("./router/result");
var uploadRouter = require("./router/upload");



app.use("/", indexRouter);
app.use("/", resultRouter);
app.use("/", uploadRouter);


//라우터로 바꿈
/*
app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.get("/result", (req,res)=>{
    var val1 = req.query.val1;
    var val2 = req.query.val2;
    res.render("result.ejs", {"val1": val1, "val2": val2});
});

app.post("/result", (req,res)=>{
    var val1 = req.body.val1;
    var val2 = req.body.val2;
    res.render("result.ejs",{
        "val1": val1,
        "val2": val2,
    });
});
*/


app.listen(5222, ()=>{
    console.log("서버시작");
});
