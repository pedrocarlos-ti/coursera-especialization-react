import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = { errMess: null, comments: [] };

export const comments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const id = state.comments.length.toString();

      return {
        ...state,
        comments: state.comments.concat({ id, ...action.payload })
      };

    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};
