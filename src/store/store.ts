import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import categories from './reduceres/categories.reducer';
import products from './reduceres/products.reducer';
import settings from './reduceres/settings.reducer';
import snackBar from './reduceres/snackbar.reducer';
import theme from './reduceres/themeMode.reducer';
import users from './reduceres/users.reducer';
import rootSaga from './sagas/sagas';

const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  categories,
  products,
  settings,
  snackBar,
  theme,
  users,
});

//const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
const store = createStore(rootReducer, compose(applyMiddleware(saga) 
//composeWithDevTools()
));

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
