import produce from '../util/produce'

export const initalState = {

    
    me: null,
    userInfo: null,

    CommentLoading: false,
    CommentDone: false,
    CommentError: null,

    logInLoading: false, // 로그인 시도. 
    logInDone: false,
    logInError: null,

    logoutLoading: false, // 로그아웃 시도.
    logoutDone: false,
    logoutError: null,

    signUpLoading: false, // 회원가입 시도, 
    signUpDone: false,
    signUpError: null,

    loadMyInfoLoading: false, // 쿠키, 
    loadMyInfoDone: false,
    loadMyInfoError: null,

    loadUserLoading: false, // 유저 정보 가져오기 시도중
    loadUserDone: false,
    loadUserError: null,

    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    
    changeNameLoading: false, // 닉네임 변경 시도중
    changeNameDone: false,
    changeNameError: null,
    
    changePasswordLoading: false, // 닉네임 변경 시도중
    changePasswordDone: false,
    changePasswordError: null,
    
    changeEmailLoading: false, // 닉네임 변경 시도중
    changeEmailDone: false,
    changeEmailError: null,
    

    BasketLoading: false,
    BasketDone: false,
    BasketError: null,
    
    
    unBasketLoading: false,
    unBasketDone: false,
    unBasketError: null,

}

export const BASKET_REQUEST = 'BASKET_REQUEST';
export const BASKET_SUCCESS = 'BASKET_SUCCESS';
export const BASKET_FALSE = 'BASKET_FALSE';


export const UNBASKET_REQUEST = 'UNBASKET_REQUEST';
export const UNBASKET_SUCCESS = 'UNBASKET_SUCCESS';
export const UNBASKET_FALSE = 'UNBASKET_FALSE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FALSE = 'LOAD_USER_FALSE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FALSE = 'LOG_IN_FALSE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FALSE = 'LOG_OUT_FALSE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FALSE = 'SIGN_UP_FALSE';

export const LOAD_MY_INFO_REQUESTS = 'LOAD_MY_INFO_REQUESTS';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FALSE = 'LOAD_MY_INFO_FALSE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FALSE = 'CHANGE_NICKNAME_FALSE';

export const CHANGE_NAME_REQUEST = 'CHANGE_NAME_REQUEST';
export const CHANGE_NAME_SUCCESS = 'CHANGE_NAME_SUCCESS';
export const CHANGE_NAME_FALSE = 'CHANGE_NAME_FALSE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FALSE = 'CHANGE_PASSWORD_FALSE';

export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FALSE = 'CHANGE_EMAIL_FALSE';


export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST, 
    data, 
})

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
})

const reducer = (state = initalState, action) => produce(state, (draft) => {
    switch (action.type) {
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.me.regid = action.data.regid;
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FALSE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;


      case CHANGE_NAME_REQUEST:
        draft.changeNameLoading = true;
        draft.changeNameError = null;
        draft.changeNameDone = false;
        break;
      case CHANGE_NAME_SUCCESS:
        draft.me.name = action.data.name;
        draft.changeNameLoading = false;
        draft.changeNameDone = true;
        break;
      case CHANGE_NAME_FALSE:
        draft.changeNameLoading = false;
        draft.changeNameError = action.error;
        break;

      case CHANGE_PASSWORD_REQUEST:
            draft.changePasswordLoading = true;
            draft.changePasswordError = null;
            draft.changePasswordDone = false;
            break;
       case CHANGE_PASSWORD_SUCCESS:
            draft.me.password = action.data.password;
            draft.changePasswordLoading = false;
            draft.changePasswordDone = true;
            break;
        case CHANGE_PASSWORD_FALSE:
            draft.changePasswordLoading = false;
            draft.changePasswordError = action.error;
            break;


            case CHANGE_EMAIL_REQUEST:
                draft.changeEmailLoading = true;
                draft.changeEmailError = null;
                draft.changeEmailDone = false;
                break;
           case CHANGE_EMAIL_SUCCESS:
                draft.me.email = action.data.email;
                draft.changeEmailLoading = false;
                draft.changeEmailDone = true;
                break;
            case CHANGE_EMAIL_FALSE:
                draft.changeEmailLoading = false;
                draft.changeEmailError = action.error;
                break;
            


    case LOAD_MY_INFO_REQUESTS:
    draft.loadMyInfoLoading = true;
    draft.loadMyInfoError = null;
    draft.loadMyInfoDone = false;
    break;

    case LOAD_MY_INFO_SUCCESS:
    draft.loadMyInfoLoading = false;
    draft.loadMyInfoDone = true;
    draft.me = action.data;
    break;

    case LOAD_MY_INFO_FALSE:
    draft.loadMyInfoLoading = false;
    draft.loadMyInfoError = action.error;
    break;

    
    case LOG_IN_REQUEST: 
    draft.logInLoading = true;
    draft.logInDone = false;
    draft.logInError = null;
    break; 
    case LOG_IN_SUCCESS:
    draft.logInLoading = false;
    draft.me = action.data;
    draft.logInDone = true;
   
    break; 
    case LOG_IN_FALSE:
    draft.logInLoading = false;
    draft.logInError = action.error;
    break; 


    case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
    case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
    case LOAD_USER_FALSE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;



    case LOG_OUT_REQUEST:
    draft.logoutLoading = true;
    draft.logoutDone = false;
    draft.logoutError = null;
    break;
    case LOG_OUT_SUCCESS: 
    draft.logoutLoading = false;
    draft.logoutDone = true;
    draft.me = null;
    break; 
    case LOG_OUT_FALSE:
    draft.logoutError = action.error;
    draft.logoutLoading = false;
    break;


    case SIGN_UP_REQUEST:
    draft.signUpLoading = true;
    draft.signUpDone = false;
    draft.signUpError = null;
    break;

    case SIGN_UP_SUCCESS: 
    draft.signUpLoading = false;
    draft.signUpDone = true;
    break; 

    case SIGN_UP_FALSE: 
    draft.signUpLoading = false;
    draft.signUpError = action.error;
    break;

    default:
        break;
    }
})

export default reducer; 