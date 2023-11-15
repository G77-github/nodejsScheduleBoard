const express = require("express")
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({
    storage: storage
})

router.post("/upload", upload.single("file"), (req,res)=>{
    o_name = req.file.originalname;
    c_name = req.file.filename;
    size = req.file.size;
    res.render("upload", {
        "o_name": o_name,
        "c_name": c_name,
        "size": size
    });
});

module.exports = router;
