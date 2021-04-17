import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div>
      <Container>
        <Navbar>
          <Navbar.Brand href="#home">
          <Link style={{color:'black'}} to="/">Book Store</Link>
          </Navbar.Brand>
          <Nav className="mx-auto">
          <Nav.Link>
          <Link style={{color:'black'}} to="/orders">Orders</Link>
          </Nav.Link>
          <Nav.Link>
          <Link style={{color:'black'}} to="/admin">admin</Link>
          </Nav.Link>
          <Nav.Link>
          <Link style={{color:'black'}} to="/checkout">checkout</Link>
          </Nav.Link>
          </Nav>
          <Form>
            <Button variant="primary">
            <Link to="/login" style={{color:'white'}}>Login</Link>
            </Button>
          </Form>
        </Navbar>
      </Container>
    </div>
  );
};

export default Menu;
