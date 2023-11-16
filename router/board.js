const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.use(express.urlencoded({extended: true}));

router.get("/board/write", (req,res)=>{
    res.render("write.ejs");
});

router.post("/board/write", (req,res)=>{
    var writer = req.body.writer;
    var password = req.body.password;
    var title = req.body.title;
    var content = req.body.content;
    var data = [writer, password, title, content];
    var sql = "insert into board(id, writer, password, title, content, date) values(null,?,?,?,?,now())";
    db.query(sql, data, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect("/board/write");
        }
    });
});

module.exports = router;
