import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios';

const ProductDetails = ({match}) => {
    const [product, setProduct] = useState({});
    
    useEffect(()=>{
        const fetchProduct = async () =>{
            const { data } = await axios.get(`/api/products/${match.params.id}`); //destructure response
            setProduct(data);
        }
 
        fetchProduct();
     }, []);


    return (
        <>
        <Link className='btn my-3 btn-custom' to='/'>back</Link>
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
        </>
    )
}

export default ProductDetails
