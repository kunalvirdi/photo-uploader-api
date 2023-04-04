const express=require('express')
const router=express.Router()
const fileUploadController=require('../controller/file-upload')

router.get('/',fileUploadController.home)
router.get('/post',fileUploadController.getImages)
router.post('/post',fileUploadController.postImage)
router.post('/delete',fileUploadController.deleteImage)

module.exports=router;