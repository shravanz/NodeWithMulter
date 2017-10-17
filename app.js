const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


//Set Storage Engine
const storageEng = multer.diskStorage({
    destination:'./public/uploads/',
    filename:function (req,file,cb) {
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

//Initalize upload
const upload = multer({
storage:storageEng
}).single('ShravanImage');

//Init app
const app = express();

//EJS
app.set('view engine','ejs');

//public Folder
app.use(express.static('./public'));

//route
app.get('/',(req,res)=>res.render('index'));
app.post('/uploads',(req,res)=>{
    upload(req,res,(err) =>{
if(err){
    res.render('index',{
        msg:err
    })
}else{
    console.log(req.file);
    res.send('successfully Uploaded');
}
    });
});

const port = 5000;

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
});