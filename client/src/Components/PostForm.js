import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
function PostForm() {
  const [validated, setValidated] = useState(false);
  const [tags, setTags] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      submitNewPost(form);
    }
    setValidated(true);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      setValidated(false);
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      ""
    );
  };

  const submitNewPost = async (form) => {
    var formData = new FormData(form);
    formData.append("tags", tags);
    const response = await fetch("/post/add", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.status == 200) {
      window.location.assign("/");
    }
  };

  const handleKeyUp = (e) => {
    if (e.key == "Enter" && e.target.value && !tags.includes(e.target.value)) {
      setTags(tags.concat(e.target.value));
      e.target.value = "";
    }
  };

  const handleIconClick = (e, tag) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
  };

  console.log(tags);

  return (
    <section className="post-form-section">
      <Container className="py-3">
        <h2 className="text-center">Create a new tutorial post</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit.bind(this)}
          onKeyPress={handleKeyDown.bind(this)}
        >
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
              type="text"
              name="prereqs"
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
              <Form.Label className="py-2">Selected Tags</Form.Label>
              {tags.map((tag, index) => {
                return (
                  <span key={index} className="tag label label-info">
                    <span>{tag}</span>
                    <a>
                      <i
                        className="bi-x-circle"
                        onClick={handleIconClick.bind(this, null, tag)}
                      ></i>
                    </a>
                  </span>
                );
              })}
            </Col>
            <Col>
              <Form.Label for="tagDataList" className="py-2">
                Tag Search
              </Form.Label>
              <Form.Group>
                <Form.Control
                  list="datalistOptions"
                  id="tagDataList"
                  placeholder="Type to search for tags. Press enter to add typed tag"
                  onKeyUp={handleKeyUp.bind(this)}
                  onChange={handleChange.bind(this)}
                />
                <datalist id="datalistOptions">
                  <option value="San Francisco" />
                  <option value="New York" />
                  <option value="Seattle" />
                  <option value="Los Angeles" />
                  <option value="Chicago" />
                </datalist>
              </Form.Group>
            </Col>
          </Row>
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
