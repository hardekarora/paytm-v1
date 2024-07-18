const express = require("express")
const userRouter = express.Router();
const z = require("zod");
const jwt  = require("jsonwebtoken");
const { User, Account } = require("../db");

const {JWT_SECRET} = require("../config")
const {authMiddleware} = require("../middleware")

const userSchema = z.object({
    firstName : z.string(),
    lastName : z.string() ,
    username : z.string().email(),
    password : z.string()
})

userRouter.post("/signup" ,async(req,res)=>{
  const user = req.body ;
  const {success} = userSchema.safeParse(user)
  if(!success){
    return res.json({
        message : "Incorrect inputs"
    }).status(411)
  }
    const username = user.username ;
    const password = user.password ;
    const firstName = user.firstName ;
    const lastName = user.lastName ;
    const existingUser= await User.findOne({
        username
    })
    if(existingUser){
        return res.status(411).json({
            message:"User already exists"
        })
    }
        const newUser = await User.create({
            username,
            password ,
            firstName,
            lastName,
        })

        const userId = newUser._id ;

        await Account.create({
            userId ,
            balance : (1+ Math.random())*1000
        })
        
        const token = jwt.sign({userId},JWT_SECRET)
        res.json({
            message : "User created successfully",
            token
        }).status(200)
       
    }
  )

  const userSigninSchema = z.object({
    username : z.string().email() ,
    password : z.string()
  })

  userRouter.post("/signin", async(req,res)=>{
    const userBody = req.body ;
    if(userSigninSchema.safeParse(userBody).success==false){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }
    const username = req.body.username ;
    const password = req.body.password ;
    const user = await User.findOne({
        username ,
        password,
    })
    if(!user){
        return res.status(411).json({
            message : "Wrong Credentials"
        })
    }
    const userId = user._id;
    const token = jwt.sign({userId},JWT_SECRET)
    res.status(200).json({
        token
    })
  })
const updateUserSchema = z.object({
    password : z.string().optional(),
    firstName : z.string().optional(),
    lastName :z.string().optional(),
})

userRouter.put("/user",authMiddleware,async(req,res)=>{
    const userBody = req.body ;
    const userId = req.userId ;
   const {success} = updateUserSchema.safeParse(userBody);
   if(!success){
    return res.status(403).json({
        message : "Wrong"
    })
   }
   await User.updateOne(
   userBody , {
    id : userId
   }
   )
    res.json({
        message : "Updated successfully"
    })
})

userRouter.get("/bulk" , async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({$or : [{firstName: {"$regex":filter}},
             {lastname:{"$regex":filter}}]})
    if(!users){
        res.status(400).json({
            message : "User does'nt exist"
        })
    }
    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports =  userRouter