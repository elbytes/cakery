import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions.js'

const Home = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(listProducts())
    }, [dispatch]);

    const products = []

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
