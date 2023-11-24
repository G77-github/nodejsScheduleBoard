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

    console.log(req.body);

    db.query(sql, [inputName], (err, rows)=>{
        if(rows.length === 0){
            res.json({success: false, message: "아이디 혹은 비밀번호를 잘못 입력했습니다"});
        } else{
            bcrypt.compare(inputPassword, rows[0].mpassword, (err, result)=>{
                if(result){
                    req.session.username = rows[0].mname;
                    res.json({success: true});
                } else{
                    res.json({success: false, message: "아이디 혹은 비밀번호를 잘못 입력했습니다"});
                }
            });
        }
    });
});

router.get("/register", (req,res)=>{
    res.render("login/register.ejs");
});

router.post("/register", (req,res)=>{
    var inputName = req.body.id.trim();
    var inputPassword = req.body.password;

    var checkSql = "select * from members where mname = ?";
    db.query(checkSql, [inputName], (err,result)=>{
        if(err){
            console.error(err);
        } else if(result.length > 0){
            res.send("<script type='text/javascript'>alert('해당 아이디는 이미 존재합니다'); window.location='/register'; </script>");
        } else{
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
        }
    });
});

module.exports = router;