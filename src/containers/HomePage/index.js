import React, { useState, useEffect } from 'react';
import { Container, CardColumns, Jumbotron, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { habitActions } from '../../redux/actions';
import HabitCard from '../../components/HabitCard';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory, Link } from 'react-router-dom';
import PaginationItem from '../../components/PaginationItem';
import LandingPage from '../LandingPage';

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.habit.loading);
  const habits = useSelector((state) => state.habit.habits);
  const totalPageNum = useSelector((state) => state.habit.totalPageNum);

  const history = useHistory();

  let currentUserId = user?._id;
  useEffect(() => {
    if (currentUserId) {
      dispatch(habitActions.getUserHabits(currentUserId, pageNum));
    }
  }, [dispatch, currentUserId, pageNum]);

  const handleClickOnHabit = (id) => {
    history.push(`/habits/${id}`);
  };

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <Container>
        <Jumbotron className='text-center'>
          <h1>Welcome{user.name ? `, ${user.name}` : ''}!</h1>
          <p>Let's have good habits.</p>
          {isAuthenticated && (
            <Link to='/habits/new'>
              <Button variant='primary'>Add habit</Button>
            </Link>
          )}
        </Jumbotron>
        {loading ? (
          <ClipLoader color='#f86c6b' size={150} loading={loading} />
        ) : (
          <>
            <PaginationItem
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPageNum}
              loading={loading}
            />
            {habits?.length ? (
              <>
                <CardColumns>
                  {habits.map((habit) => (
                    <HabitCard
                      habit={habit}
                      key={habit._id}
                      handleClick={handleClickOnHabit}
                    />
                  ))}
                </CardColumns>
              </>
            ) : (
              <p>There are no habits</p>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
