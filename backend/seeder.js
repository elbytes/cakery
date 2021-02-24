import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/productModel.js'
import connectDB from './config/database.js'

dotenv.config();

connectDB();

const importData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);
        const createdUsers = await Product.insertMany(products);
        const adminUser = createdUsers[0]._id //first user in the dummy user data was admin

        //set the user to admin for all products so we can insert into db
        const sampleProducts = products.map(product =>{ //spread and add adminUser
            return { ...product, user: adminUser} 
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported to db');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}
