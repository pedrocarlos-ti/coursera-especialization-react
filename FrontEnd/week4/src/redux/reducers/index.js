import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form';

import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';

export const Reducers = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders,
  ...createForms({
    feedback: InitialFeedback
  })
});
