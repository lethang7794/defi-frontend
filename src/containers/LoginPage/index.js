import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/actions';
// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from 'react-google-login';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FB_APP_ID, GOOGLE_CLIENT_ID } from '../../config/constants';
import loginImage from '../../images/login.png';
import './style.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: 'Password must be longer than 3' });
      return;
    }
    dispatch(authActions.loginRequest(email, password));
  };

  // const loginWithFacebook = (response) => {
  //   dispatch(authActions.loginFacebookRequest(response.accessToken));
  // };

  // const loginWithGoogle = (response) => {
  //   dispatch(authActions.loginGoogleRequest(response.accessToken));
  // };

  if (isAuthenticated) return <Redirect to='/' />;
  return (
    <Container>
      <div
        className='text-center LoginPage d-flex justify-content-center align-items-center'
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        <div
          className='px-4 py-5 border border-primary d-flex flex-column justify-content-center align-items-center box-shadow'
          style={{ minWidth: '350px', borderRadius: '1rem' }}
        >
          <Form onSubmit={handleSubmit}>
            <div className='mb-3 text-center text-primary'>
              <h1 className='text-primary'>Welcome back!</h1>
              <p className='lead'>Let's do it!</p>
            </div>
            <Form.Group>
              <Form.Control
                type='email'
                required
                placeholder='Email Address'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className='form-text text-danger'>{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                minLength='3'
              />
              {errors.password && (
                <small className='form-text text-danger'>
                  {errors.password}
                </small>
              )}
            </Form.Group>

            {loading ? (
              <Button
                className='flex items-center justify-center btn-block bg-primary'
                variant='primary'
                type='button'
                disabled
              >
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              </Button>
            ) : (
              <Button
                className='btn-block bg-primary'
                type='submit'
                variant='primary'
              >
                Login
              </Button>
            )}
            {/* <hr />
            <div className='d-flex flex-column text-center'>
              <FacebookLogin
                appId={FB_APP_ID}
                fields='name,email,picture'
                callback={loginWithFacebook}
                icon='fa-facebook'
                onFailure={(err) => {
                  console.log('FB LOGIN ERROR:', err);
                }}
                containerStyle={{
                  textAlign: 'center',
                  backgroundColor: '#3b5998',
                  borderColor: '#3b5998',
                  flex: 1,
                  display: 'flex',
                  color: '#fff',
                  cursor: 'pointer',
                  marginBottom: '3px',
                }}
                buttonStyle={{
                  flex: 1,
                  textTransform: 'none',
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                }}
              />

              <GoogleLogin
                className='google-btn d-flex justify-content-center'
                clientId={GOOGLE_CLIENT_ID}
                buttonText='Login with Google'
                onSuccess={loginWithGoogle}
                onFailure={(err) => {
                  console.log('GOOGLE LOGIN ERROR:', err);
                }}
                cookiePolicy='single_host_origin'
              />
            </div> */}
            <p>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </Form>
        </div>
        <div
          style={{
            transform: 'scaleX(-1)',
          }}
          className='login__image flex-grow hidden lg:block'
        >
          <img src={loginImage} alt='' />
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
