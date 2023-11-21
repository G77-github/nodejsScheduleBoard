const express = require("express");
const router = express.Router();
const db = require("../configs/db");
const { contains } = require("jquery");
const authMiddleware = require("../middlewares/auth");


router.get("/", authMiddleware, (req,res)=>{
    res.render('index', {activeTab: "home", username: req.session.username });
});

router.get("/tab/:tabName", (req,res)=>{
    const tabName = req.params.tabName
    var sql = "select * from board";
    db.query(sql, (err, rows)=>{
        res.render("index",{
            activeTab: tabName,
            rows: rows,
            username: req.session.username
        });
    });
});


router.get("/temp", (req,res)=>{

    var sql = "select * from schedules inner join participants on schedules.id = participants.pid";
    db.query(sql, (err, rows)=>{
        console.log(rows);
        res.render("scheduleboard",{
            rows: rows
        });
    });
});

router.post("/temp", (req,res)=>{
    var scheduleId = parseInt(req.body.scheduleId);
    var schduleTitle = req.body.scheduleTitle;
    var participant = "임의값";
    var nowParticipants = req.body.participants;
    var participants = participant + " " + nowParticipants;
    var data = [scheduleId, schduleTitle, participants];
    console.log(data);

    var checkSql = "select * from participants where pid =?";
    db.query(checkSql, scheduleId, (err,result)=>{
        if(err){
            console.error(err);
        } else{
            if(result.length >0){
                var updateSql = "update participants set pparticipants =? where pid =?";
                db.query(updateSql, [participants, scheduleId], (err)=>{
                    if(err){
                        console.error(err);
                    } else{
                        res.redirect("/temp");
                    }
                });
            } else{
                var insertSql = "insert into participants(pid, ptitle, pparticipants) values(?,?,?)";
                db.query(insertSql, data, (err)=>{
                    if(err){
                        console.error(err);
                    } else{
                        res.redirect("/temp");
                    }
                });
            }
        }
    });
});

module.exports = router;
