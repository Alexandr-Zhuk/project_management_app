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
  GET_PROJECT_LIST
} from './types';

// The initial state of the App
export const initialState = {
    projects: []
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECT_LIST:
        //return{ ...state, data: action.payload.data}
        return update(state, {
          projects: { $set: action.payload.projects },
        });
        break;
      
    }
    return state;
  };

export default reducer;
