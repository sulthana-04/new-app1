const router = require('./posts');
const Router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../routes/validation');
router.get('/getallusers', async  (req, res, next) => {
    try{
       const user = await User.find();
      res.json(user);
      }catch(err){
       return res.json({ message:err });
   }
    });
router.post('/register',async (req,res) => {
    
    //validate data
    const {error} = registerValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   //checkng  user
   const emailExist = await User.findOne({email:req.body.email});
   if(emailExist) return res.status(400).send('Email already exist');

   //hash passwrd
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
   //crt nw user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        mobile:req.body.mobile,
       gender:req.body.gender,
       state:req.body.state,
       district:req.body.district,
       address:req.body.address
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login',async (req,res) =>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(402).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
   if(!user) return res.status(400).send('Email is not found');
   //passwrd is crct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(401).send('Invalid password')

//crt n assgn tkn
const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET );
res.status(202).header('auth-token', token).send(token);
   });
module.exports = router;