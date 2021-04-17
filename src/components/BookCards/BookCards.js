import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import './BookCards.css';


const BookCards = (props) => {
    const {name,author,image,price} = props;
  return (
    <Card className="card-design">
      <div style={{backgroundColor:"#F1F1F1"}}>
      <Card.Img variant="top" className="card-img" src={image}/>
      </div>
      <Card.Body style={{paddingTop:"20px"}}>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          By {author}
        </Card.Text>
      </Card.Body>
      <Row style={{padding: "5px 5px",margin: "5px 5px"}}>
          <Col>
          <h4>${price}</h4>
          </Col>
          <Col>
          <Button variant="primary">Buy Now</Button></Col>
        </Row>
    </Card>
  );
};

export default BookCards;
