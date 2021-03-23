import { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import authActions from './redux/actions/auth.actions';
import Routes from './components/Routes';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'undefined') {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
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
          <p>Loading...</p>
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
