import express from 'express'
import {
  getProducts,
  getProductByID,
  addProductReview,
} from '../controllers/productsController.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductByID)

router.route('/:id/reviews').post(addProductReview)
export default router
