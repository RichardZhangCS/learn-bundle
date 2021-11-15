import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
function PostForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <section className="post-form-section">
      <Container className="py-3">
        <h2 className="text-center">Create a new tutorial post</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="py-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter a cool title here"
              required="true"
            />
            <Form.Control.Feedback type="invalid">
              Title cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="url"
              name="link"
              placeholder="Provide the url to the resource here"
              required="true"
            />
            <Form.Control.Feedback type="invalid">
              Must provide a valid url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Label>Prerequisties (optional but recommended)</Form.Label>
            <Form.Control
              type="prereqs"
              name="description"
              defaultValue="None"
              placeholder="Enter necessary prerequisites here"
            />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              placeholder="Enter a cool description"
              required="true"
            />
            <Form.Control.Feedback type="invalid">
              Description cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="py-2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  placeholder="Place a cool image here"
                  accept=".jpg, .jpeg, .png"
                />
                <Form.Control.Feedback type="invalid">
                  Image must be a jpg, jpeg, or png
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="position-relative">
              <Button type="submit" className="post-add-btn w-75">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}

export default PostForm;
