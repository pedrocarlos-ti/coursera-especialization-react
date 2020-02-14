import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = [];

export const favorites = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.some(el => el === action.payload)) return state;
      else return state.concat(action.payload);

    default:
      return state;
  }
};
