import React from 'react';
import PublicNavbar from '../PublicNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import AlertMsg from './AlertMsg';
import ProfilePage from '../Admin/ProfilePage';
import SideMenu from '../Admin/SideMenu';
import FriendListPage from '../Admin/FriendListPage';
import AddEditHabitPage from '../AddEditHabitPage';
import HabitListPage from '../Admin/HabitListPage';
import HabitDetailPage from '../HabitDetailPage';
import MessengerPage from '../Admin/MessengerPage';

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <SideMenu />
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route exact path='/admin/profile' component={ProfilePage} />
              <Route exact path='/admin/friends' component={FriendListPage} />
              <Route exact path='/admin/habits' component={HabitListPage} />
              <Route
                exact
                path='/admin/habits/:id'
                component={HabitDetailPage}
              />
              <Route
                exact
                path='/admin/habit/add'
                component={AddEditHabitPage}
              />
              <Route
                exact
                path='/admin/habit/edit/:id'
                component={AddEditHabitPage}
              />
              <Route exact path='/admin/messenger' component={MessengerPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
