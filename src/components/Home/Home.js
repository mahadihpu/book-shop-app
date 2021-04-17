import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import BookCards from "../BookCards/BookCards";
import NavBar from "../NavBar/NavBar"
const Home = () => {
  const [books,setBooks] = useState([]);
  console.log(books)
  useEffect(() =>{
    fetch('http://localhost:5000/books')
    .then(res => res.json())
    .then(data => setBooks(data))
  }, [])
  return (
    <>
    <NavBar />
      <Container>
        <Form className="d-flex justify-content-center pb-4 mb-4 pt-4 mt-4">
          <Form.Row>
            <Col>
              <Form.Control placeholder="Search Book" style={{width:'300px'}}/>
            </Col>
            <Col>
              <Button variant="primary">Search</Button>
            </Col>
          </Form.Row>
        </Form>
        <div className="mt-4 pt-4">
        {
            books.map(book => <BookCards name={book.name} author={book.author} price={book.price}/>)
        }
        </div>
      </Container>
    </>
  );
};

export default Home;
