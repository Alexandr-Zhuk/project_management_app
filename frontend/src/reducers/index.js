/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import projectReducer from './project';
import authReducer from './auth';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    projects: projectReducer,
    auth: authReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
