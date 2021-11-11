import { Container, ListGroup } from "react-bootstrap";

function Categories() {
  return (
    <ListGroup as="ul" className="category-list mb-3">
      <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item as="li">Morbi leo risus</ListGroup.Item>
      <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  );
}

export default Categories;
