const  expres=require('express')
const router=expres.Router()
const User=require('../models/User')
const { body,validationResult } = require('express-validator');
const jwtSecret="MynameisEndtoEndYouTubeChannel$#"
const bcrypt=require("bcrypt");
var jwt = require('jsonwebtoken');

router.post("/createuser",[
body('name').isLength({min:3}),
body('email').isEmail(),
body('password').isLength({min:5})],
async(req,res)=>{
  
const error=validationResult(req);
if(!error.isEmpty()){
  return res.status(400).json({error:error.array()});
}

const salt=await bcrypt.genSalt(10);
let secpassword=await bcrypt.hash(req.body.password,salt)

  try {
     await User.create({
        name:req.body.name,
        password:secpassword,
        email:req.body.email,
        location:req.body.location
      })
      res.json({success:true});
  } catch (error) {
    console.log(error)
    res.json({success:false});
  }
})

router.post("/loginuser",[
  body('email').isEmail(),
  body('password').isLength({min:5})],
  async(req,res)=>{
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()});
  }
  let email=req.body.email;
    try {
      let userData= await User.findOne({ email});
        if(!userData){
          return res.status(400).json({error:"Try logging with correct credentials"})
        } 
        const pwdcompare=bcrypt.compare(req.body.password, userData.password) 
        if(!pwdcompare){
          return res.status(400).json({error:"Try logging with correct credentials"})
        }

        const data={
          user:{
            id:userData.id
          }
        }

        const authtoken=jwt.sign(data,jwtSecret)
        return res.json({success:true,authtoken:authtoken});

    } catch (error) {
      console.log(error)
      res.json({success:false});
    }
  })

module.exports=router;