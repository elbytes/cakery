import express from 'express'
//import { get } from 'mongoose'
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js'
import {protect} from '../middlewares/authenticationMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/').post(registerUser)
export default router