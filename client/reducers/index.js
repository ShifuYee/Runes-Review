'use strict';
import { combineReducers } from 'redux';
import summoners from './summoners';

const initialState = {};

const rootReducer = combineReducers({
  summoners
});

export default rootReducer;
