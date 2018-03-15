import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

// Reducers
import { photoInfo, photos } from 'src/redux/reducers';

// Locals
import buildAxiosMiddleware from './buildAxiosMiddleware';

/* eslint-disable no-underscore-dangle */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export default function buildStore() {
  const middlewares = [
    reduxThunk,
    buildAxiosMiddleware(),
  ];

  const store = createStore(
    combineReducers({ photoInfo, photos }),
    composeEnhancer(applyMiddleware(...middlewares)),
  );

  return store;
}
