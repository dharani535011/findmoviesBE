const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mail:{type:String,required:true, unique: true, lowercase: true, trim: true},
    password:{type:String,required:true,minlength: 6},
    otp:{type:String,default:""}
})
const Users=mongoose.model("/Users",userSchema,"users")
module.exports=Users