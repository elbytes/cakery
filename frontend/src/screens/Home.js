import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    //load the products as soon as the component loads
    useEffect(()=>{
       const fetchProducts = async () =>{ //we can also use .then after axios.get 
           const { data } = await axios.get('/api/products'); //destructure response
           setProducts(data);
       }

       fetchProducts();
    }, []);

    return (
        <>
            <h1>Latest Cakery Creations</h1>   
            <Row>
                    {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>)
                    )}
            </Row>
        </>
    )
}

export default Home
