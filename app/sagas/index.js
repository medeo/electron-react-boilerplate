import { takeEvery } from 'redux-saga/effects';

function* rootSaga() {
  yield takeEvery('hello', sayHello);
}

function sayHello() {
  return console.log('hello');
}

export default rootSaga;
