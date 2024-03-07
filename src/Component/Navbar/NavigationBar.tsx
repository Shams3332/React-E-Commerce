import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/Store';
import { logout } from '../Redux/TokenSlice';
import useRole from '../user Role/userRole';
import { cartContext } from '../context/cartContext';
import { useContext } from 'react';

export default function NavigationBar() {

  let { numOfCartItems } = useContext(cartContext);
  
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useRole();

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem('role');
    navigate("/logInUser");
  }

  const adminLinks = role === 'admin' ? (
    <>
      <Nav.Link as={Link} to="adminCategory">
        Add Category
      </Nav.Link>
      <Nav.Link as={Link} to="adminProduct">
        Add Product
      </Nav.Link>
      <Nav.Link>
        {' '}
        <button onClick={handleLogout} className="btn btn-success">
          LogOut
        </button>
      </Nav.Link>
    </>
  ) : null;

  const userLinks = role === 'user' ? (
    <>

<Nav.Link as={Link} to="about">
        About
      </Nav.Link>
      <Nav.Link as={Link} to="contact">
        Contact
      </Nav.Link>
      <Nav.Link as={Link} to="shop">
        Shop
      </Nav.Link>

      <Nav.Link as={Link} to="userProfile">
        Profile
      </Nav.Link>

      <Nav.Link as={Link} to="cart">
  <button
    className="rounded-circle border-1 position-relative"
    style={{
      width: '3rem',
      height: '3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <i className="fa-solid fa-cart-shopping fs-4"></i>
    <div
      className="rounded-circle bg-success d-flex justify-content-center align-items-center"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(25%, 25%)',
        width: '1.5rem',
        height: '1.5rem',
        fontSize: '1rem',
        color: '#fff'
      }}
    >
      {numOfCartItems}
      
    </div>
  </button>
</Nav.Link>



      <Nav.Link>
        {' '}
        <button onClick={handleLogout} className="btn btn-success">
          LogOut
        </button>
      </Nav.Link>
    </>
  ) : null;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary"  sticky='top'>
        <Container>
          <Navbar.Brand href="#" className="text-success">
            <h1>Zay</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 d-flex align-items-center"
              navbarScroll
            >
              {token ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  {adminLinks}
                  {userLinks}
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="register">
                    Register
                  </Nav.Link>
                  <NavDropdown title="LogIn" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="loginAdmin">
                      Admin
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="loginUser">
                      User
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}