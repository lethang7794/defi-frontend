import * as types from '../constants/habit.constants';
import api from '../api';
import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const createCompletion = (userId, habitId) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMPLETION_REQUEST, payload: null });
  try {
    const res = await api.post(`/users/${userId}/completions`, {
      habit: habitId,
      completedDate: new Date(),
    });

    dispatch({
      type: types.CREATE_COMPLETION_SUCCESS,
      payload: res.data.data,
    });

    // dispatch(routeActions.redirect('__GO_BACK__'));
    // toast.success('New completion has been created!');
  } catch (error) {
    dispatch({ type: types.CREATE_COMPLETION_FAILURE, payload: error });
  }
};

const deleteCompletion = (completionId) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMPLETION_REQUEST, payload: null });
  try {
    const res = await api.delete(`/completions/${completionId}`);
    dispatch({
      type: types.DELETE_COMPLETION_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect('/'));
    toast.success('The completion has been deleted!');
  } catch (error) {
    dispatch({ type: types.DELETE_COMPLETION_FAILURE, payload: error });
  }
};

export const completionActions = {
  createCompletion,
  deleteCompletion,
};
