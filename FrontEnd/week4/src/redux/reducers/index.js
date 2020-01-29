import { combineReducers } from 'redux';

import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';

export const Reducers = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders
});
