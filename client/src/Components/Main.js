import { Form, InputGroup, Row, Col } from "react-bootstrap";
import Categories from "./Categories";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
function Main() {
  const [posts, setPosts] = useState(null);
  const [category, setCategory] = useState(null);

  let categoryFilterer = (post) => {
    if (!category) return true;
    if (post.title.toLowerCase().includes(category.toLowerCase())) {
      return true;
    }
    for (let tags of post.tags) {
      if (tags.toLowerCase().includes(category.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  let changeCategory = (newCategory) => {
    if (category !== newCategory) {
      setCategory(newCategory);
    } else {
      setCategory(null);
    }
  };

  useEffect(() => {
    const getPostsFromApi = async () => {
      try {
        let res = await fetch("http://localhost:9000/posts", {
          credentials: "include",
          withCredentials: true,
        });
        let json = await res.json();
        setPosts(json);
      } catch (e) {
        setPosts([]);
      }
    };
    getPostsFromApi();
  }, []);

  return (
    <section className="main">
      <Container className="p-5">
        <Row className="justify-content-center">
          <Col xs={8} xl={4}>
            <Categories
              selectedCategory={category}
              changeCategory={changeCategory}
            ></Categories>
          </Col>
          <Col className="d-inline-flex flex-column align-items-center">
            <div className="p-4 bg-light d-flex justify-content-center align-items-center rounded">
              <InputGroup>
                {/* <div className="form-floating"> */}
                <Form.Control
                  type="search"
                  id="input-search"
                  placeholder="I want to learn..."
                />
                {/* <label htmlFor="input-search-query">I want to learn...</label> */}
                {/* </div> */}
                <Button variant="primary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </div>
            <Row className="post-card-container">
              {!posts ? (
                <div className="spinner-container">
                  <Spinner
                    className="post-loading-spinner"
                    animation="border"
                  />
                </div>
              ) : posts.length !== 0 ? (
                posts
                  .filter(categoryFilterer)
                  .map((post, index) => (
                    <PostCard post={post} index={index} key={index}></PostCard>
                  ))
              ) : (
                <p className="lead">
                  Seems like the database is sleepy today :(
                </p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Main;
