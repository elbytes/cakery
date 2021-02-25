import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.get('/', asyncHandler (async (req, res)=>{
    const products = await Product.find({})
    res.json(products);
}));

router.get('/:id', asyncHandler (async (req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    } else{ //this gets fired if the id is a formatted object id, but not in the db
        res.status(404);
        throw new Error('Cake not found');
    }
}));


export default router