import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-horizontal.png';
import './style.css';
import { useSelector } from 'react-redux';
import { authActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Cross as Hamburger } from 'hamburger-react';

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === 'admin';

  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const publicLinks = (
    <Nav>
      <Nav.Link as={NavLink} exact to='/login' eventKey='2'>
        Login
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        exact
        to='/register'
        eventKey='3'
        className='register-button'
      >
        Try for free
      </Nav.Link>
    </Nav>
  );

  const authLinks = (
    <Nav>
      <Nav.Link onClick={handleLogout} eventKey='5'>
        Logout
      </Nav.Link>
    </Nav>
  );

  const adminLinks = (
    <Nav>
      <Nav.Link as={NavLink} to='/admin' eventKey='4'>
        Admin
      </Nav.Link>
      <Nav.Link onClick={handleLogout} eventKey='5'>
        Logout
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar
      expand='lg'
      style={{
        padding: '0.75rem 0rem',
        borderTop: '8px solid hsl(211, 100%, 50%)',
      }}
      collapseOnSelect
    >
      <Navbar.Brand>
        <Nav.Link as={NavLink} exact to='/'>
          <img src={logo} alt='Defi' height='60' width='186' />
        </Nav.Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </Navbar.Toggle>

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mx-auto'></Nav>
        {!loading && (
          <>
            <>{!isAuthenticated && publicLinks}</>
            <>{isAuthenticated && !isAdmin && authLinks}</>
            <>{isAuthenticated && isAdmin && adminLinks}</>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
