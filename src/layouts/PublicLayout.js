import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import PublicNavBar from '../components/PublicNavBar';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import AlertMsg from '../components/AlertMsg';
import ProductDetailPage from '../pages/ProductDetailPage';
// import PrivateRoute from '../Routes/PrivateRoute';

const PublicLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Container>
        <AlertMsg />
      </Container>

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/products/:id' component={ProductDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
