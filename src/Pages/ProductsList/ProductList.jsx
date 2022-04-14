import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";
import "./productlist.css";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";

import { deleteProduct } from "../../API/productApi";
import AdminNavigation from "../../components/AdminNavigation";

const ProductList = ({ allProducts }) => {
  const removeProduct = async (id) => {
    const removedProduct = await deleteProduct(id);
    if (removedProduct) {
      toast.success("product removed");
    } else {
      toast.error("couldn't remove product");
    }
  };
  return (
    <div>
      <AdminNavigation />
      <Container>
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
              <th>Description</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Quantity</th>
              <th>Reviews</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
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
                <td>{product.Description}</td>
                <td>{product.Price}</td>
                <td>{product.Brand}</td>
                <td>{product.Category}</td>
                <td>
                  {typeof product.Rating === "undefined"
                    ? "Not rated yet"
                    : product.Rating}
                </td>
                <td>{product.Quantity}</td>
                <td>{product.Reviews}</td>
                <td>
                  <Link
                    to={`create-product/${product._id}`}
                    variant="light"
                    className="btn-sm"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Button
                    onClick={() => removeProduct(product._id)}
                    variant="danger"
                    className="btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
export default ProductList;
