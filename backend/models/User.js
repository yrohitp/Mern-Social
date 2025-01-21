const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter a name"],
    },
    email:{
        type:String,
        required : [true,"Please enter a email"],
        unique : [true,"Email already exists!"],
    },
    password : {
        type : String,
        required : [true , "Please Enter a Password"],
        minlengt : [6,"Paswword must be atleast 6 character"],
        select : false,
    },

   /* avtar : {
        public_id : String,
        url : string,
    },*/

    posts :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Posts",
    },
],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],

    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],
});

module.exports = mongoose.model("User" , userSchema);