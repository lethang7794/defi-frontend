import { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { authActions } from './redux/actions/auth.actions';
import Routes from './components/Routes';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'undefined') {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      setTimeout(() => {
        dispatch(authActions.logout());
      }, 500);
    }
  }, [dispatch]);

  return (
    <div
      className='App'
      style={{
        // backgroundColor: '#F5F5F5',
        minHeight: '100vh',
      }}
    >
      <>
        {isAuthenticated === undefined ? (
          <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
            <Loader
              type='ThreeDots'
              color='hsl(211, 100%, 50%)'
              height={80}
              width={80}
            />
          </div>
        ) : (
          <Router>
            <Routes />
          </Router>
        )}
      </>
    </div>
  );
}

export default App;
