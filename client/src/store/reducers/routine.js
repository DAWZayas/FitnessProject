import * as ActionTypes from '../actionTypes';

const initialState = {};
export const routine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EXERCISE:
      return state;
    case ActionTypes.CREATE_ROUTINE:
      return state;
    default:
      return state;
  }
};
