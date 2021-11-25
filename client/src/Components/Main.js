import { Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import Categories from "./Categories";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
function Main() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getPostsFromApi = async () => {
      try {
        let res = await fetch("http://localhost:9000/post/all");
        let json = await res.json();
        setPosts(json);
      } catch (e) {
        setPosts([]);
      }
    };
    getPostsFromApi();
  }, []);

  return (
    <section className="main">
      <Container className="py-5">
        <Row>
          <Col xs={12} lg={4}>
            <Categories></Categories>
          </Col>
          <Col className="d-flex justify-content-center flex-column">
            <Form className="mb-2">
              <InputGroup>
                <div class="form-floating">
                  <Form.Control
                    type="search"
                    id="input-search"
                    placeholder="skill"
                  />
                  <label for="input-password">I want to learn...</label>
                </div>
                <Button variant="primary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
            <Row>
              {!posts ? (
                <div className="spinner-container">
                  <Spinner
                    className="post-loading-spinner"
                    animation="border"
                  />
                </div>
              ) : posts.length != 0 ? (
                posts.map((post, index) => (
                  <Card key={index} style={{ width: "18rem" }} className="m-2">
                    <Card.Img
                      variant="top"
                      src={`data:image/${post.image.contentType};base64,${post.image.dataBase64Encoded}`}
                    />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Badge>Beginner Friendly</Badge>
                      <Badge bg="danger" className="ms-1">
                        Outdated
                      </Badge>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="lead">
                  Seems like the database is sleepy today :(
                </p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Main;
