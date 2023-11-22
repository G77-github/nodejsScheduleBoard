const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

module.exports = (io)=>{
    io.on("connection", (socket)=>{
        console.log("io 연결");
        socket.on("chat message", (msg)=>{
            io.emit("chat message", msg);
        });
    });

    router.get("/chat", authMiddleware, (req,res)=>{
        res.render("chat/chat.ejs",{
            username: req.session.username
        });
    });

    return router;
};
