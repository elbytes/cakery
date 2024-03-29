import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
  const listSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(listSize)
    .skip(listSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / listSize) })
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

//Create a product
//@route POST /api/products
//@access Private Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    description: 'Sample description',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    category: 'Sample category',
  })
  const createdProduct = await product.save()
  res.status(201)
  res.json(createdProduct)
})

//Update product
//@routeput/api/products/:id
//@access private admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.countInStock = req.body.countInStock
    product.image = req.body.image || product.image
    const updatedProduct = await product.save()
    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      image: updatedProduct.image,
      price: updatedProduct.price,
      description: updatedProduct.description,
      countInStock: updatedProduct.countInStock,
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//Product carousel
//@route get/api/products/top
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5)
  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProductByID,
  getProducts,
  addProductReview,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
}
