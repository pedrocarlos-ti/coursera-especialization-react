// Functions that create actions
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
});

//Function made with Redux Thunk
export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());

  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
};

//Function made with Action default
export const fetchDishesByAction = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = err => ({
  type: ActionTypes.DISHES_FAILED,
  payload: err
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
