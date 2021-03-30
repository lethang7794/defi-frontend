import React from 'react';
import { Card } from 'react-bootstrap';
// import Moment from 'react-moment';

const HabitCard = ({ habit, handleClick }) => {
  return (
    <Card onClick={() => handleClick(habit._id)}>
      <Card.Body>
        <Card.Title>{habit.name}</Card.Title>
        <Card.Text>
          {habit.goal.length <= 99
            ? habit.goal
            : habit.goal.slice(0, 99) + '...'}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer></Card.Footer> */}
    </Card>
  );
};

export default HabitCard;
