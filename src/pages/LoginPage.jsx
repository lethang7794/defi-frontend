import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import authActions from '../redux/actions/auth.actions';

import loginImage from '../images/login.png';

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
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
    dispatch(authActions.loginRequest({ email, password }));
  };

  // if (!isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='container'>
      <div
        className='LoginPage d-flex justify-content-center align-items-center text-center'
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        <div
          className='border border-primary px-4 py-5 d-flex flex-column justify-content-center align-items-center box-shadow'
          style={{ minWidth: '350px', borderRadius: '1rem' }}
        >
          <Form onSubmit={handleSubmit}>
            <div className='text-center mb-3 text-primary'>
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
                className='btn-block bg-primary'
                variant='primary'
                type='button'
                disabled
              >
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
                Loading...
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
            <p className='mt-2'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </Form>
        </div>
        <div
          style={{
            transform: 'scaleX(-1)',
          }}
          className='hidden lg:block'
        >
          <img src={loginImage} alt='' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
