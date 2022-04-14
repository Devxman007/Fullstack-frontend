import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className="img-thumbnail"
          src={product.ImageUrl}
          variant="top"
        />
      </Link>

      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title>
            <strong>{product.Name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating Rating={product.Rating} text={product.Reviews} />
        </Card.Text>
        <Card.Text as="h3">${product.Price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Product;
