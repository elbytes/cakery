import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <a href='https://github.com/elbytes/cakery' target='blank'>
              Created for your tastebuds only by &copy;elBytes
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
