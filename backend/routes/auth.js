const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register",async(req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User(
            {username: req.body.username,
            email: req.body.email,
            password: hashedPass,}
           
        );
        
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
       
    }
});

//Login

// router.post("/login", async (req, res) => {
    
//     try {
        
//       const user = await User.findOne({ username: req.body.username });
//       if (!user) {
//         return res.status(400).json("Wrong credentials!");
        
//       }
     
//       const validate = await bcrypt.compare(req.body.password, user.password);
      
      
//       if (!validate) {
//         return res.status(400).json("Wrong credentials!");
//       }
  
//       if (validate) {
//         const { password, ...others } = user._doc;
//         const token = jwt.sign({ id: user._id }, process.env.JWT);
//         res.cookie("access_token", token, {
//           httpOnly: true
//         });
        
//         return res.status(200).json(others);
//       } else {
//         return res.status(400).json("Wrong credentials");
//       }
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   });
  
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      console.log("User found:", user);
  
      if (!user) {
        console.log("Wrong credentials - User not found");
        return res.status(400).json("Wrong credentials!");
      }
  
      const validate = await bcrypt.compare(req.body.password, user.password);
      console.log("Password validation:", validate);
  
      if (!validate) {
        console.log("Wrong credentials - Password mismatch");
        return res.status(400).json("Wrong credentials!");
      }
  
      if (validate) {
        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res.cookie("access_token", token, {
          httpOnly: true
        });
        console.log("Login successful");
        return res.status(200).json(others);
      } else {
        console.log("Wrong credentials - Unknown error");
        return res.status(400).json("Wrong credentials");
      }
    } catch (err) {
      console.log("Error:", err);
      return res.status(500).json(err);
    }
  });
  

module.exports = router