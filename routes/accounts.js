const express = require("express");
const accountRouter = express.Router();
const { authMiddleware } = require("../middleware")
const {Account}= require("../db")
const mongo = require("mongoose");
accountRouter.get("/balance" ,authMiddleware,async (req,res)=>{
const userId = req.userId
 const balance = await Account.findOne({
    userId
 })
 if(!balance){
    res.status(400).json({
        message : "Cant find your account"
    })
 }
 res.status(200).json({
    balance : balance.balance
 })
})
accountRouter.post("/transfer",authMiddleware ,async(req,res)=>{
const fromUserId = req.userId ; 
const toUserId = req.body.to;
const amount = req.body.amount ;
const session = await mongo.startSession();
await session.startTransaction();
const balance = await Account.findOne({ userId :
    fromUserId,
}).session(session)
if(!balance || balance.balance<=amount){
    await session.abortTransaction();
    return res.status(400).json({
        message : "Not enough balance"
    })
}
const toUser = await Account.findOne({ userId:
    toUserId
}).session(session);
if(!toUser){
    session.abortTransaction()
    return res.status(400).json({
        message : "User does'nt exist"
    })
}
await Account.updateOne({userId: fromUserId}, {$inc : {balance : -amount}}).session(session)
await Account.updateOne ({userId: toUserId}, {$inc : { balance : amount}}).session(session)
await  session.commitTransaction();
res.json({
    message : "Transfer successful"
})
})

module.exports = accountRouter

