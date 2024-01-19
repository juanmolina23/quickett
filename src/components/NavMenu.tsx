import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const NavMenu = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.user);
  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      expand='lg'
      className='bg-body-tertiary'
      fixed='top'
    >
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Quickett
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser.isAuth ? (
              <Nav.Link as={NavLink} to='/logout'>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to='/login'>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
