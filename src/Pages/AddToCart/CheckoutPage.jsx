import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const CheckoutPage = ({
  cartItemsCount,
  cartItems,
  cartProductsItemIncrement,
  cartProductsItemdecrement,
  saveOrder,
}) => {
  const initialValue = {
    Name: "",
    Address: "",
    total: 0,
    products: [
      {
        Name: "",
        ImageUrl: "",
        Description: "",
        Price: "",
        Brand: "",
        Category: "",
        Quantity: "",
      },
    ],
  };
  const [order, setOrder] = useState(initialValue);
  const navigate = useNavigate();
  let totalPrice = 0;

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setOrder({
      ...order,
      [name]: value,
      products: cartItems,
      total: totalPrice,
    });
  };

  const checkout = async (order) => {
    const response = await saveOrder(order);

    if (response) {
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <Header cartItemsCount={cartItemsCount} />
      <Container>
        <Row>
          <Col md={8}>
            <h1>
              {cartItems.length === 0 ? "Shopping Cart empty" : "Products"}
            </h1>
          </Col>
          {cartItems.length === 0 ? (
            <Link to={"/"}>Go to the Store</Link>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm mt-5"
                id="customers"
              >
                <thead className="bg-dark text-white">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product, index) => {
                    totalPrice += product.Price * product.qtyy;

                    return (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.Name}</td>
                        <td>
                          <img
                            width="100px"
                            height="100px"
                            src={product.ImageUrl}
                            alt={product.Name}
                          />
                        </td>

                        <td>{product.Price}</td>

                        <td>
                          <Button
                            onClick={() =>
                              cartProductsItemdecrement(product._id)
                            }
                          >
                            -
                          </Button>
                          {product.qtyy}
                          <Button
                            onClick={() =>
                              cartProductsItemIncrement(product._id)
                            }
                          >
                            +
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <form>
                <p>
                  Please filed the information Below and click the checkout to
                  submit your order
                </p>
                <div className="form-group">
                  <label htmlFor="Name">Name*:</label>
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    value={order.Name || ""}
                    onChange={handleOnChange}
                    placeholder="Enter product Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Name">Shipping Adresse*:</label>
                  <textarea
                    type="textArea"
                    name="Address"
                    className="form-control"
                    value={order.Address || ""}
                    onChange={handleOnChange}
                    placeholder="Enter Shipping Adresse"
                  />
                </div>
              </form>
              <p>{order.Name}</p>
              <p>{order.Adresse}</p>
              {order.products.map((p, index) => (
                <div>
                  <p key={p._id + index}>{p.Name}</p>
                  <p>{p.Price}</p>
                </div>
              ))}
              <div className="col-md-12 d-flex flex-row-reverse">
                <div className="col-md-4">
                  <div className="card card-body mt-3">
                    <h4>
                      Total :<span className="float-end">{totalPrice}</span>
                    </h4>
                    <hr />
                    <Button
                      onClick={() => checkout(order)}
                      disabled={order.Name === "" || order.Adresse === ""}
                      className="btn btn-dark py-2 mt-5"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};
export default CheckoutPage;
