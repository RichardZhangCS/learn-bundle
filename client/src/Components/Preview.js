import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "./../util/UserContext";

function Preview() {
  const [user] = useContext(UserContext);
  return (
    <section id="preview">
      <Container className="preview-container text-light text-center py-3">
        <h2>
          {user
            ? "Hello " + user.username + "!"
            : "Explore through the best online tutorials"}
        </h2>
        <p className="lead">
          Find the best tutorials tailored towards your needs for any skill
        </p>
        <p className="lead">
          {user
            ? "Create a new post to share outside online tutorials"
            : "Create an account to share an online tutorial with others"}
        </p>
        <Row className="px-5">
          <Col>
            <Button
              variant="primary"
              className="static-button float-end w-50"
              href={user ? "/post/add" : "/register"}
            >
              {user ? "Create a New Post" : "Register"}
            </Button>
          </Col>

          <Col>
            <Button
              variant="secondary"
              className="static-button float-start w-50"
              href={user ? "/accountSettings" : "/signin"}
            >
              {user ? "Account Settings" : "Sign In"}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Preview;
