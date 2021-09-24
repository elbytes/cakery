import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
  console.log('object')
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}
  const products = await Product.find({ ...keyword })
  res.json(products)
})

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    //this gets fired if the id is a formatted object id, but not in the db
    res.status(404)
    throw new Error('Cake not found')
  }
})

//Create new reviews
//@route POST /api/products/:id:/reviews
//@access Private
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, reviewBody } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const reviewExists = product?.reviews?.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    console.log(req.user)
    if (reviewExists) {
      res.status(400)
      throw new Error('You have already posted a review for this product')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      reviewBody,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Cake not found')
  }
})

//Delete a product
//@route DELETE /api/products/:id:
//@access Private Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//put product put/api/users/profile private admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.category = req.body.category
    product.description = req.body.description
    product.countInStock = req.body.countInStock
    const updatedProduct = await product.save()
    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      countInStock: updatedProduct.countInStock,
    })
  } else {
    res.status(401)
    throw new Error('Product not found')
  }
})

export {
  getProductByID,
  getProducts,
  addProductReview,
  deleteProduct,
  updateProduct,
}
