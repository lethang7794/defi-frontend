import React from 'react';
import PublicNavbar from '../PublicNavbar';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import AlertMsg from './AlertMsg';
import HabitDetailPage from '../HabitDetailPage';
import AddEditHabitPage from '../AddEditHabitPage';
import PrivateRoute from '../Routes/PrivateRoute';
import VerifyEmailPage from '../VerifyEmailPage';

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <AlertMsg />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />

        <PrivateRoute exact path='/habits/new' component={AddEditHabitPage} />
        <Route exact path='/habits/:id' component={HabitDetailPage} />

        <Route exact path='/verify/:code' component={VerifyEmailPage} />
        <PrivateRoute
          exact
          path='/habits/:id/edit'
          component={AddEditHabitPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
