import { Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
function PostCard(props) {
  let post = props.post;
  let index = props.index;
  console.log(post.user);
  return (
    <Card key={index} style={{ width: "18rem" }} className="m-2">
      <Card.Img
        variant="top"
        src={`data:image/${post.image.contentType};base64,${post.image.dataBase64Encoded}`}
      />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          By {post.user ? post.user.username : "Anonymous"}
        </Card.Subtitle>
        <Card.Text>{post.description}</Card.Text>
        <Badge>Beginner Friendly</Badge>
        <Badge bg="danger" className="ms-1">
          Outdated
        </Badge>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
