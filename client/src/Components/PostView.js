import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";

function PostView() {
  const { postid } = useParams();
  const [post, setPost] = useState(undefined);

  let paragraphs = post ? post.description.split("\n") : undefined;

  useEffect(() => {
    async function getPostFromId() {
      const response = await fetch("/posts/" + postid);
      const postFromApi = await response.json();
      setPost(postFromApi);
    }
    getPostFromId();
  }, []);

  if (!post) {
    return (
      <div className="spinner-container mt-3">
        <Spinner className="post-loading-spinner" animation="border" />
      </div>
    );
  }
  return (
    <section className="post-view">
      <Container className="py-2">
        <h2>{post.title}</h2>
        <h4 className="text-muted">By {post.user.username}</h4>
        <img
          className="post-article-image me-2"
          src={`data:image/${post.image.contentType};base64,${post.image.dataBase64Encoded}`}
        ></img>
        <p>{post.submission_date_formatted}</p>
        <p>
          <strong>Prerequisites: </strong>
          {post.prereqs}
        </p>
        {paragraphs &&
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </Container>
    </section>
  );
}

export default PostView;
