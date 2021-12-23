import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import logger from 'redux-logger'
import * as reducers from './modules';

const reducer = combineReducers({
  ...reducers,
});
let middleware = []
if(process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
