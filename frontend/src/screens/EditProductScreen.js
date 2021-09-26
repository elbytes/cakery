import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Image, InputGroup } from 'react-bootstrap'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, editProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('/images/sample.jpg')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productEdit = useSelector((state) => state.productEdit)
  const {
    loading: loadingProductEdit,
    error: errorProductEdit,
    success: successProductEdit,
  } = productEdit

  useEffect(() => {
    if (successProductEdit) {
      dispatch({ type: PRODUCT_EDIT_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setImage(product.image)
      }
    }
  }, [dispatch, history, product, productId, successProductEdit])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      editProduct({
        _id: productId,
        name,
        price,
        category,
        description,
        countInStock,
        image,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-secondary my-3'>
        Back to all products
      </Link>
      <FormContainer>
        <h1>Edit product details</h1>
        {loadingProductEdit && <Loader />}
        {errorProductEdit && <Message>{errorProductEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} md='4' controlId='price'>
              <Form.Label>Price</Form.Label>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} md='4' controlId='price'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='imageUrl'>
              <Form.Label>Image URL</Form.Label>
                  <Form.Control type='text' value={image} />
                  <Form.File id='upload' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                  { uploading && <Loader /> }
            </Form.Group>

            <Row className='my-4 mx-auto'>
              <Col md={6}>
                <Image src={image} alt={name} fluid />
              </Col>
            </Row>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductScreen
