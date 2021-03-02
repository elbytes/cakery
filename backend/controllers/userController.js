import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


//authenticate user post/api/users/login

const authUser = asyncHandler(async (req, res) =>{
    const { email, password } =  req.body

    const user = await User.findOne({ email })
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,

        })
    } else{
        res.status(401)
        throw new Error('Invalid Email or Password ')
    }
})


export {authUser}