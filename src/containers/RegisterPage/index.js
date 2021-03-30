import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/actions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeActions } from '../../redux/actions/route.actions';
import './style.css';
import signupImage from '../../images/signup.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    avatarUrl: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, avatarUrl } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: 'Passwords do not match' });
      return;
    }
    // TODO: handle Register
    dispatch(authActions.register(name, email, password, avatarUrl));
  };

  // const uploadWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  //       upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
  //       tags: ['socialHabit', 'userAvatar'],
  //     },
  //     function (error, result) {
  //       if (error) console.log(error);
  //       if (result && result.length && !error) {
  //         setFormData({
  //           ...formData,
  //           avatarUrl: result[0].secure_url,
  //         });
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === '__GO_BACK__') {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container>
      <div
        className='text-center LoginPage d-flex justify-content-center align-items-center'
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        <div
          className='signup__image flex-grow'
          style={{
            transform: 'scaleX(-1)',
          }}
        >
          <img src={signupImage} alt='' />
        </div>
        <div
          className='px-4 py-5 border border-primary d-flex flex-column justify-content-center align-items-center box-shadow'
          style={{ minWidth: '350px', borderRadius: '1rem' }}
        >
          <div className='mb-3 text-center text-primary'>
            <h1 className='text-primary'>Welcome!</h1>
            <p className='lead'>Start your journey today!</p>
          </div>
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className='form-text text-danger'>{errors.name}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='email'
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
              />
              {errors.password && (
                <small className='form-text text-danger'>
                  {errors.password}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>

            {loading ? (
              <Button
                className='btn-block'
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
                Sign Up
              </Button>
            )}

            <p className='mt-2'>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
