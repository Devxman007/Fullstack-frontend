import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Products from "../../components/Products";

const Home = ({ allProducts, cartItemsCount }) => {
  return (
    <>
      <Header cartItemsCount={cartItemsCount} />

      <main className="py-3">
        <Container>
          {/* <h1>Welcome to itjuana store</h1> */}
          <Products allProducts={allProducts} />
        </Container>
      </main>

      <Footer />
    </>
  );
};
export default Home;
