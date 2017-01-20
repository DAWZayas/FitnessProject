import * as ActionTypes from '../actionTypes';

const initialState = {state: 'initial'};
export const images = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_IMAGES:
      return {...state, state: 'loading'};
    case ActionTypes.GET_IMAGES_SUCCESS:
      return {...state, state: 'done', ...action.payload};
    default:
      return state;
  }
};
