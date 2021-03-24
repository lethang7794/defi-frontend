import React from 'react';
import PublicNavBar from '../components/PublicNavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import AlertMsg from '../components/AlertMsg';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === 'admin';

  return (
    <>
      <PublicNavBar />
      <Container fluid>
        <Row>
          <Col>
            <AlertMsg />
            <>
              {!isAdmin && <div>You must be an admin to access this page.</div>}
              {isAdmin && (
                <Switch>
                  <Route exact path='/admin'>
                    Admin Page
                  </Route>
                  <Route component={NotFoundPage} />
                </Switch>
              )}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
