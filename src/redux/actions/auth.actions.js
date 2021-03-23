import * as types from '../constants/auth.constants';
import api from '../../apiService/api';
import { toast } from 'react-toastify';

/** Login with email password */
const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post('/auth/login', { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

/** Register new account */
const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post('/users', { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

/** Get current user infomation */
const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    api.defaults.headers.common['authorization'] = accessToken;
    const res = await api.get(`/users/me`);
    setTimeout(() => {
      dispatch({
        type: types.GET_CURRENT_USER_SUCCESS,
        payload: res.data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

/** log out */
const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken');
  delete api.defaults.headers.common['authorization'];
  dispatch({ type: types.LOGOUT_REQUEST, payload: null });
};

export const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
};
