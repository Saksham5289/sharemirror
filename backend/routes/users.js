const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const  verifyToken  = require("../verifyToken.js");
//UPDATE
// router.put("/:id", async (req, res) => {
//   // console.log("hello")
//   if (req.body.userId === req.params.id) {
//     // console.log("hello")
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       // console.log("hello")
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true },
        
//       ); //ye new true likhne se postman me bhi new user show karega otherwise purana hi show kar raha tha
//       res.status(200).json(updatedUser);
//       console.log("successful updation")
//     } catch (err) {
//       console.log("error hai")
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You can update only your account!");
//   }
// });
router.put("/:id",verifyToken, async (req, res) => {
  console.log("Request received to update user:", req.params.id);
  
  if (req.body.userId === req.params.id) {
    console.log("User ID matches the request body ID:", req.body.userId);
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    try {
      console.log("Updating user in the database...");
      
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      
      console.log("User updated successfully:", updatedUser);
      res.status(200).json(updatedUser);
     
    } catch (err) {
      console.log("Error updating user:", err);
      res.status(500).json(err);
    }
  } else {
    console.log("Unauthorized user update request");
    res.status(401).json("You can only update your own account!");
  }
});


//DELETE

router.delete("/:id",verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
        const user = User.findById(req.params.id);
      try {
        await Post.deleteMany({username:user.username});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {res.status(404).json("User Not Found")}
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//Get User 

router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
