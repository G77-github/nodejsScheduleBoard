const express = require("express");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.listen(5222, ()=>{
    console.log("서버시작");
});
