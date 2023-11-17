const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.use(express.urlencoded({extended: true}));

router.get("/board/write", (req,res)=>{
    res.render("board/write.ejs");
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

router.get("/board", (req,res)=>{
    var sql = "select * from board";
    db.query(sql, (err,rows)=>{
        res.render("board/index.ejs",{
            rows: rows
        });
    });
});
/*
router.get("/board/view/:id", (req, res)=>{
    var id = req.params.id;
    var sql = "SELECT board.*, boardcomment.* FROM board LEFT JOIN boardcomment ON board.id = boardcomment.bid where id=?;";
    db.query(sql, [id], (err, rows)=>{
        res.render("board/detail.ejs", {
            result: rows
        });
    });
});
*/
router.get("/board/view/:id", (req, res)=>{
    var id = req.params.id;
    var sql = "SELECT board.*, boardcomment.* FROM board LEFT JOIN boardcomment ON board.id = boardcomment.bid where board.id=?";
    db.query(sql, [id], (err, rows)=>{
        console.log(rows);
        res.render("board/detail.ejs", {
            result: rows
        });
    });
});


router.post("/board/view/:id", (req,res)=>{
    var cwriter = req.body.cwriter;
    var cpassword = req.body.cpassword;
    var bid = req.params.id;
    var ccontent = req.body.ccontent;
    var data = [cwriter, cpassword, bid, ccontent, ];
    var sql = "insert into boardcomment(cid, cwriter, cpassword, bid, ccontent, cdate) value(null,?,?,?,?,now())";
    db.query(sql, data, (err,result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect(`/board/view/${bid}`);
        }
    });
});

router.get("/board/:type/:id", (req,res)=>{
    var type = req.params.type;
    var id = req.params.id;

    if(type == "modify"){
        var title = "수정";
    
    } else if(type == "delete"){
        var title = "삭제";
    }
    res.render("board/auth.ejs",{
        id: id,
        type: type,
        title: title
    });
});

router.post("/board/:type/:id", (req,res)=>{
    var type = req.params.type;
    var id = req.params.id;
    var password = req.body.password;
    var sql = "select password from board where id=?";
    db.query(sql, [id], (err, rows)=>{

        if(err){
            console.error(err);
            res.sendStatus(500);
            return;
        }


        var temp = rows[0].password;
        if(temp != password){
            console.log("왜 여기로 라우팅?");
            res.render("board/error");

        } else{
            if(type == "modify"){
                var sql = "select * from board where id=?";
                db.query(sql, [id], (err, rows)=>{
                    res.render("board/modify",{
                        head: "글 수정하기",
                        id: id,
                        writer: rows[0].writer,
                        title: rows[0].title,
                        content: rows[0].content
                    });
                });
            } else if(type == "delete"){
                var sql ="delete from board where id=?";
                db.query(sql,[id]);
                res.redirect("/board");
            }
        }
    });
});

router.post("/board/modify/:id/ok", (req,res)=>{
    var id = req.params.id;
    var password = req.body.password;
    var writer = req.body.writer;
    var title = req.body.title;
    var content = req.body.content;
    
    var sql = "update board set password=?, writer=?, title=?, content=? where id=?";
    var data = [password, writer, title, content, id];

    db.query(sql, data, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else{
            res.redirect(`/board/view/${id}`);
        }
    });
});

module.exports = router;
