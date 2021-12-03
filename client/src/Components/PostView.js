import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";

function PostView() {
  const { postid } = useParams();
  const [post, setPost] = useState(undefined);
  useEffect(() => {
    async function getPostFromId() {
      const response = await fetch("/post/" + postid);
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
      <h2>{post.title}</h2>
    </section>
  );
}

export default PostView;
