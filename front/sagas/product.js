import axios from 'axios';
import {all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';


import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FALSE,
    IMAGE_REQUEST,
    IMAGE_SUCCESS,
    IMAGE_FALSE,
    PRODUCT_INFO_REQUEST,
    PRODUCT_INFO_SUCCESS,
    PRODUCT_INFO_FALSE,
    COMMENT_LOADING_REQUEST,
    COMMENT_LOADING_SUCCESS,
    COMMENT_LOADING_FALSE,
    LOAD_INFO_NAMES_REQUEST,
    LOAD_INFO_NAMES_FALSE,
    LOAD_INFO_NAMES_SUCCESS,
    BASKET_REQUEST,
    BASKET_SUCCESS,
    BASKET_FALSE,
    UNBASKET_SUCCESS,
    UNBASKET_FALSE,
    UNBASKET_REQUEST,

} from '../reducers/product'

// 이미지 추가.
function uploadImageAPI(data) {
    return axios.post('/product/images', data);
}

function* uploadImage(action) {
    try {
        const result = yield call(uploadImageAPI, action.data);
        yield put({
            type: IMAGE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: IMAGE_FALSE,
            error: err.response.data,
        })
    }
}


// 신발 등록
function productAPI(data) {
    return axios.post('/product', data)
}

function* product(action) {
    try {
        const result = yield call(productAPI, action.data);
        console.log(result);
        yield put({
            type: PRODUCT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: PRODUCT_FALSE,
            error: err.response.data,
        });
    }
}

// 댓글
function  CommentInfoAPI(data) {
    return axios.post(`/product/info/${data.productId}/comment`, data);
}

function* CommentInfo(action) {
    try {
        const result = yield call(CommentInfoAPI, action.data);
        yield put({
            type: COMMENT_LOADING_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: COMMENT_LOADING_FALSE,
            error: err.response.data,
        });
    }
}


// 검색. 
function productSearchsAPI(data, lastId) {
    return axios.get(`/product/search/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* productSearchs(action) {
    try {
        const result = yield call(productSearchsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_INFO_NAMES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_INFO_NAMES_FALSE,
            data: err.response.data,
        })
    }
}


// 신발 정보들
function productInfoAPI(data) {
    return axios.get(`/product/info/${data}`);
}

function* productInfo(action) { 
    try {
        const result = yield call(productInfoAPI, action.data);
        yield put({
            type: PRODUCT_INFO_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: PRODUCT_INFO_FALSE,
            error: err.response.data,
        });
    }
}






// 장바구니.
function basketInfoAPI(data) {
    return axios.patch(`/product/info/${data}/basket`);
}

function* basketInfo(action) {
    try {
        const result = yield call(basketInfoAPI, action.data);
        yield put({
            type: BASKET_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: BASKET_FALSE,
            error: err.response.data,
        })
    }
}



function unbasketInfoAPI(data) {
    return axios.delete(`/product/info/${data}/basket`);
}

function* unbasketInfo(action) {
    try {
        const result = yield call(unbasketInfoAPI, action.data);
        yield put({
            type: UNBASKET_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: UNBASKET_FALSE,
            error: err.response.data,
        })
    }
}






function* productSignup() {
    yield takeLatest(PRODUCT_REQUEST, product);
}
function* productUpload() {
    yield takeLatest(IMAGE_REQUEST, uploadImage);
}
function* productinfoload() {
    yield takeLatest(PRODUCT_INFO_REQUEST, productInfo);
}
function* productComment() {
    yield takeLatest(COMMENT_LOADING_REQUEST, CommentInfo);
}
function* productSearch() {
    yield takeLatest(LOAD_INFO_NAMES_REQUEST, productSearchs);
}
function* productBasket() {
    yield takeLatest(BASKET_REQUEST, basketInfo);
}
function* productUnBasket() {
    yield takeLatest(UNBASKET_REQUEST, unbasketInfo);
}


export default function* productSaga() {
    yield all([
        fork(productSignup),
        fork(productUpload),
        fork(productinfoload),
        fork(productComment),
        fork(productSearch),
        fork(productBasket),
        fork(productUnBasket),
    
    ])
}