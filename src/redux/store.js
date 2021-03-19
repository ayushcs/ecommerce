import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import ProductsReducer from './ProductsReducer'
import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(ProductsReducer, applyMiddleware(logger,thunk));

export default store