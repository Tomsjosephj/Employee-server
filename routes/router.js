const express= require('express')

const router= new express.Router()



const usercontroller= require("../controllers/usercontroller")
const upload = require('../multerconfig/storageconfig')


router.post('/user/register',upload.single('user_profile'), usercontroller.userregister)


router.get('/getallusers',usercontroller.getalluser)

router.get('/getsingleusers/view/:id',usercontroller.getuserdetail)

router.put('/employee/edit/:id', upload.single('user_profile'),usercontroller.edituser)

router.delete('/employee/delete/:id', usercontroller.deleteuser)

module.exports=router