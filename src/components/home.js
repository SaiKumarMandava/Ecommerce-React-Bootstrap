import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const HomePage = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                   
                    <Image src="https://img.freepik.com/free-vector/isometric-laptop-with-shopping-cart-keypad_1262-16544.jpg?size=626&ext=jpg&ga=GA1.1.1113600314.1698321113&semt=ais" fluid />
                </Col>
                <Col md={6}>
                    
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <h1>Welcome to Our Website</h1>
  <p>Get started with us now!</p>
  <NavLink to="/register">
    <Button variant="primary" size="lg">Let's Get Started</Button>
  </NavLink>
</div>

                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;