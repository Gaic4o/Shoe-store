import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import productSaga from './product';
import { backUrl } from '../config/back/config';


axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(productSaga),
    ]);
}