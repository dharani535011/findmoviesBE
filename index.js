const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const { MONGODB } = require("./Config")
const UserRouter = require("./Routers/Userrouter")

// MIDDLE WARE
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:['http://localhost:5173',"https://find-movies-task.netlify.app"],
    credentials:true
}))
app.options('*', cors())

// ROUTERS
app.use("/users",UserRouter)



// DATABASE and SERVER
mongoose.connect(MONGODB)
.then(()=>{
    console.log("DATABASE CONNECTED")
    app.listen(3000,()=>{
        console.log("SERVER CONNECTED") 
    })
})
.catch((err)=>{
    console.log(err.message)
})