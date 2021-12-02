import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import UserContext from "./../util/UserContext";
import { useContext } from "react";

function Header() {
  const [user, setUser] = useContext(UserContext);

  const handleClick = async (e) => {
    if (user) {
      const signOutResult = await fetch("/signout", {
        credentials: "include",
      });
      if (signOutResult.status == 200) {
        window.location = "/signin";
      }
    }
  };

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
                <Nav.Link onClick={handleClick.bind(this)}>
                  {user ? "Sign Out" : "Register"}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </section>
  );
}

export default Header;
