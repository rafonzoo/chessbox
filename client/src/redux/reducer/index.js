import { combineReducers } from "redux";
import { globalReducer } from './global';

const CombineReducer = combineReducers({
  globalReducer,
});

export default CombineReducer;