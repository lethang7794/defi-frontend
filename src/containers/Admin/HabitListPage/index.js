import React, { useState, useEffect } from 'react';
import SearchItem from '../../../components/SearchItem';
import PaginationItem from '../../../components/PaginationItem';
import { useSelector, useDispatch } from 'react-redux';
import { habitActions } from '../../../redux/actions';
import { Button, Row, Col, Container, Table, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const HabitListPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [myHabitOnly, setMyHabitOnly] = useState(false);
  const [sortBy, setSortBy] = useState({ key: '', ascending: -1 });
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.habit.loading);
  const habits = useSelector((state) => state.habit.habits);
  const currentUser = useSelector((state) => state.auth.user);
  const totalPageNum = useSelector((state) => state.habit.totalPageNum);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
    // dispatch(habitActions.habitsRequest(1));
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({
        key,
        ascending: -sortBy.ascending,
      }));
    }
  };

  const handleCheckMyHabitOnly = () => {
    if (myHabitOnly) {
      setMyHabitOnly(false);
    } else {
      setMyHabitOnly(currentUser._id);
    }
  };

  useEffect(() => {
    dispatch(
      habitActions.habitsRequest(pageNum, 10, query, myHabitOnly, sortBy)
    );
  }, [dispatch, pageNum, query, sortBy, myHabitOnly]);

  return (
    <Container fluid>
      <h4 className='mt-3'>Habit Manage</h4>
      <Row>
        <Col md={4}>
          <SearchItem
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
        <Col md={4} className='d-flex justify-content-end align-items-start'>
          <FormCheck
            type='checkbox'
            label='My Habits only'
            checked={myHabitOnly}
            onChange={handleCheckMyHabitOnly}
          />
        </Col>
        <Col md={4} className='d-flex justify-content-end align-items-start'>
          <Link className='btn btn-primary' to='/admin/habit/add'>
            <FontAwesomeIcon icon='plus' size='1x' /> Add
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='mouse-hover' onClick={() => handleSort('title')}>
                  Title <FontAwesomeIcon icon='sort' size='sm' />
                </th>
                <th>Author</th>
                <th
                  className='mouse-hover'
                  onClick={() => handleSort('reviewCount')}
                >
                  Review Count <FontAwesomeIcon icon='sort' size='sm' />
                </th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id}>
                  <td>
                    <Link to={`/admin/habits/${habit._id}`}>{habit.title}</Link>
                  </td>
                  <td>{habit.author.name}</td>
                  <td>{habit.reviewCount}</td>
                  <td>
                    <Moment fromNow>{habit.createdAt}</Moment>
                  </td>
                  <td>
                    {currentUser?._id === habit?.author?._id ? (
                      <Link to={`/admin/habit/edit/${habit._id}`}>
                        <Button variant='primary'>
                          <FontAwesomeIcon icon='edit' size='1x' /> Edit
                        </Button>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HabitListPage;
