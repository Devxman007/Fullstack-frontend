import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./addproduct.css";
import { useParams } from "react-router-dom";
import { getProduct } from "../../API/productApi";
import AdminNavigation from "../../components/AdminNavigation";

const AddProduct = ({ saveProduct }) => {
  const defaultNewProduct = {
    Name: "",
    ImageUrl: "",
    Description: "",
    Price: "",
    Brand: "",
    Category: "",
    Quantity: "",
  };

  const params = useParams();
  const { id } = params;
  const [newProduct, setNewProduct] = useState(defaultNewProduct);
  useEffect(() => {
    getProductById(id);
  }, [id]);

  const getProductById = async (productId) => {
    if (productId) {
      const product = await getProduct(productId);
      console.log(productId);
      if (product) setNewProduct(product);
    }
  };

  const handleOnchange = (event) => {
    const name = event.target.name;
    const value = name === "Price" ? +event.target.value : event.target.value;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <>
      <AdminNavigation />
      <Container className="addProduct">
        <h1>{typeof id === "undefined" ? "Add Product" : "Edit Product"}</h1>
        <form>
          <div className="form-group">
            <label htmlFor="Name">Name*</label>
            <input
              type="text"
              name="Name"
              className="form-control"
              id="Name"
              value={newProduct.Name || ""}
              onChange={handleOnchange}
              placeholder="Enter product Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ImageUrl">Image*</label>
            <input
              type="text"
              name="ImageUrl"
              className="form-control"
              id="ImageUrl"
              value={newProduct.ImageUrl || ""}
              onChange={handleOnchange}
              placeholder="Enter product image url"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              name="Description"
              className="form-control"
              id="Description"
              value={newProduct.Description || ""}
              onChange={handleOnchange}
              placeholder="Enter product Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Price">Price*</label>
            <input
              type="text"
              name="Price"
              className="form-control"
              id="Price"
              value={newProduct.Price || ""}
              onChange={handleOnchange}
              placeholder="Enter product Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Brand">Brand</label>
            <input
              type="text"
              name="Brand"
              className="form-control"
              id="Brand"
              value={newProduct.Brand || ""}
              onChange={handleOnchange}
              placeholder="Enter product Brand"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <input
              type="text"
              name="Category"
              className="form-control"
              id="Category"
              value={newProduct.Category || ""}
              onChange={handleOnchange}
              placeholder="Enter product Category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="form-control"
              id="Quantity"
              value={newProduct.Quantity || ""}
              onChange={handleOnchange}
              placeholder="Enter product Quantity"
            />
          </div>
          <button
            type="button"
            className="btn btn-dark btn-lg mt-5"
            disabled={
              newProduct.Name === "" ||
              newProduct.ImageUrl === "" ||
              newProduct.Price === ""
            }
            onClick={() => {
              typeof id === "undefined"
                ? saveProduct(newProduct)
                : saveProduct(id, newProduct);
            }}
          >
            {typeof id === "undefined" ? "Add Product" : "Edit Product"}
          </button>
        </form>
      </Container>
    </>
  );
};
export default AddProduct;
