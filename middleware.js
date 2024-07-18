const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req,res,next)=>{
  const tokenFromHeader = req.headers.authorization;
  if(!tokenFromHeader || !tokenFromHeader.startsWith("Bearer ")){
    return res.status(400).json({
        message :"Autherization failed"
    })
  }
  const token = tokenFromHeader.split(" ")[1];
  try{
    const decoded = jwt.verify(token ,JWT_SECRET)
    if(decoded.userId){
    req.userId = decoded.userId
    next();
    }else{
       return res.status(403).json({
            message : "Autherization failed"
        }) 
    }
 
  }catch(e){
    return res.status(403).json({
        message : "Autherization failed"
    })
  }
}

module.exports = {
  authMiddleware
}