import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./adminnavigation.css";

const AdminNavigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Link to="/admin">
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
            <Nav.Link as={Link} to="/admin/create-product">
              <i className="fa fa-plus"></i> Add New Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AdminNavigation;
