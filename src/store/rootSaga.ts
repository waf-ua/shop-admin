import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  ADD_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPLOAD_MAIN_IMG_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST,
  UPDATE_CATEGORY_REQUEST,
} from './types';
import {
  fetchCategoryWorker,
  addCategoryWorker,
  getCategoryByIdWorker,
  updateCategoryWorker,
} from './sagas/categories.saga';

import { fetchSettingsWorker, updateSettingsWorker } from './sagas/settings.saga';
import {
  addProductWorker,
  getProductByIdWorker,
  getProductsWorker,
  updateProductWorker,
  deleteProductWorker,
  uploadMainImgWorker,
} from './sagas/products.saga';

export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
  yield takeEvery(GET_CATEGORY_BY_ID_REQUEST, getCategoryByIdWorker);
  yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsWorker);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdWorker);
  yield takeEvery(ADD_PRODUCT_REQUEST, addProductWorker);
  yield takeEvery(UPLOAD_MAIN_IMG_REQUEST, uploadMainImgWorker);
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductWorker);
  yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductWorker);
}

// Settings
function* sagaSettingsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_SETTINGS, fetchSettingsWorker);
  yield takeEvery(REQUEST_UPDATE_SETTINGS, updateSettingsWorker);
}

// RootSaga
export default function* rootSaga(): SagaIterator {
  yield all([fork(sagaCategoriesWatcher), fork(sagaProductsWatcher), fork(sagaSettingsWatcher)]);
}
