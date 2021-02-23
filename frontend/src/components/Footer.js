import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {  Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <a href='https://github.com/elbytes/cakery' target='blank'>
                        Copyright &copy; elBytes
                    </a>
                </Col>
            </Row>
        </Container>
    </footer>
        
    )
}

export default Footer
