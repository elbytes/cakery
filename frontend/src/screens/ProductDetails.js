import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductsDetails,
  addProductReview,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductDetails = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [reviewBody, setReviewBody] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productAddReview = useSelector((state) => state.productAddReview)
  const { error: productReviewError, success } = productAddReview

  useEffect(() => {
    if (success) {
      alert('Review submitted')
      setRating(0)
      setReviewBody('')
      dispatch(PRODUCT_CREATE_REVIEW_RESET)
    }
    dispatch(listProductsDetails(match.params.id))
  }, [dispatch, match, success])

  //get product id and redirect to /cat with the id and quantity
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addProductReview(match.params.id, { rating, reviewBody }))
  }

  return (
    <>
      <Link className='btn my-3 btn-custom' to='/'>
        back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item variant='warning'>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item variant='warning'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant='warning'>
                  <h4>${product.price}</h4>
                </ListGroup.Item>
                <ListGroup.Item variant='light' className='test'>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn btn-block btn-custom'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add Yummy to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='warning'>No reviews yet</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <p>Date reviewed: {review.createdAt.substring(0, 10)}</p>
                    <p>{review.user}: </p>
                    <Rating value={review.rating} />
                    <p>{review.reviewBody}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a review for this product</h3>
                  {productReviewError && (
                    <Message>{productReviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Yuck</option>
                          <option value='2'>2 - Okay</option>
                          <option value='3'>3 - I'd eat that again</option>
                          <option value='4'>4 - Delicious</option>
                          <option value='5'>5 - Am I in heaven?</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='reviewBody'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={reviewBody}
                          onChange={(e) => setReviewBody(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='warning'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to add a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetails
