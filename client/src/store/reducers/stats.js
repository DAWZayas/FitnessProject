
import * as ActionTypes from '../actionTypes';

const initialState = {sportStats: {}};
export const stats = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RETRIEVE_STATS_DATA:
      return {
        sportStats: {},
      };
    case ActionTypes.RETRIEVE_STATS_DATA_SUCCESS: {
      return {
        ...state,
        sportStats: action.payload.stats,
      };
    }
    default:
      return state;
  }
};
