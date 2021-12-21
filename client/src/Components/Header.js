import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import UserContext from "./../util/UserContext";
import { useContext } from "react";

function Header() {
  const [user] = useContext(UserContext);

  const handleClick = async (e) => {
    if (user) {
      const signOutResult = await fetch("/signout", {
        credentials: "include",
      });
      if (signOutResult.status === 200) {
        localStorage.removeItem("user");
        window.location = "/signin";
      }
    } else {
      window.location = "/register";
    }
  };

  return (
    <section id="header">
      <header>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Learn Bundle</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {user && <Nav.Link href="/myposts">My Posts</Nav.Link>}
                <Nav.Link href={user ? "/account" : "/signin"}>
                  {user ? "Account" : "Sign In"}
                </Nav.Link>
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
