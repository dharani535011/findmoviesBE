const jwt = require("jsonwebtoken")
const { SECRETKEY } = require("./Config")

const Verifytoken=(req,res,next)=>{
    try {
        
        const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]

        if (!token) {
            return res.status(401).send({ message: "Login provided, access denied." })
        }
        jwt.verify(token, SECRETKEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: "Invalid token, access denied." })
            }

            
            req.user = decoded
            next() 
        })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error: error.message })
    }
}
module.exports=Verifytoken
