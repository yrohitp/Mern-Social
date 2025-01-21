const { json } = require("express");
const User = require("../models/User");
const { TokenExpiredError } = require("jsonwebtoken");

exports.register = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res
            .status(400)
            .json({success : false, message : "User already exists"});
        }

        user = await User.create({
            name,
            email,
            password,
          // avtar {  public_id : "sampleid" , url : "sampleurl"},
        });

        const token = await user.generateToken();
        const option = {
            expires : new Date(Date.now()+90*24*60*1000),
                httpOnly : true,  
        };
        res.status(201).cookie("token" , token, option).json({
            success:true,
            user,
            token
        });
    }catch (error){
        res.status(500).json({
            success:false,
            message : error.message,
        })
    }
};

exports.login = async (req,re) => {
    try{
        const { email ,password} = req.body;

        const user = await user.findOne({email}).select("+password");

        if(!user){
            return res.status(400),json({
                success : false,
                message : "User does not exists"
            })
        }

        const isMatch = await user.MatchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "Incorrect password",
            });
        }

        const token = await user.generateToken();

        const option = {
            expires : new Date(Date.now()+90*24*60*1000),
                httpOnly : true,  
        }

        res.status(200).cookie("token" , token, option).json({
            success:true,
            user,
            token
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
