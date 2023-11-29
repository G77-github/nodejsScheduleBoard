const express = require("express");
const router = express.Router();
const db = require("../configs/db");
const { contains } = require("jquery");
const authMiddleware = require("../middlewares/auth");


router.get("/", authMiddleware, (req,res)=>{

    var sql = "select * from schedules";
    db.query(sql, (err, rows)=>{
        console.log(rows);
        res.render("index",{
            activeTab: "home",
            username: req.session.username,
            rows: rows
        });
    });
});

router.post("/", (req,res)=>{
    var scheduleId = parseInt(req.body.scheduleId);
    var schduleTitle = req.body.scheduleTitle;
    var participant = req.session.username;
    var nowParticipants = req.body.participants;
    var participants = nowParticipants + " " + participant;
    var data = [scheduleId, schduleTitle, participants];
    console.log(data);

    if(nowParticipants.includes(participant)){
        res.redirect("/");
        return;
    }

    var sql = "update schedules set pparticipants =? where id= ?";
    db.query(sql, [participants, scheduleId], (err, result)=>{
        if(err){
            console.error(err);
        } else{
            res.redirect("/");
        }
    });
});

router.post("/cancelParticipation", (req,res)=>{
    var scheduleId = parseInt(req.body.scheduleId);
    var participant = req.session.username;
    var nowParticipants = req.body.participants;
    
    if(nowParticipants.includes(participant)){
        nowParticipants = nowParticipants.replace(participant,"");
    }

    var sql = "update schedules set pparticipants =? where id= ?";
    db.query(sql, [nowParticipants, scheduleId], (err, result)=>{
        if(err){
            console.error(err);
        } else{
            res.redirect("/");
        }
    });
});

router.post("/deleteSchedule", (req,res)=>{
    var scheduleId = parseInt(req.body.scheduleId);
    var sql = "delete from schedules where id= ?";
    console.log(scheduleId);
    db.query(sql, [scheduleId], (err, result)=>{
        if(err){
            console.error(err);
        } else{
            res.redirect("/");
        }
    });
});

router.post("/deleteAllSchedule", (req,res)=>{
    var sql = "truncate table schedules";
    db.query(sql, (err, result)=>{
        if(err){
            console.error(err);
        } else{
            res.redirect("/");
        }
    });
});

router.get("/tab/:tabName", authMiddleware, (req,res)=>{
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

module.exports = router;
