import React, { /*useState, */ useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { habitActions } from '../../redux/actions';
import { completionActions } from '../../redux/actions';
import { Container, Button } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
// import Moment from 'react-moment';
// import Markdown from 'react-markdown';
// import ReviewList from '../../components/ReviewList';
// import ReviewHabit from '../../components/ReviewHabit';
// import Reactions from '../../components/Reactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HabitDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const habit = useSelector((state) => state.habit.selectedHabit);
  const loading = useSelector((state) => state.habit.loading);
  const currentUser = useSelector((state) => state.auth.user);
  // const submitLoading = useSelector((state) => state.habit.subReviewLoading);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  // const [reviewText, setReviewText] = useState('');
  // const handleInputChange = (e) => {
  //   setReviewText(e.target.value);
  // };
  // const handleSubmitReview = (e) => {
  //   e.preventDefault();
  //   dispatch(habitActions.createReview(habit._id, reviewText));
  //   setReviewText('');
  // };

  useEffect(() => {
    if (params?.id) {
      dispatch(habitActions.getSingleHabit(params.id));
    }
  }, [dispatch, params]);

  const handleSubmitCompletion = (e, habitId) => {
    e.preventDefault();
    dispatch(completionActions.createCompletion(currentUser._id, habitId));
  };

  const handleRemoveCompletion = (e, completionId) => {
    e.preventDefault();
    dispatch(completionActions.deleteCompletion(completionId));
  };

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  let habitIsDoneToday = false;
  if (
    habit?.lastCompletion &&
    isToday(new Date(habit?.lastCompletion?.completedDate))
  ) {
    habitIsDoneToday = true;
  }

  return (
    <Container>
      <div className='d-flex justify-content-between'>
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon='chevron-left' size='1x' /> Back
        </Button>

        {currentUser?._id === habit?.user?._id ? (
          <Link to={`/habits/${habit?._id}/edit`}>
            <Button variant='primary'>
              <FontAwesomeIcon icon='edit' size='1x' /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <ClipLoader color='#f86c6b' size={150} loading={loading} />
      ) : (
        <>
          {habit && (
            <div className='m-5'>
              <h4>{habit.name}</h4>
              <p>{habit.goal}</p>

              {habitIsDoneToday && (
                <button
                  onClick={(e) =>
                    handleRemoveCompletion(e, habit.lastCompletion._id)
                  }
                >
                  Uncheck today
                </button>
              )}

              {!habitIsDoneToday && (
                <button onClick={(e) => handleSubmitCompletion(e, habit._id)}>
                  Check today
                </button>
              )}
              {/* <span className='text-muted'>
                @{habit?.author?.name} wrote{' '}
                <Moment fromNow>{habit.createdAt}</Moment>
              </span> */}
              {/* <hr /> */}
              {/* <Markdown source={habit.content} />
              <hr />
              <Reactions
                reactionsData={habit.reactions}
                targetType='Habit'
                targetId={habit._id}
                size='lg'
              />
              <hr />
              <ReviewList reviews={habit.reviews} /> */}
            </div>
          )}

          {/* {isAuthenticated && (
            <ReviewHabit
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )} */}
        </>
      )}
    </Container>
  );
};

export default HabitDetailPage;
