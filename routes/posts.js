 const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const post = require('../models/post');
const verify = require('./verifytoken');
const multer = require('multer');
const user = require('../models/user');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,  file.originalname);
    }
  });
  
  
  const upload = multer({storage: storage,});
  router.get('/',   (req, res, next) => {
    res.send(req.user);
  });
//get all the posts
router.get('/', async  (req, res, next) => {
  
  try{
    const posts = await post.find();
 return   res.json(posts);
   }catch(err){
    return res.json({message:err});

}
 

});

//submit a post
router.post('/',  upload.single('photo'), (req, res,next) => {
    
  
    console.log(req.body);
    const posts = new post({
        
        Name: req.body.Name,
        Gender: req.body.Gender,
        Email: req.body.Email,
        photo: req.file.path 
    });
    
    
    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });


      //posts.save()
      //.then(data => {
          //res.json(data);
     // })
     // .catch(err =>{
          //res.json({ message: err});
     // });
      
    

    //specific post
    router.get('/:postId', async (req,res, next) => {
      const id = req.params.postId;
        try{
       const posts = await post.findById(req.params.postId);
       res.json(posts);
        }catch(err){
            res.json({ message: err});
        }
    });
//dlt  a spcfc post
router.delete('/:postId',async (req,res) =>{
    try{
   const removedPosts = await post.remove({_id: req.params.postId});
    res.json(removedPosts);
    } catch (err) {
        res.json({ message:err});
    }
});

 
//updat a post
router.patch('/:postId', async (req, res) =>{
    try {
     const updatedPost = await post.updateOne(
        { _id: req.params.postId}, 
        { $set:{ Name:req.body.Name }}
    );
    res.json(updatedPost);
    } catch (err) {
        res.json({ message:err});
    }
})

module.exports = router;