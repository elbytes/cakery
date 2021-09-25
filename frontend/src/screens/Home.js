import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import SearchBox from '../components/SearchBox'

const Home = ({ history, match }) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Row>
        <Col md={6}>
          <h1>Latest Cakery Creations</h1>
        </Col>
        <Col md={6} className='float-end'>
          <SearchBox history={history} />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
