import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import defaultAvatar from "../default_profile_picture.jpg";

function PostView() {
  const { postid } = useParams();
  const [post, setPost] = useState(undefined);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  let paragraphs = post ? post.description.split("\n") : undefined;

  useEffect(() => {
    async function getPostFromId() {
      const response = await fetch("/posts/" + postid);
      const postFromApi = await response.json();
      setPost(postFromApi);
    }
    getPostFromId();
  }, [postid]);

  function handleCommentSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.checkValidity()) {
      submitCommentToAPI(e.currentTarget);
    }

    setValidated(true);
  }

  async function submitCommentToAPI(form) {
    let formData = new FormData(form);
    console.log(formData.get("text"));
    setLoading(true);
    const res = await fetch("/posts/" + postid + "/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify({ text: formData.get("text") }),
    });
    if (res.ok) {
      setLoading(false);
      const response = await fetch("/posts/" + postid);
      const postFromApi = await response.json();
      setPost(postFromApi);
    }
  }
  if (!post) {
    return (
      <div className="spinner-container mt-3">
        <Spinner className="post-loading-spinner" animation="border" />
      </div>
    );
  }
  return (
    <section className="post-view">
      <Container className="p-3 bg-light post-view-container mt-5 border rounded">
        <h2>{post.title}</h2>
        <h4 className="text-muted">
          By{" "}
          <a href={`/users/name/${post.user.username}/view`}>
            {post.user.username}
          </a>
        </h4>
        <img
          className="post-article-image me-2"
          src={`data:image/${post.image.contentType};base64,${post.image.dataBase64Encoded}`}
          alt={"Visualization for " + post.title}
        ></img>

        <p>{post.submission_date_formatted}</p>
        <a href={post.link} target="_blank" rel="noopener noreferrer">
          Link to resource
        </a>
        <p>
          <strong>Prerequisites: </strong>
          {post.prereqs}
        </p>
        {paragraphs &&
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </Container>
      <Container>
        <h4 className="mt-2">Comments</h4>
      </Container>
      {post.comments &&
        post.comments.map((comment, index) => (
          <Container className="p-3 bg-light post-view-container my-2 border rounded">
            <p
              className="h4"
              onClick={() => {
                window.location = `/users/name/${comment.user.username}/view`;
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  comment.user.avatar
                    ? `data:image/${comment.user.avatar.contentType};base64,${comment.user.avatar.dataBase64Encoded}`
                    : defaultAvatar
                }
                alt={`${comment.user.username}'s avatar`}
                className="rounded-circle img-fluid me-3"
                style={{ width: "50px", height: "auto" }}
              />
              {comment.user.username}
            </p>
            <p>{comment.text}</p>
            <div className="float-start">
              <div className="border engagement-button m-1">
                <p className="m-1">
                  <i className="bi bi-hand-thumbs-up"></i>
                </p>
              </div>
              <div className="border engagement-button m-1">
                <p className="m-1">
                  <i className="bi bi-hand-thumbs-down"></i>
                </p>
              </div>
            </div>

            <p className="float-end">{comment.submission_date_formatted}</p>
          </Container>
        ))}
      <Container className="p-3 bg-light post-view-container mt-2 mb-5 border rounded">
        <p>Make a comment</p>
        <Form
          validated={validated}
          noValidate
          onSubmit={handleCommentSubmit.bind(this)}
        >
          <Form.Control
            as="textarea"
            type="text"
            name="text"
            placeholder="Type your comment here"
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            You cannot submit an empty comment!
          </Form.Control.Feedback>
          {loading && (
            <Spinner className="float-start mt-3" animation="border"></Spinner>
          )}
          <Button className="mt-3 float-end" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default PostView;
