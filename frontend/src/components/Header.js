import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="../logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                Welcome to The Cakery</Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <LinkContainer to="/cart">
                    <Nav.Link><i className="fas fa-shopping-cart"></i> cart</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i> sign in</Nav.Link>
                </LinkContainer>
                
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
}

export default Header
