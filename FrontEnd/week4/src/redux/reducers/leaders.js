import * as ActionTypes from '../actions/ActionTypes';

export const Leaders = (
  state = {
    isLoading: true,
    err: null,
    leaders: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: false, err: null, leaders: action.payload };

    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true, err: null, leaders: [] };

    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, err: action.payload, leaders: [] };

    default:
      return state;
  }
};
