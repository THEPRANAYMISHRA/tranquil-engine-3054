const jwt = require("jsonwebtoken")
const cors = require("cors")

const auth = (req, res, next) => {
    // const token=req.headers.authorization.split(" ")[1]
    // if(token){
    //     const decode=jwt.verify(token, 'secret');
    //     if(decode){
    //         req.body.userId=decode.userId
    //         next()
    //     }else{
    //         res.status(400).send({"msg":"please login"})
    //     }
    // }else{
    //     res.status(400).send({"msg":"please login"})
    // }
    next()
}

module.exports = auth