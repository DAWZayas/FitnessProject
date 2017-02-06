
import * as ActionTypes from '../actionTypes';

const initialState = [];
export const stats = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RETRIEVE_STATS_DATA:
      return [
        ...state,
      ];
    case ActionTypes.RETRIEVE_STATS_DATA_SUCCESS: {
      return [
        ...state,
        action.payload,
      ];
    }
    default:
      return state;
  }
};
