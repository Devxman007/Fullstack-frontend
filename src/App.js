import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./Pages/AddProduct/AddProduct";
import { saveOrder } from "./API/productApi";

import ProductList from "./Pages/ProductsList/ProductList";
import Home from "./Pages/Home/Home";
import {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "./API/productApi";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CheckoutPage from "./Pages/AddToCart/CheckoutPage";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  let sum = 0;
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, [allProducts]);

  useEffect(() => {
    countItems(cartItems);
  });

  const countItems = (cartItemsCopy) => {
    const countItems = cartItemsCopy.map((p) => (sum = sum + p.qtyy));

    setCartItemsCount(countItems);
  };

  const getAllProducts = async () => {
    const products = await getProducts();
    if (products) {
      setAllProducts(products);
    }
  };

  const cartProductsItemIncrement = async (id) => {
    const product = await getProduct(id);
    let cartItemsCopy = Array.from(cartItems);
    if (product) {
      const existProduct = cartItemsCopy.find(
        (item) => item._id === product._id
      );

      if (existProduct) {
        cartItemsCopy = cartItems.map((item) =>
          item._id === product._id
            ? { ...existProduct, qtyy: existProduct.qtyy + 1 }
            : item
        );
        setCartItems(cartItemsCopy);
      }
    }
    countItems(cartItemsCopy);
  };
  const cartProductsItemdecrement = async (id) => {
    const product = await getProduct(id);
    let cartItemsCopy = Array.from(cartItems);
    if (product) {
      const existProduct = cartItemsCopy.find(
        (item) => item._id === product._id
      );

      if (existProduct.qtyy > 1) {
        cartItemsCopy = cartItems.map((item) =>
          item._id === product._id
            ? { ...existProduct, qtyy: existProduct.qtyy - 1 }
            : item
        );

        setCartItems(cartItemsCopy);
      } else {
        cartItemsCopy = cartItemsCopy.filter(
          (item) => item._id !== existProduct._id
        );
        setCartItems(cartItemsCopy);
      }
    }
    countItems(cartItemsCopy);
  };
  const cartProductsItems = async (id, qty) => {
    const product = await getProduct(id);
    let cartItemsCopy = Array.from(cartItems);
    if (product) {
      const existProduct = cartItemsCopy.find(
        (item) => item._id === product._id
      );

      if (existProduct) {
        cartItemsCopy = cartItems.map((item) =>
          item._id === product._id
            ? { ...existProduct, qtyy: existProduct.qtyy + +qty }
            : item
        );
        setCartItems(cartItemsCopy);
        toast.success("product added to the cart");
      } else {
        setCartItems([...cartItems, { ...product, qtyy: +qty }]);
        toast.success("product added to the cart");
      }
    }
    countItems(cartItemsCopy);
  };

  const handleOnSaveProduct = async (product) => {
    const saveProd = await saveProduct(product);

    if (saveProduct) {
      setAllProducts([...allProducts, saveProd]);
      toast.success("Product Added");
    } else {
      toast.error("Couldn't Add product");
    }

    navigate("admin", { replace: true });
  };
  const handleOnEditProduct = async (productId, product) => {
    const editedProduct = await updateProduct(productId, product);
    if (editedProduct) {
      const copyArray = Array.from(allProducts);
      const result = copyArray.filter((p) => p._id !== productId);
      setAllProducts([...result, editedProduct]);
      toast.success("Product edited");
    } else {
      toast.error("Couldn't edit product");
    }

    navigate("admin", { replace: true });
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home allProducts={allProducts} cartItemsCount={cartItemsCount} />
            }
          />

          <Route
            path="checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                cartProductsItems={cartProductsItems}
                cartProductsItemIncrement={cartProductsItemIncrement}
                cartProductsItemdecrement={cartProductsItemdecrement}
                cartItemsCount={cartItemsCount}
                saveOrder={saveOrder}
              />
            }
          />

          <Route
            path="product/:id"
            element={
              <ProductDetails
                cartProductsItems={cartProductsItems}
                cartItemsCount={cartItemsCount}
              />
            }
          />
        </Route>

        <Route path="admin">
          <Route index element={<ProductList allProducts={allProducts} />} />
          <Route
            path="create-product"
            element={<AddProduct saveProduct={handleOnSaveProduct} />}
          />
          <Route
            path="create-product/:id"
            element={<AddProduct saveProduct={handleOnEditProduct} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
