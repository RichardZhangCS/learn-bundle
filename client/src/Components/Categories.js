import { ListGroup } from "react-bootstrap";

function Categories({ selectedCategory, changeCategory }) {
  const categoryList = [
    "Web Development",
    "Machine Learning",
    "Cloud Computing",
    "Interview Prep",
  ];
  return (
    <ListGroup
      as="ul"
      className="category-list mb-3"
      onClick={(e) => {
        changeCategory(e.target.textContent);
      }}
    >
      {categoryList.map((category, index) => (
        <ListGroup.Item
          as="li"
          key={index}
          className={
            (category === selectedCategory && "active") + " category-button"
          }
        >
          {category}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Categories;
