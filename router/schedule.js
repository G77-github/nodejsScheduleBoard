const express = require("express");
const router = express.Router();
const db = require("../configs/db");
const moment = require("moment");

router.get("/", (req,res)=>{
    res.render("schedule/schedule.ejs");
});


router.post("/", async (req,res)=>{
    const { events } = req.body;
    console.log(events);
    var insertSql = "insert into schedules (title, start, end, allDay) values (?, ?, ?, ?)";
    var selectSql = "select * from schedules where title =?";
    try{
        for(let event of events){
            let start = moment(event.start).format("YYYY-MM-DD HH:mm:ss");
            let end = event.end ? moment(event.end).format("YYYY-MM-DD HH:mm:ss") : null;
            
            let existEvents = await new Promise((resolve, reject)=>{
                db.query(selectSql, [event.title], (error, results, fields)=>{
                    if(error){
                        reject(error);
                    } else{
                        resolve(results);
                    }
                });
            });

            if(existEvents.length === 0){
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
        }
        res.status(200).send("DB save success");
    } catch(error){
        console.log(error);
        res.status(500).send("DB error");
    }
});

router.get("/data", (req,res)=>{
    var sql = "select * from schedules";
    db.query(sql, (error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(500).send("DB error");
        } else{
            res.status(200).json(results);
        }
    });
});

module.exports = router;