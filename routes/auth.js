const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

routes.get('/',(req,res) => {
    res.send('Auth');
})

routes.post('/signin',(req,res) => {
    console.log(req.body);
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((user) => {
        if(!user)
        return res.status(422).json({error:"Please enter a valid email"})
        else{
            if(user.password === password){
                const token = jwt.sign({_id:user._id} , JWT_SECRET,{ expiresIn: "1h" })
                res.send({token,user});
            }
            else{
                return res.status(422).json({error:"Password is Incorrect"})
            }
        }
    })
})

routes.post('/signup',(req,res) => {
    const {email,password,firstname,lastname} = req.body;
    if(!email || !password || !firstname || !lastname){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((user) => {
        if(user)
        return res.status(422).json({error:"This email already exist"})
        else {
            const newuser = new User({
                email,
                password,
                firstname,
                lastname
            })
            newuser.save()
            .then((user) => {
                const token = jwt.sign({_id:user._id} , JWT_SECRET,{ expiresIn: "1h" })
                res.send({token,user});
                res.send('saved Succesfully');
            })
            .catch((err) => {
                res.send({error:err.message});
            })
        }
    })
    .catch((err) => {
        res.send({error:err.message});
    })
})

module.exports = routes;