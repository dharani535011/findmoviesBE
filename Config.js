require("dotenv").config()
const MONGODB=process.env.mongodb
const SECRETKEY=process.env.secretkey
const PASSWORD=process.env.password

module.exports={
    MONGODB,SECRETKEY,PASSWORD
}