import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const EditOrderScreen = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingOrderDeliver,
    error: errorOrderDeliver,
    success,
  } = orderDeliver

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!order || order._id !== orderId || success) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
    }
  }, [orderId, order, dispatch, success])

  const deliverHandler = (order) => {
    console.log('Marking as delivered')
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : loadingOrderDeliver ? (
    <Loader />
  ) : errorOrderDeliver ? (
    <Message>{errorOrderDeliver}</Message>
  ) : (
    <>
      <h2>Order #{order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <strong>Order Items</strong>
            </ListGroup.Item>
            {order.orderItems.length > 0 ? (
              <ListGroup.Item variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            ) : (
              <Message>Your cart is empty</Message>
            )}
            <ListGroup.Item>
              <h3>Shipping Address: </h3>
              <p>
                <strong>{order.user.name}</strong>
              </p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.delivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <>
                  <Message variant='warning'>Not delivered yet </Message>
                  {order.isPaid && !order.delivered && (
                    <Button
                      variant='success'
                      type='button'
                      style={{ float: 'right' }}
                      className='my-4'
                      onClick={() => {
                        deliverHandler(order)
                      }}
                    >
                      Mark as delivered
                    </Button>
                  )}
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Selected Payment Method: </h3> <p>{order.paymentMethod}</p>
              <p>{order.isPaid}</p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not paid yet</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h5>
                      <b>Total</b>
                    </h5>
                  </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditOrderScreen
