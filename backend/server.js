import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import  { notFound, errorHandler} from './middlewares/errorMiddleware.js'

dotenv.config();

const app = express();

connectDB();

app.get('/', (req, res)=>{
    res.send('api is running...');
})

app.use('/api/products', productRoutes);

//calling custom error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
