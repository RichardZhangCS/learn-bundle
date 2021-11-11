import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";

function Header() {
  return (
    <section id="header">
      <header>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Tutorial Bundler</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Account</Nav.Link>
                <Nav.Link href="/">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </section>
  );
}

export default Header;
