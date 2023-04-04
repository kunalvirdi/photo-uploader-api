const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cors=require('cors')
const fileRouter=require('./routes/file-upload')
const multer=require('multer')
const path=require('path')
const mongoose=require('mongoose');
require('dotenv').config();
const port=process.env.PORT || 5000
//Cors
app.use(cors())
//Multer configuration
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString()+'-'+file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return new Error("Only JPG,PNG and JPEG format is Allowed!");
    }
}


app.use(bodyParser.json());
app.use(multer({storage:fileStorage,fileFilter}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));

app.use(fileRouter);


mongoose.connect(process.env.URI).then(()=>{
    app.listen(port,()=>console.log('Listening...'));
});
//Routes

