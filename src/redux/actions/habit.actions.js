import * as types from '../constants/habit.constants';
import api from '../api';
import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const getUserHabits = (userId, pageNum = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: types.GET_USER_HABITS_REQUEST, payload: null });
  try {
    const res = await api.get(
      `/users/${userId}/habits?page=${pageNum}&limit=${limit}`
    );
    dispatch({
      type: types.GET_USER_HABITS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_HABITS_FAILURE, payload: error });
  }
};

const habitsRequest = (
  pageNum = 1,
  limit = 10,
  query = null,
  ownerId = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.HABIT_REQUEST, payload: null });
  try {
    let queryString = '';
    if (query) {
      queryString = `&title[$regex]=${query}&title[$options]=i`;
    }
    if (ownerId) {
      queryString = `${queryString}&author=${ownerId}`;
    }
    let sortByString = '';
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/habits?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.HABIT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.HABIT_REQUEST_FAILURE, payload: error });
  }
};

const getSingleHabit = (habitId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_HABIT_REQUEST, payload: null });
  try {
    const res = await api.get(`/habits/${habitId}`);
    dispatch({
      type: types.GET_SINGLE_HABIT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_HABIT_FAILURE, payload: error });
  }
};

const createNewHabit = (name, goal) => async (dispatch) => {
  dispatch({ type: types.CREATE_HABIT_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/habits", formData);

    // Upload images using cloudinary already
    const res = await api.post('/habits', { name, goal });

    dispatch({
      type: types.CREATE_HABIT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect('__GO_BACK__'));
    toast.success('New habit has been created!');
  } catch (error) {
    dispatch({ type: types.CREATE_HABIT_FAILURE, payload: error });
  }
};

const updateHabit = (habitId, name, goal) => async (dispatch) => {
  dispatch({ type: types.UPDATE_HABIT_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/habits/${habitId}`, { name, goal });

    dispatch({
      type: types.UPDATE_HABIT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect('__GO_BACK__'));
    toast.success('The habit has been updated!');
  } catch (error) {
    dispatch({ type: types.UPDATE_HABIT_FAILURE, payload: error });
  }
};

const deleteHabit = (habitId) => async (dispatch) => {
  dispatch({ type: types.DELETE_HABIT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/habits/${habitId}`);
    dispatch({
      type: types.DELETE_HABIT_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect('/'));
    toast.success('The habit has been deleted!');
  } catch (error) {
    dispatch({ type: types.DELETE_HABIT_FAILURE, payload: error });
  }
};

export const habitActions = {
  getUserHabits,
  habitsRequest,
  getSingleHabit,
  createNewHabit,
  updateHabit,
  deleteHabit,
};
