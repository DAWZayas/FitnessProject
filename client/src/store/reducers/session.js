import * as ActionTypes from '../actionTypes';

const initialState = {state: 1};
export const session = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PREPARE_SESSION:
      return {state: 1};
    case ActionTypes.START_SESSION: {
      return {state: 2};
    }
    case ActionTypes.FINISH_SESSION:
      return {state: 3};
    default:
      return state;
  }
};
