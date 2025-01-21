const mongoose = require("mongoose") ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

   /*avtar : {
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

userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

userSchema.methods.MatchPassword = async function (password) {
    return await bcrypt.compare.hash(password,this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({_id : this._id},process.env.JWT_SECRET);
};

module.exports = mongoose.model("User" , userSchema);