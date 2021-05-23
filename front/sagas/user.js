import axios from 'axios';
import { all, fork, put, takeLatest, call, delay, take } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FALSE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FALSE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FALSE,
    LOAD_MY_INFO_REQUESTS,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FALSE,
    LOAD_USER_FALSE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    CHANGE_NICKNAME_FALSE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_EMAIL_REQUEST,
    CHANGE_EMAIL_FALSE,
    CHANGE_EMAIL_SUCCESS,
    CHANGE_NAME_FALSE,
    CHANGE_NAME_REQUEST,
    CHANGE_NAME_SUCCESS,

} from '../reducers/user';

// 로그인 
function logInAPI(data) {
    return axios.post('/user/login', data);

}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,   
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_IN_FALSE,
            error: err.response.data,
        })
    }
}


// 로그아웃
function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FALSE,
            error: err.response.data,
        })
    }
}


// 회원가입.
function signUpAPI(data) {
    return axios.post('/user', data )
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type:  SIGN_UP_SUCCESS,
            
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FALSE,
            error: err.response.data,
        });
    }
}


// 닉네임 수정
function changeNicknameAPI(data) {
    return axios.patch('/user/regid', { regid: data });
  }
  
  function* changeNickname(action) {
    try {
      const result = yield call(changeNicknameAPI, action.data);
      yield put({
        type: CHANGE_NICKNAME_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: CHANGE_NICKNAME_FALSE,
        error: err.response.data,
      });
    }
  }



  function changeEmailAPI(data) {
    return axios.patch('/user/email', { email: data });
  }
  
  function* changeEmail(action) {
    try {
      const result = yield call(changeEmailAPI, action.data);
      yield put({
        type: CHANGE_EMAIL_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type:  CHANGE_EMAIL_FALSE,
        error: err.response.data,
      });
    }
  }


  function changeNameAPI(data) {
    return axios.patch('/user/name', { name: data });
  }
  
  function* changeName(action) {
    try {
      const result = yield call(changeNameAPI, action.data);
      yield put({
        type: CHANGE_NAME_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: CHANGE_NAME_FALSE,
        error: err.response.data,
      });
    }
  }






// 유저 정보
function LoadInfoAPI() {
    return axios.get('/user')
}

function* LoadInfo() {
    try {
        const result = yield call(LoadInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FALSE,
            error: err.response.data,
        })
    }
}

// 유저 데이터
function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
  }
  
  function* loadUser(action) {
    try {
      const result = yield call(loadUserAPI, action.data);
      yield put({
        type: LOAD_USER_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_USER_FALSE,
        error: err.response.data,
      });
    }
  }
  







function* minsuLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* minsuLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* minsuSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* minsuLoadInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUESTS, LoadInfo);
}
function* minsuLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
  }
function* minsuChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
  }
function* minsuChangeName() {
    yield takeLatest(CHANGE_NAME_REQUEST, changeName);
}

function* minsuChangeEmail() {
    yield takeLatest(CHANGE_EMAIL_REQUEST, changeEmail);
}

export default function* userSaga() {
    yield all([
        fork(minsuLogIn),
        fork(minsuLogOut),
        fork(minsuSignUp),
        fork(minsuLoadInfo),
        fork(minsuLoadUser),
        fork(minsuChangeNickname),
        fork(minsuChangeName),
        fork(minsuChangeEmail),
    ]);
}