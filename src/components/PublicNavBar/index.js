import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import logoHorizontal from '../../images/logo-horizontal.png';
// import githubMark from '../../images/GitHub-Mark-64px.png';
import './style.css';

const PublicNavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
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
      <Nav.Link as={NavLink} to='/admin/profile' eventKey='4'>
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
        padding: '0.75rem 1rem',
        borderTop: '8px solid hsl(211, 100%, 50%)',
      }}
      collapseOnSelect
    >
      <Navbar.Brand>
        <Nav.Link as={NavLink} exact to='/'>
          <img src={logoHorizontal} alt='CoderSchool' height='60' width='186' />
        </Nav.Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mx-auto'></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default PublicNavBar;
