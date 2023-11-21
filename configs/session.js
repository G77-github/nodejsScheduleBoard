const session = require("express-session");

const sessionConfig = ()=>{
    return session({
        secret: "sercet key",
        resave: false,
        saveUninitialized: true
    });
}

module.exports = sessionConfig;