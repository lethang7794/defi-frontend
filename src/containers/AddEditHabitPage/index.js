import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { habitActions } from '../../redux/actions';
import { routeActions } from '../../redux/actions/route.actions';

const AddEditHabitPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
  });

  const loading = useSelector((state) => state.habit.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedHabit = useSelector((state) => state.habit.selectedHabit);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const addOrEdit = params.id ? 'Edit' : 'Add';
  const habitId = params.id;

  useEffect(() => {
    if (habitId) {
      if (!selectedHabit) {
        dispatch(habitActions.getSingleHabit(habitId));
      }

      setFormData((formData) => ({
        ...formData,
        name: selectedHabit?.name,
        goal: selectedHabit?.goal,
      }));
    }
  }, [habitId, selectedHabit, dispatch]);

  const handleChange = (e) => {
    // if (e.target.name === 'images') {
    //   console.log(e.target.files);
    //   setFormData({ ...formData, images: e.target.files });
    // } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, goal } = formData;
    if (addOrEdit === 'Add') {
      dispatch(habitActions.createNewHabit(name, goal));
    } else if (addOrEdit === 'Edit') {
      dispatch(habitActions.updateHabit(selectedHabit._id, name, goal));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    // TODO : popup confirmation modal
    dispatch(habitActions.deleteHabit(selectedHabit._id));
  };

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
  }, [redirectTo, dispatch, history]);

  // const uploadWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  //       upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
  //       tags: ["socialHabit", "habitImages"],
  //     },
  //     function (error, result) {
  //       if (result && result.length) {
  //         setFormData({
  //           ...formData,
  //           images: result.map((res) => res.secure_url),
  //         });
  //       }
  //     }
  //   );
  // };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className='text-center mb-3'>
              <h1 className='text-primary'>{addOrEdit} habit</h1>
              <p className='lead'>
                <i className='fas fa-user' />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type='text'
                required
                placeholder='Habit'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as='textarea'
                placeholder='Goal'
                name='goal'
                value={formData.goal}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Control
                type="file"
                name="images"
                multiple
                accept="image/png image/jpeg image/jpg"
                onChange={handleChange}
              />
            </Form.Group> */}
            {/* <Form.Group>
              {formData.images &&
                formData.images.length > 0 &&
                formData.images.map((image) => (
                  <img
                    src={image}
                    key={image}
                    width='90px'
                    height='60px'
                    alt='habit images'
                  ></img>
                ))}
              <Button variant='info' onClick={uploadWidget}>
                {addOrEdit} Images
              </Button>
            </Form.Group> */}
            <ButtonGroup className='d-flex mb-3'>
              {loading ? (
                <Button
                  className='mr-3'
                  variant='primary'
                  type='button'
                  disabled
                >
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className='mr-3' type='submit' variant='primary'>
                  Submit
                </Button>
              )}
              <Button variant='light' onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === 'Edit' && (
              <ButtonGroup className='d-flex'>
                <Button
                  variant='danger'
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Habit
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditHabitPage;
