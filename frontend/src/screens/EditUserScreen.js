import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, editUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_EDIT_RESET } from '../constants/userConstants'

const EditUserScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userEdit = useSelector((state) => state.userEdit)
  const {
    loading: loadingUserEdit,
    error: errorUserEdit,
    success: successUserEdit,
  } = userEdit

  useEffect(() => {
    if (successUserEdit) {
      dispatch({ type: USER_EDIT_RESET })
      history.push('/admin/users')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.admin)
      }
    }
  }, [dispatch, user, userId, successUserEdit, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(editUser({ _id: userId, name, email, admin: isAdmin }))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-secondary my-3'>
        Back to all users
      </Link>
      {error && <Message>{error}</Message>}
      {loadingUserEdit && <Loader />}
      {errorUserEdit && <Message>{errorUserEdit}</Message>}
      <FormContainer>
        <h1>Edit user details</h1>
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name`'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Admin Status</Form.Label>
            <Form.Check
              type='checkbox'
              id='admin'
              label='Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default EditUserScreen
