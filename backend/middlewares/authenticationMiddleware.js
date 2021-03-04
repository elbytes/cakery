import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler (async (req, res, next) =>{
    let token =  req.headers.authorization

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try {
           const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
           //decode has user id(id)
           req.user = await User.findById(decode.id)
            //to get user props we can use .select 
           next()
       } catch (error) {
           console.error(error)
           res.status(401)
           throw new Error('Not authorized, bad token')
       }
   }

   if(!token){
       res.status(401)
       throw new Error('Not authorized, no token')
   }
})

export { protect }