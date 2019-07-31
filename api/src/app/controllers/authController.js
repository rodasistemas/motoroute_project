//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require('../models/users');
const authConfig = require("../../config/auth.json");
//===========================================================================

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}
router.get('/ok',async(req,res)=>{
	
	const data = await User.findOne("email","rodasistemas@gmail.com");
	res.send(data);
});

router.post('/register',async (req,res) =>{
    const { email } = req.body;
    try{
        if ( await User.findOne({ email }))
            return res.status(400).send({error: 'User already exists.'});
        const user = await User.save(req.body);
        user.password = undefined;
        return res.send({
            user,
            token: generateToken({id: user.id})
        });
    } catch(err){
        return res.status(400).send({error: 'Registration Failed'});
    }
});
router.post('/authenticate', async (req,res)=>{
    const { email, password } = req.body;
	console.log("Autenticate try ", email);
    const user = await User.findOne("email", email);
    if(!user){
	console.log("User false");
        res.status(400).send({error:'User not found.'});
	}else{
	
	console.log(await bcrypt.hash(user.password,10));
    if(! await bcrypt.compare(password,user.password)){
		
        return res.status(400).send({error:'Incorrect password.'});
	}
    user.password = undefined;
    res.send({
        user, 
        token: generateToken({id: user.id})
        });
}
});
router.post('/forgot-password', async (req,res)=>{
    const { email } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            res.status(400).send({error: "User not found!"});
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours()+1);
        await User.findOneAndUpdate(user.id,{
            '$set':{
                passwordResetToken: token,
                passwordResetExpires:now
            }
        });
        mailer.sendMail({
            to: email,
            template:"/auth/forgot-password",
            subject: "Sending Email using Node.js",
            context: {token}
        }, (err)=>{
            if(err){
                return res.status(400).send({error: 'Cannot send forgot password, try again'});
            
            }else{
                return res.status(200).send({success: 'Token to Forgot Password send success!'});
            }
            
        });

    }catch(err){
        
        res.status(400).send({error:"Error on recovery password, try again"});
    }
});
router.post('/reset-password', async(req, res)=>{
    const {email, token, password} = req.body;
    try{
        const user = await User.findOne({email})
        .select('+passwordResetToken passwordResetExpires');
        if(!user)
            return res.status(400).send({error: "User not found!"});
        if(token !== user.passwordResetToken)
            return res.status(400).send({error: "Token Invalid, try again"});
        const now = new Date();
        if(now > user.passwordResetExpires)
            return res.status(400).send({error: "Token Expired, try again"});
        user.password = password;
        await user.save();
        return res.status(200).send({sucess: "Password changed success!"});
    }catch(err){
        return res.status( 400 ).send({error:"Cannot reset password, try again."});
    }
});
module.exports = app => app.use('/auth', router);

