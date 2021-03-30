import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { habitActions } from '../redux/actions';

const Reactions = ({ reactionsData, targetType, targetId, size }) => {
  const loading = useSelector((state) => state.habit.submitLoading);
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(habitActions.sendEmojiReaction(targetType, targetId, emoji));
  };

  return (
    <div>
      <ul className='reactions'>
        <li>
          <button onClick={() => handleClick('like')} disabled={loading}>
            <FontAwesomeIcon icon='thumbs-up' size={size} />
          </button>
          {reactionsData?.like}{' '}
        </li>
        <li>
          <button onClick={() => handleClick('love')} disabled={loading}>
            <FontAwesomeIcon icon='heart' size={size} />
          </button>
          {reactionsData?.love}{' '}
        </li>
        <li>
          <button onClick={() => handleClick('laugh')} disabled={loading}>
            <FontAwesomeIcon icon='laugh' size={size} />
          </button>
          {reactionsData?.laugh}{' '}
        </li>
        <li>
          <button onClick={() => handleClick('sad')} disabled={loading}>
            <FontAwesomeIcon icon='sad-cry' size={size} />
          </button>
          {reactionsData?.sad}{' '}
        </li>
        <li>
          <button onClick={() => handleClick('angry')} disabled={loading}>
            <FontAwesomeIcon icon='angry' size={size} />
          </button>
          {reactionsData?.angry}{' '}
        </li>
      </ul>
    </div>
  );
};

export default Reactions;
