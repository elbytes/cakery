import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
const Header = () => {
    return <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="../logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
            Welcome to The Cakery</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="/cart"><i class="fas fa-shopping-cart"></i> cart</Nav.Link>
                <Nav.Link href="/login"><i class="fas fa-user"></i> sign in</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
}

export default Header
