import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next) =>{
     try {
          const token = req.cookies.token;
          // console.log(token)
          if(!token){
               return res.status(401).json({
                    message:"User not Authenticated"
               })
          };

          const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
          // console.log(decode)
          if(!decode){
               return res.status(401).json({message:"Invalid token"})
          };

          req.id = decode.existingUserId;
          next()
     } 
     catch (err) {
          console.log(err.message)
          
     }
};
export default isAuthenticated;