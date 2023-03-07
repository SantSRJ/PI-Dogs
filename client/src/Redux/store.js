import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhacer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
    rootReducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;