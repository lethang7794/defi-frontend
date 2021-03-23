import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logoHorizontal from '../../images/logo-horizontal.png';
// import githubMark from '../../images/GitHub-Mark-64px.png';
import './style.css';

const MainNavBar = () => (
  <Navbar
    bg='light'
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
      {/* <Nav>
        <Nav.Link as={NavLink} exact to='/' eventKey='1'>
          Home
        </Nav.Link>
      </Nav> */}
      <Nav className='mx-auto'></Nav>
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
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavBar;
