import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions.js'
import Message from '../components/Message.js'
import Loader  from '../components/Loader.js'

const Home = () => {
    const dispatch = useDispatch()
    
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(()=>{
      dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Cakery Creations</h1>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : <Row>
                    {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>)
                    )}
            </Row>}   
            
        </>
    )
}

export default Home
