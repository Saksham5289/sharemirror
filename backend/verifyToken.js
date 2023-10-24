const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
   
    const token = req.cookies.access_token;
   
    if(!token){ return res.status(400).json("token invalid")}
   
    jwt.verify(token,process.env.JWT, (err,user)=>{
    
        if(err) {return res.status(400).json("token invalid");}
        req.user = user; // ye jo user hme mila hai ye basically vo user Id jo hmne jwt token me daali thi
        
        next();
    }
    )
}

module.exports = verifyToken;