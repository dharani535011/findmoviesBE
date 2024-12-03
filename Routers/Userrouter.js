const express=require("express")
const Usercontroller = require("../Controllers/Usercontroller")
const Verifytoken = require("../Verify")
const UserRouter=express.Router()

UserRouter.post("/signup",Usercontroller.signup)
UserRouter.post("/login",Usercontroller.login)
UserRouter.post("/changepass",Usercontroller.forgetpass)
UserRouter.post("/changepassword",Usercontroller.changepassword)
module.exports=UserRouter


