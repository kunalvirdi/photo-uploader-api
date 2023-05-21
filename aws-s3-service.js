const {S3}=require('aws-sdk');
require('dotenv').config()
exports.s3Uploadv2= async (file)=>{
    const s3=new S3();

    const param={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`${new Date().toISOString()+'-'+file.originalname}`,
        Body:file.buffer
    };
    return await s3.upload(param).promise();
}
