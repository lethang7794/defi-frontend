import React from 'react';
import './style.css';
import activityTracker from './images/activity-tracker.png';
import confetti from './images/Confetti-Doodles.svg';

function LandingPage() {
  return (
    <div
      className='LandingPage'
      style={{
        backgroundImage: `url(${confetti})`,
        backgroundPositionY: 'bottom',
      }}
    >
      <div className='d-flex flex-column align-items-center'>
        <div
          className='d-flex flex-column align-items-center p-5'
          style={{ maxWidth: '960px' }}
        >
          <img src={activityTracker} alt='' min-height='550px' />
          <h1
            className='text-center bg-white'
            style={{ fontWeight: '600', fontSize: '3rem', maxWidth: '800px' }}
          >
            Habit tracker with friends
          </h1>
          <h2
            className='bg-white text-center'
            style={{ color: '#808d9f', maxWidth: '800px', fontSize: '36px' }}
          >
            Let's everyone help you build your habit
          </h2>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
