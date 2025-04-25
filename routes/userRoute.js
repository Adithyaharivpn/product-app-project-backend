var express = require('express')
var router = express.Router();
var UserModel = require('../model/user') 


router.post('/',(req,res)=>{
    try {
        UserModel(req.body).save();
        res.status(200).send({message:"user add successfully"})
    } catch (error) {
        res.status(500).send({message:"something went wrong"})
    }
})

//login
router.post('/login',async(req,res)=>{
    try {
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.send({message:"user not found"})
        }
        if(user.password === req.body.password){
            return res.status(200).send({message:`welcome ${user.role}`,user})
        }
        
    } catch (error) {
        res.status(500).send({message:"something went wrong"})
    }
})

module.exports = router;