const express = require("express");
const router = express.Router();
const db = require("../configs/db");


router.get("/", (req,res)=>{
    res.render('index', {activeTab: "home"});
});

router.get("/tab/:tabName", (req,res)=>{
    const tabName = req.params.tabName
    var sql = "select * from board";
    db.query(sql, (err, rows)=>{
        res.render("index",{
            activeTab: tabName,
            rows: rows
        });
    });
});

module.exports = router;
