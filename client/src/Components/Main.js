import { Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import Categories from "./Categories";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import testLogo from "../js-logo.jpg";
function Main() {
  return (
    <section className="main">
      <Container className="py-5">
        <Row>
          <Col md={4}>
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
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={testLogo} />
                <Card.Body>
                  <Card.Title>Javascript</Card.Title>
                  <Card.Text>My first programming language lmao</Card.Text>
                  <Badge>Beginner Friendly</Badge>
                  <Badge bg="danger">Outdated</Badge>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Main;
