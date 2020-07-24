import { applyMiddleware, createStore, combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
