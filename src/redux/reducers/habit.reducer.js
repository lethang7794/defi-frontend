import * as types from '../constants/habit.constants';

const initialState = {
  habits: [],
  totalPageNum: 1,
  selectedHabit: null,
  loading: false,
};

const habitReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USER_HABITS_REQUEST:
    case types.HABIT_REQUEST:
    case types.GET_SINGLE_HABIT_REQUEST:
    case types.CREATE_HABIT_REQUEST:
    case types.UPDATE_HABIT_REQUEST:
    case types.DELETE_HABIT_REQUEST:
    case types.DELETE_COMPLETION_REQUEST:
      return { ...state, loading: true };

    case types.HABIT_REQUEST_FAILURE:
    case types.GET_SINGLE_HABIT_FAILURE:
    case types.GET_USER_HABITS_FAILURE:
    case types.CREATE_HABIT_FAILURE:
    case types.UPDATE_HABIT_FAILURE:
    case types.DELETE_HABIT_FAILURE:
    case types.DELETE_COMPLETION_FAILURE:
      return { ...state, loading: false };

    // case types.CREATE_COMPLETION_REQUEST:
    // case types.CREATE_COMPLETION_FAILURE:

    case types.GET_USER_HABITS_SUCCESS:
    case types.HABIT_REQUEST_SUCCESS:
      return {
        ...state,
        habits: payload.habits,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    case types.GET_SINGLE_HABIT_SUCCESS:
      return { ...state, selectedHabit: payload.habit, loading: false };

    case types.UPDATE_HABIT_SUCCESS:
      return {
        ...state,
        selectedHabit: payload,
        loading: false,
      };

    case types.CREATE_HABIT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.DELETE_HABIT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedHabit: {},
      };

    // return { ...state, loading: false };

    case types.CREATE_COMPLETION_SUCCESS:
      return {
        ...state,
        selectedHabit: {
          ...state.selectedHabit,
          lastCompletion: payload.completion,
        },
        loading: false,
      };

    case types.DELETE_COMPLETION_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedHabit: { ...state.selectedHabit, lastCompletion: null },
      };

    default:
      return state;
  }
};

export default habitReducer;
