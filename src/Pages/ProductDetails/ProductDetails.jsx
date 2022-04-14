import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { getProduct } from "../../API/productApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Rating from "../../components/Rating";

const ProductDetails = ({ cartProductsItems, cartItemsCount }) => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState();
  const [qtyy, setQtyy] = useState(1);
  useEffect(() => {
    if (id) getProductById(id);
  }, [id]);

  const getProductById = async (productId) => {
    if (productId) {
      const product = await getProduct(productId);

      if (product) setProduct(product);
    }
  };

  return (
    <>
      <Header cartItemsCount={cartItemsCount} />

      <Container>
        <Link to={"/"} className="btn btn-dark my-3  text-light">
          <i className="fa fa-arrow-left px-2" aria-hidden="true"></i>
          Back
        </Link>
        <Row>
          <Col md={6}>
            <Image fluid src={product?.ImageUrl} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.Name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  color=""
                  Rating={product?.Rating}
                  text={product?.Reviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product?.Price}</ListGroup.Item>
              <ListGroup.Item>
                Description : ${product?.Description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.Price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        ${product?.Quantity >= 0 ? "In stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                {product?.Quantity > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          defaultValue={1}
                          onChange={(e) => setQtyy(e.target.value)}
                        >
                          {[...Array(product.Quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    //to={`/cart/${product?._id}/${qty}`}
                    onClick={() => cartProductsItems(id, qtyy)}
                    type="button"
                    className="btn btn-dark w-100"
                    disabled={
                      product?.Quantity === 0 ||
                      typeof product?.Quantity === "undefined"
                    }
                  >
                    Add to cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default ProductDetails;
