import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from 'redux-thunk';
import CombineReducer from './reducer';

const middleware = applyMiddleware(ThunkMiddleware);
const composer = composeWithDevTools(middleware);
const Store = createStore(CombineReducer,composer);

export default Store;