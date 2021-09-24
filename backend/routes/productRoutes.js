import express from 'express'
import {
  getProducts,
  getProductByID,
  addProductReview,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js'
import { protect, isAdmin } from '../middlewares/authenticationMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

router.route('/:id/reviews').post(addProductReview)
export default router
