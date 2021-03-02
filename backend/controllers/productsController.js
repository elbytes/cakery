import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find({})
    res.json(products);
})

const getProductByID = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    } else{ //this gets fired if the id is a formatted object id, but not in the db
        res.status(404);
        throw new Error('Cake not found');
    }
})

export {getProductByID, getProducts}