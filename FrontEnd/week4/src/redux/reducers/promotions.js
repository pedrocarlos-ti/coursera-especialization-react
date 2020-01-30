import * as ActionTypes from '../actions/ActionTypes';

export const Promotions = (
  state = {
    isLoading: true,
    err: null,
    promotions: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        err: null,
        promotions: action.payload
      };

    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, err: null, promotions: [] };

    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        promotions: []
      };

    default:
      return state;
  }
};
