import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector} from 'react-redux'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductDetails = ({match}) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=>{
        dispatch(listProductsDetails(match.params.id))
     }, [dispatch, match]);

    return (
        <>
        <Link className='btn my-3 btn-custom' to='/'>back</Link>
        { loading ? <Loader /> : error ? <Message>{error}</Message> : (
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={6}>
                <ListGroup >
                    <ListGroup.Item variant='warning'>
                        <h2>
                            {product.name}
                        </h2>
                    </ListGroup.Item>
                    <ListGroup.Item variant='warning'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item variant='warning'>
                        <h4>
                            ${product.price}
                        </h4>
                    </ListGroup.Item>
                    <ListGroup.Item variant='light' className='test'>
                    <p>
                        {product.description}
                    </p>
                    </ListGroup.Item>
                </ListGroup>
                <br />
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    ${product.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Availability:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'Available' : 'Unavailable'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn btn-block btn-custom' type='button' disabled={product.countInStock === 0 }>Add Yummy to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )}
        
        </>
    )
}

export default ProductDetails
