import * as ActionTypes from '../actionTypes';

const initialState = {};
export const realtime = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ATLETE_POSITION_SUCCESS:
      return {...state, [action.payload.user]: {pos: action.payload.pos, athlete: action.payload.user}};
    case ActionTypes.RESET_ATLETE_POSITION:
      return initialState;
    default:
      return state;
  }
};
