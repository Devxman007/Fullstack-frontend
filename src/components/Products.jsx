import { Col, Row } from "react-bootstrap";
import Product from "./Product";

const Products = ({ allProducts }) => {
  return (
    <>
      <h1>Products List</h1>
      <Row>
        {allProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Products;
