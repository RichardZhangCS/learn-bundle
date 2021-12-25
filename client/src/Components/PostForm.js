import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import noImage from "../no-image.png";
function PostForm() {
  const [validated, setValidated] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentImage, setCurrentImage] = useState(noImage);

  const calculatedWidth = "calc(100% - 300px)";

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
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      setValidated(false);
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(
      // eslint-disable-next-line
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      ""
    );
  };

  const submitNewPost = async (form) => {
    var formData = new FormData(form);
    formData.append("tags", tags);
    const response = await fetch("/posts/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.status === 200) {
      window.location.assign("/");
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && e.target.value && !tags.includes(e.target.value)) {
      setTags(tags.concat(e.target.value));
      e.target.value = "";
    }
  };

  const handleIconClick = (e, tag) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
  };

  return (
    <section className="post-form-section">
      <Container className="py-3">
        <h2 className="text-center">Create a new tutorial post</h2>
        <img
          src={currentImage}
          alt="Post visualization"
          style={{
            width: "300px",
            height: "100%",
            verticalAlign: "top",
          }}
        />
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit.bind(this)}
          onKeyPress={handleKeyDown.bind(this)}
          style={{ width: calculatedWidth, display: "inline-block" }}
        >
          <Form.Group className="p-2">
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
          <Form.Group className="p-2">
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
          <Form.Group className="p-2">
            <Form.Label>Prerequisties (optional but recommended)</Form.Label>
            <Form.Control
              type="text"
              name="prereqs"
              defaultValue="None"
              placeholder="Enter necessary prerequisites here"
            />
          </Form.Group>
          <Form.Group className="p-2">
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
              <Form.Label htmlFor="tagDataList" className="p-2">
                Tag Search
              </Form.Label>
              <Form.Group className="ps-2">
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
            <Col>
              <Form.Label className="p-2">Selected Tags</Form.Label>
              {tags.map((tag, index) => {
                return (
                  <span key={index} className="tag label label-info">
                    <span>{tag}</span>
                    <i
                      className="bi-x-circle ms-1"
                      onClick={handleIconClick.bind(this, null, tag)}
                    ></i>
                  </span>
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="p-2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  placeholder="Place a cool image here"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    const newImage = e.target.files[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : noImage;
                    setCurrentImage(newImage);
                  }}
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
