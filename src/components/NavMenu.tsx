import { useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const NavMenu = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.user);

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      expand={false}
      className='bg-purple'
      fixed='top'
    >
      <Container>
        <Navbar.Brand as={NavLink} to='/' className='text-white'>
          Quickett
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          className='border-0 text-white'
        />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/' className='text-white'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/classifications' className='text-white'>
              Classifications
            </Nav.Link>
            <Nav.Link as={NavLink} to='/items' className='text-white'>
              Items
            </Nav.Link>
            <Nav.Link as={NavLink} to='/shops' className='text-white'>
              Shops
            </Nav.Link>
            <Nav.Link as={NavLink} to='/reports' className='text-white'>
              Reports
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser.isAuth ? (
              <Nav.Link as={NavLink} to='/logout' className='text-white'>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to='/login' className='text-white'>
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
