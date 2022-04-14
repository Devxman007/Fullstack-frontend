import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ cartItemsCount }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              className="navbar-brand"
              src="https://itjuana.com/wp-content/uploads/ITJ_tm-logo.png"
              alt="itjuana-logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/checkout">
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount}Cart
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              <i className="fas fa-user"></i> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
