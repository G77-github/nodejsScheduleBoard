const express = require("express");
const router = express.Router();

router.get('/result', (req,res)=>{
    var val1 = req.query.val1;
    var val2 = req.query.val2;
    res.render('result',{
        'val1': val1,
        'val2': val2,
    });
});

router.post('/result', (req, res)=>{
    val1 = req.body.val1;
    val2 = req.body.val2;
    res.render("result.ejs",{
        "val1": val1,
        "val2": val2
    });
});

module.exports = router;