// Functions that create actions
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../api/baseurl';

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

  return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
};

/* DISHES CATEGORY */
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

/* COMMENTS CATEGORY */
export const fetchComments = () => dispatch => {
  return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = err => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: err
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

/* PROMOTIONS CATEGORY */
export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = err => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: err
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
