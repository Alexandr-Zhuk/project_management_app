/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import update from 'react-addons-update';
import { 
  SET_SEARCH_QUERY
} from './types';

// The initial state of the App
export const initialState = {
    query: '',
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH_QUERY:
        //return{ ...state, data: action.payload.data}
        return update(state, {
          query: { $set: action.payload.query },
        });
        break;
    }
    return state;
  };

export default reducer;
