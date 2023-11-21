const express = require("express");
const router = express.Router();
const db = require("../configs/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.get("/login", (req,res)=>{
    res.render("login/login.ejs");
});

router.post("/login", (req,res)=>{
    var inputName = req.body.id;
    var inputPassword = req.body.password;
    var sql = "select * from members where mname = ?";

    db.query(sql, [inputName], (err, rows)=>{
        if(rows.length === 0){
            res.redirect("/login");
        } else{
            bcrypt.compare(inputPassword, rows[0].mpassword, (err, result)=>{
                if(result){
                    req.session.username = rows[0].mname;
                    res.redirect("/");
                } else{
                    res.redirect("/login");
                }
            });

        }
    });
});

router.get("/register", (req,res)=>{
    res.render("login/register.ejs");
});

router.post("/register", (req,res)=>{
    var inputName = req.body.id;
    var inputPassword = req.body.password;

    bcrypt.hash(inputPassword, saltRounds, (err, hash)=>{
        var sql = "insert into members(mname, mpassword) values(?,?)";
        db.query(sql, [inputName, hash], (err, result)=>{
            if(err){
                console.error(err);
            } else{
                console.log(`${inputName} 회원등록`);
                res.redirect("/login");
            }
        });
    });
});

module.exports = router;