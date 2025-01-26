const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/userModel')

const hashpasword = async(password)=>{
    const salt = 10
    return await bcrypt.hash(password, salt)
}

module.exports.registration = async(req,res)=>{
    try{
        const {uname,email,password} = req.body;

        if(!uname ||  !email || !password) return res.json("All filed are rquirement..")
            console.log("======>",uname,password,email);
        const hashedPassword = await hashpasword(password)
        const user = new Users({
            uname,
            email,
            password : hashedPassword
        })
        await user.save();

        return res.json({
            status:200,
            message : "User Create Sucessfully Acount ",
            data:user
            
        })
        const token = jwt.sign({userId : user._id},"YOUR_SECRTY_KEY")
        res.status(201).json({token})
        
    }catch(error){
        console.log("error",error)
        if(error.code === 11000){
            res.status(401).json("username and email allready exists")
        }
        res.send({error : "error rigstration new user"})
    }
}

module.exports.loging = async(req,res)=>{  

    try{
        const {email,password}=req.body;
        const user = await Users.findOne({email})
        

        if(!user){
            return res.status(401).json({error :'Increate email or password'})
        }

        if(user.isloggedIn){
            return res.json({
                status: 403,
                error : "user alredy logged in"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            console.log("passowrd matches for users", email)
            return res.status(401).json({error : "Invalid email or password"})
        } 
        console.log("passowrd match for user", email)

        user.isloggedIn = true;
        await user.save();
        
        const token = jwt.sign({userId:user._id}, 'YOUR_SECRET_KEY');
        // res.status(200).json({token});
        
        return res.json({
            success : " Sucessfully Loging",
            data:user,
            status:200,
            token
        })

    }catch(error){
        res.send({error : 'Error Logging in user '})
    }
}
