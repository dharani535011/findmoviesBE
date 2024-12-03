const Users = require("../Moudels/Usermodules")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const nodemailer=require("nodemailer")
const { SECRETKEY, PASSWORD } = require("../Config")
const Usercontroller={
     signup:async(req,res)=>{
        const {name,mail,password}=req.body
        try {
            if(!name||!password||!mail){
                return res.send({message:"fill all the values"})
            }
            const isuser=await Users.findOne({mail})
            if(isuser){
                return res.send({message:"user is already exists"})
            }
            const hass=await bcrypt.hash(password,10)
            const newuser=new Users({name,mail,password:hass})
            await newuser.save()
            res.send({message:"user registered"})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     login:async(req,res)=>{
        const {mail,password}=req.body
        try {
            if(!password||!mail){
                return res.send({message:"fill all the values"})
            }
            const isuser =await Users.findOne({mail})
            if(!isuser){
                return res.send({message:"user is not exists"})
            }
            const ispass=await bcrypt.compare(password,isuser.password)
            if(!ispass){
                return res.send({message:"worng password"})
            }
            const token=jwt.sign({id:isuser._id},SECRETKEY,{expiresIn:"1d"})
            // res.setHeader("Authorization",token)
            res.send({message:"login successful",token})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     forgetpass:async(req,res)=>{
        const {mail}=req.body
        try {
            const isuser =await Users.findOne({mail})
            if(!isuser){
                return res.send({message:"user is not exists"})
            }
            const random=crypto.randomBytes(6).toString("hex").slice(0,6)
            isuser.otp=random
            await isuser.save()
            setTimeout(async()=>{
                isuser.otp=""
                await isuser.save()
          },60*60*1000)
          const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"dharani535011@gmail.com",
                pass:PASSWORD
            }
          })
          transport.sendMail({
            from:"dharani535011@gmail.com",
            to:isuser.mail,
            subject:"password reset OTP",
                text:`change your password to use this otp : ${random}
                  Go Change your password in this : ${"https://find-movies-task.netlify.app/forgetpass"}
                 `
            
          })
          res.send({message:"OTP send to your mail.."})
        } catch (error) {
            res.send({message:error.message})
        }
     },
     changepassword:async(req,res)=>{
        const {otp,password}=req.body
        try {
            if(!otp||!password){
                return res.send({message:"fill the values"})
            }
            const user=await Users.findOne({otp})
            if(!user){
                return res.send({message:"Worng OTP"})
            }
            const hass=await bcrypt.hash(password,10)
            user.password=hass
            user.otp=""
            await user.save()
            res.send({message:"password changed successfully"})
        } catch (error) {
            res.send({message:error.message})
        }
     }
}
module.exports=Usercontroller