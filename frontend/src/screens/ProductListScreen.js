import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingProductDelete,
    success: successProductDelete,
    error: errorProductDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.admin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successProductDelete])

  const deletehandler = (id) => {
    if (window.confirm(`Are you sure you want to delete user #${id}`)) {
      dispatch(deleteProduct(id))
    }
    if (successProductDelete) {
      window.alert('Product deleted')
    }
  }
  const createProductHandler = (product) => {
    //
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus mx-2'></i>Add Product
          </Button>
        </Col>
      </Row>
      {loadingProductDelete && <Loader />}
      {errorProductDelete && <Message>{errorProductDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>#InStock</th>
              <th>Rating</th>
              <th>#Reviews</th>
              <th>Admin.Ops</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Image src={product.image} width={50} rounded thumbnail />
                </td>
                <td>#{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.rating}</td>
                <td>{product.numReviews}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='secondary' className='btn-sm m-2'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deletehandler(product._id)
                    }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
