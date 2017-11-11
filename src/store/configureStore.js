import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import membersReducer from '../reducers/members';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      members: membersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
