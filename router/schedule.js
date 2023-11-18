const express = require("express");
const router = express.Router();
const db = require("../configs/db");

router.get("/schedule", (req,res)=>{
    res.render("schedule/schedule.ejs");
});

module.exports = router;