const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.use(express.urlencoded({extended: true}));

router.get("/board/write", (req,res)=>{
    res.render("board/write.ejs", {
        username: req.session.username
    });
});

router.post("/board/write", (req,res)=>{
    var writer = req.body.writer;
    var title = req.body.title;
    var content = req.body.content;
    var data = [writer, title, content];
    var sql = "insert into board(id, writer, title, content, date) values(null,?,?,?,now())";
    db.query(sql, data, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect("/tab/about");
        }
    });
});

router.get("/board", (req,res)=>{
    var sql = "select * from board";
    db.query(sql, (err,rows)=>{
        res.render("board/index.ejs",{
            rows: rows
        });
    });
});

router.get("/board/view/:id", (req, res)=>{
    var id = req.params.id;
    var sql = "SELECT board.*, boardcomment.* FROM board LEFT JOIN boardcomment ON board.id = boardcomment.bid where board.id=?";
    db.query(sql, [id], (err, rows)=>{
        res.render("board/detail.ejs", {
            result: rows,
            username: req.session.username
        });
    });
});

router.post("/board/view/:id", (req,res)=>{
    var cwriter = req.body.cwriter;
    var bid = req.params.id;
    var ccontent = req.body.ccontent;
    var data = [cwriter, bid, ccontent];
    var sql = "insert into boardcomment(cid, cwriter, bid, ccontent, cdate) value(null,?,?,?,now())";
    db.query(sql, data, (err,result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect(`/board/view/${bid}`);
        }
    });
});

router.get("/board/modify/:id", (req,res)=>{
    var id = req.params.id;
    sql = "select * from board where id =?";
    db.query(sql, [id],(err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.render("board/modify.ejs", {
                result: result[0],
                username: req.session.username
            });
        }
    });
});

router.post("/board/modify/:id/ok", (req,res)=>{
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    
    var sql = "update board set title=?, content=? where id=?";
    var data = [title, content, id];

    db.query(sql, data, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect(`/board/view/${id}`);
        }
    });
});

router.post("/board/delete", (req,res)=>{
    var id = req.body.id;
    var sql = "delete from board where id =?";

    db.query(sql, [id], (err)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect("/tab/about");
        }
    });
});


module.exports = router;
