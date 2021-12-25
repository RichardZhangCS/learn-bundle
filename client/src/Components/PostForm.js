import { useRef } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import noImage from "../no-image.png";
function PostForm({ post }) {
  // if post is defined, then this component is in edit mode
  const [validated, setValidated] = useState(false);
  const [tags, setTags] = useState(post ? post.tags : []);
  const [currentImage, setCurrentImage] = useState(
    post && post.image
      ? `data:${post.image.contentType};base64,${post.image.dataBase64Encoded}`
      : noImage
  );

  const inputFileRef = useRef();

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

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
    if (post) {
      if (
        post.image &&
        currentImage ===
          `data:${post.image.contentType};base64,${post.image.dataBase64Encoded}`
      ) {
        formData.set("image", dataURLtoFile(currentImage));
      }
    }
    const route = post ? `/posts/${post._id}/` : "/posts/";
    const response = await fetch(route, {
      method: post ? "PUT" : "POST",
      body: formData,
      credentials: "include",
    });
    if (response.status === 200) {
      const resultPage = !post ? "/" : `/posts/${post._id}/view`;
      window.location.assign(resultPage);
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
      <Container className="py-3 my-5 border rounded bg-light border">
        <h2 className="text-center">
          {post ? `Editing "${post.title}"` : "Create a new tutorial post"}
        </h2>
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
          className="post-form"
        >
          <Form.Group className="p-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter a cool title here"
              required="true"
              defaultValue={post ? post.title : ""}
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
              defaultValue={post ? post.link : ""}
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
              placeholder="Enter necessary prerequisites here"
              defaultValue={post ? post.prereqs : "None"}
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
              defaultValue={post ? post.description : ""}
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
                <Form.Label>New Image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="file"
                    name="image"
                    ref={inputFileRef}
                    placeholder="Place a cool image here"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      let newImage = e.target.files[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : noImage;
                      if (post && post.image && !e.target.files[0]) {
                        newImage = `data:${post.image.contentType};base64,${post.image.dataBase64Encoded}`;
                      }
                      setCurrentImage(newImage);
                    }}
                  />
                  <Button
                    style={{
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                    onClick={(e) => {
                      inputFileRef.current.value = "";
                      setCurrentImage(noImage);
                    }}
                  >
                    Clear
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Image must be a jpg, jpeg, or png
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className="position-relative d-flex align-items-end justify-content-end pe-3">
              <Button type="submit" className="w-75 mb-2">
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
