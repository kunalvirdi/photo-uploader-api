const FileModel = require("../models/file-model");
const {s3Uploadv2, s3Deletev2} = require("../aws-s3-service");

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

module.exports.postImage= async  (req,res,next)=>{
    try{
        if(!req.file){
            res.status(400).json({body:{status:"error",message:"Only jpg,jpeg and png format is allowed..."}})
            throw new Error("Only jpg,jpeg and png format is allowed!");
        }
        const result = await s3Uploadv2(req.file)
        const name=result.key
        const imageUrl=result.Location;
        const creater='6427c501ce7e5e21f4847db6'
        const photo=new FileModel({imageUrl,name,creater});
        photo.save().then(data=>{
            res.status(202).json({body:{status:"ok",message:"Post uploaded Successfully...",result}});
        })
    }catch(e) {
        console.log(e.message);
    }
}

module.exports.deleteImage= async (req,res,next)=>{
    const url=req.body.imageUrl
    const name=req.body.name;
    FileModel.deleteOne({imageUrl:url}).then(data=>{
        s3Deletev2(name)
        res.json({data: data});
    })
}