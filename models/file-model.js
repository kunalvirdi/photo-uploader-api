const mongoose=require('mongoose');
const fileSchema=mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const model=mongoose.model('posts',fileSchema);

module.exports=model;