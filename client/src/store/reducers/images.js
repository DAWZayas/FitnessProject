import * as ActionTypes from '../actionTypes';

const initialState = {state: 'initial'};
export const images = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_IMAGES:
      return {state: 'loading'};
    case ActionTypes.GET_IMAGES_SUCCESS:
      return {state: 'done', images: action.payload};
    default:
      return state;
  }
};
