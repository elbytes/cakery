import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

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
            token: generateToken(user._id),
        })
    } else{
        res.status(401)
        throw new Error('Invalid Email or Password ')
    }
})

//register user post/api/users/
const registerUser = asyncHandler(async (req, res) =>{
    const { name, email, password } =  req.body
    const userExists = await User.findOne({ email })

    console.log(await User.findOne({ email }));
    if(userExists){
        res.status(400)
        throw new Error('User already exists, Please login instead')
    }
    
    const user = await User.create({name, email, password})

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('The user data is invalid')
    }
})

//get user get/api/users/profile
const getUserProfile = asyncHandler(async (req, res) =>{
   const user = await User.findById(req.user._id)
   if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        })
   }else{
       res.status(401)
       throw new Error('User not found')
   }
})

//put user get/api/users/profile
const UpdateUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id)
    if(user){
         user.name = req.body.name || user.name
         user.email = req.body.email  || user.email
         if(req.body.password){
             user.password = req.body.password
         }
         const updatedUser = await user.save()
         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            admin: updatedUser.admin,
            token: generateToken(updatedUser._id),
        })
    }else{
        res.status(401)
        throw new Error('User not found')
    }
 })

export {authUser, getUserProfile, registerUser, UpdateUserProfile}