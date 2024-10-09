import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="mt-5 vh-100">
      <Row>
        <Col className="text-center">
          <h1>Welcome to the Fitness Tracker</h1>
          <p>Your personal assistant for tracking workouts and staying fit!</p>
          <Link to="/login">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
