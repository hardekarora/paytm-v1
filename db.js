const mongo = require("mongoose"); 
mongo.connect("mongodb+srv://hardek:h1604heyGoku@cluster0.jhw0a1g.mongodb.net/paytm")
const userSchema = mongo.Schema({
    firstName : {
        type: String ,
        required : true , 
        trim : true , 
        maxLength : 50
    } ,
    lastName : {
        required : true ,
        type : String , 
        trim : true ,
        maxLength : 50 
    } , 
    username : {
        type : String ,
        required: true ,
        unique : true ,
        trim : true ,
        lowercase : true ,
        minLength :3 ,
        maxLength :50
    },
    password : {
      type :String ,
      required : true ,
      minLength : 6 
    } ,
})

const accountSchema = mongo.Schema({
    userId : {
        type : mongo.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    balance :{
        type : Number,
        required : true
    } , 
})

const User = mongo.model("User", userSchema);
const Account = mongo.model("Account", accountSchema)

module.exports = {
    User ,
    Account ,
}
