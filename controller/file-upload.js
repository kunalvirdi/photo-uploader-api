const FileModel = require("../models/file-model");
const fs=require('fs')
const mongoose = require("mongoose");

module.exports.home=(req,res,next)=>{
    res.status(200).json({
        status:"API is Working Fine...",
        message:"Please use /post route for GET and POST request..."
    })
}

module.exports.getImages=(req,res,next)=>{
    FileModel.find().then((data)=>{
        if(data.length==0){
            return res.status(200).json({status: "Ok", body: {message: "Images not Found", data}});
        }
        res.status(200).json({status:"Ok",body:{message:"Images Found",data}});
    })
}

module.exports.postImage=(req,res,next)=>{
    try{
        if(!req.file){
            res.status(400).json({body:{status:"error",message:"Only jpg,jpeg and png format is allowed..."}})
            throw new Error("Only jpg,jpeg and png format is allowed!");
        }
        const name=req.file.originalname;
        const imageUrl=req.file.path;
        const creater='6427c501ce7e5e21f4847db6'
        const photo=new FileModel({imageUrl,name,creater});
        photo.save().then(data=>{
            res.status(202).json({body:{status:"ok",message:"Post uploaded Successfully...",data}});
        })
    }catch(e) {
        console.log(e.message);
    }
}

module.exports.deleteImage=(req,res,next)=>{
    const url=req.body.imageUrl
    // console.log(url)
   fs.unlinkSync(url);
    FileModel.deleteOne({imageUrl:url}).then(data=>{
        res.json({data: data});
    })
    // next()
}