const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/", (req,res)=>{
    res.render("schedule/schedule.ejs");
});

router.post("/", async (req,res)=>{
    const { events } = req.body;
    console.log(events);
    var sql = "insert into schedules (title, start, end, allDay) values (?, ?, ?, ?)";
    try{
        for(let event of events){
            let start = new Date(event.start).toISOString().slice(0,19).replace('T', ' ');
            let end = event.end ? new Date(event.end).toISOString().slice(0,19).replace('T', ' ') : null;
            
            await new Promise((resolve, reject)=>{
                db.query(sql,[event.title, start, end, event.allDay], (error, result, fields)=>{
                    if(error){
                        reject(error);
                    } else{
                        resolve();
                    }
                });
            });
        }
        res.status(200).send("DB save success");
    } catch(error){
        console.log(error);
        res.status(500).send("DB error");
    }
});

module.exports = router;