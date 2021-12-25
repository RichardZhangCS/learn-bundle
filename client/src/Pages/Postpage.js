import Header from "../Components/Header";
import PostForm from "../Components/PostForm";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

function Postpage() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postid) {
      async function getPostFromId() {
        setPost(undefined);
        const response = await fetch("/posts/" + postid);
        const postFromApi = await response.json();
        setPost(postFromApi);
      }
      getPostFromId();
    }
  }, [postid]);
  return (
    <>
      <Header></Header>

      {post || !postid ? (
        <PostForm post={post}></PostForm>
      ) : (
        <div className="spinner-container">
          <Spinner animation="border"></Spinner>
        </div>
      )}
    </>
  );
}
export default Postpage;
