import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/database.js'

dotenv.config();

const app = express();

connectDB();

app.get('/', (req, res)=>{
    res.send('api is running...');
})

app.get('/api/products', (req, res)=>{
    res.json(products);
})

app.get('/api/products/:id', (req, res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
