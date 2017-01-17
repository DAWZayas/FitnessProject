import * as ActionTypes from '../actionTypes';

const initialState = {pos: {}};
export const realtime = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ATLETE_POSITION_SUCCESS:
      return {pos: action.payload.pos};
    default:
      return state;
  }
};
