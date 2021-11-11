import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

function Preview() {
  return (
    <section id="preview">
      <Container className="preview-container text-light text-center py-3">
        <h2>Explore through the best online tutorials</h2>
        <p className="lead">
          Find the best tutorials tailored towards your needs for any skill
        </p>
        <Row className="px-5">
          <Col>
            <Button variant="primary" className="float-end">
              Explore a new skill
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" className="float-start">
              Create an account
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Preview;
