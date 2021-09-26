import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import morgan from 'morgan'
dotenv.config()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//to use body-parser
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
  res.send('api is running...')
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//calling custom error handling middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
