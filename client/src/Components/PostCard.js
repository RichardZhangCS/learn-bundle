import { Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { stringToColour, pickTextColorBasedOnBgColor } from "../util/TextColor";
function PostCard(props) {
  let post = props.post;
  let index = props.index;
  const directToPostPage = () => {
    window.location = `/posts/${post._id}/view`;
  };
  return (
    <Card
      key={index}
      style={{ width: "18rem" }}
      className="m-2 post-card pt-2"
      onClick={directToPostPage.bind(this)}
    >
      <Card.Img
        variant="top"
        src={`data:image/${post.image.contentType};base64,${post.image.dataBase64Encoded}`}
      />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          By {post.user ? post.user.username : "Anonymous"}
        </Card.Subtitle>
        <Card.Text className="card-description">{post.description}</Card.Text>
        <Card.Text className="card-prereqs">
          Prerequisites: {post.prereqs}
        </Card.Text>
        <Card.Text>{post.submission_date_formatted}</Card.Text>
        {post.tags.map((tag, index) => {
          let bgColor = stringToColour(tag);
          let textColor = pickTextColorBasedOnBgColor(bgColor);
          return (
            <Badge
              className="me-1"
              ref={(el) => {
                if (el) {
                  el.style.setProperty(
                    "background-color",
                    bgColor,
                    "important"
                  );
                  el.style.setProperty("color", textColor, "important");
                }
              }}
              key={index}
            >
              {tag}
            </Badge>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default PostCard;
