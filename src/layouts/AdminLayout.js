import React from 'react';
import PublicNavBar from '../components/PublicNavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import AlertMsg from '../components/AlertMsg';

const AdminLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Container fluid>
        <Row>
          <Col>
            <AlertMsg />
            <Switch>
              <Route exact path='/'>
                Admin Page
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
