import produce from '../util/produce';

export const initialState = {



    productInfoLoading: false, // 정보 가져오기.
    productInfoDone: false,
    productInfoError: null,


    ProductLoading: false,
    ProductError: null,
    ProductDone: false, 
    

    productinfo: null,
    imageInfo:[],


    mainProduct: [],
    mainInfo: [],
    hasMoreInfo: true,
    loadNameLoading: false,
    loadNameDone: false,
    loadNameError: null,



    ImageLoading: false,
    ImageError: null,
    ImageDone: false,

    CommentLoading: false,
    CommentDone: false,
    CommentError: null,

    BasketLoading: false,
    BasketDone: false,
    BasketError: null,

    unBasketLoading: false,
    unBasketDone: false,
    unBasketError: null,


    DibsLoading: false,
    DibsDone: false,
    DibsError: null,
    
    unDibsLoading: false,
    unDibsDone: false,
    unDibsError: null,
    
}

export const BASKET_REQUEST = 'BASKET_REQUEST';
export const BASKET_SUCCESS = 'BASKET_SUCCESS';
export const BASKET_FALSE = 'BASKET_FALSE';

export const UNBASKET_REQUEST = 'UNBASKET_REQUEST';
export const UNBASKET_SUCCESS = 'UNBASKET_SUCCESS';
export const UNBASKET_FALSE = 'UNBASKET_FALSE';

export const DIBS_REQUEST = 'DIBS_REQUEST';
export const DIBS_SUCCESS = 'DIBS_SUCCESS';
export const DIBS_FALSE = 'DIBS_FALSE';

export const UNDIBS_REQUEST = 'UNDIBS_REQUEST';
export const UNDIBS_SUCCESS = 'UNDIBS_SUCCESS';
export const UNDIBS_FALSE = 'UNDIBS_FALSE';    


export const COMMENT_LOADING_REQUEST = 'COMMENT_LOADING_REQUEST';
export const COMMENT_LOADING_SUCCESS = 'COMMENT_LOADING_SUCCESS';
export const COMMENT_LOADING_FALSE = 'COMMENT_LOADING_FALSE';


export const LOAD_INFO_NAMES_REQUEST = 'LOAD_INFO_NAMES_REQUEST';
export const LOAD_INFO_NAMES_SUCCESS = 'LOAD_INFO_NAMES_SUCCESS';
export const LOAD_INFO_NAMES_FALSE = 'LOAD_INFO_NAMES_FALSE'

export const PRODUCT_INFO_REQUEST = 'PRODUCT_INFO_REQUEST';
export const PRODUCT_INFO_SUCCESS = 'PRODUCT_INFO_SUCCESS';
export const PRODUCT_INFO_FALSE = 'PRODUCT_INFO_FALSE';

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_FALSE = 'PRODUCT_FALSE';


export const IMAGE_REQUEST = 'IMAGE_REQUEST';
export const IMAGE_SUCCESS = 'IMAGE_SUCCESS';
export const IMAGE_FALSE = 'IMAGE_FALSE';


export const Comments = (data) => ({
    type: COMMENT_LOADING_REQUEST,
    data,
})






const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        

        
        case COMMENT_LOADING_REQUEST:
            draft.CommentLoading = true;
            draft.CommentDone = false;
            draft.CommentError = null;
            break;
        

        case COMMENT_LOADING_SUCCESS: {
            const product = draft.mainInfo.find((v) => v.id === action.data.ProductId)

            if (product) {
            product.Comments.unshift( action.data );
            }
            if (draft.productinfo?.Comments) {
                draft.productinfo.Comments.unshift( action.data );
            }

            draft.CommentLoading = false;
            draft.CommentDone = true;
        
            break;
        }
        

        case COMMENT_LOADING_FALSE:
            draft.CommentLoading = false;
            draft.CommentError = action.error;
            break;




        case BASKET_REQUEST:
            draft.BasketLoading = true;
            draft.BasketDone = false;
            draft.BasketError = null;
        break; 

        case BASKET_SUCCESS: {
            const product = draft.mainInfo.find((v) => v.id === action.data.ProductId);
            if (product) {
                product.Carts.push({ id: action.data.UserId });
            }
            if (draft.productinfo?.Carts) {
                draft.productinfo.Carts.push({ id: action.data.UserId });
            }
            draft.BasketLoading = false;
            draft.BasketDone = true;
        break;  
        }

        case BASKET_FALSE:
            draft.BasketLoading = false;
            draft.BasketError = action.error;
        break;


        
        case UNBASKET_REQUEST:
            draft.unBasketLoading = true;
            draft.unBasketDone = false;
            draft.unBasketError = null;
            break;
         case UNBASKET_SUCCESS: {
             const product = draft.mainInfo.find((v) => v.id === action.data.ProductId);
             
             if (product) {
                 product.Carts = product.Carts.filter((v) => v.id !== action.data.UserId);
             }
            draft.unBasketLoading = false;
            draft.unBasketDone = true;
            if (draft.productinfo?.Carts) {
                const index = draft.productinfo.Carts.find((v) => v.id === action.data.UserId);
                draft.productinfo.Carts.splice(index, 1)
            }
            break;
         }
                        
        case UNBASKET_FALSE:
            draft.unBasketLoading = false;
            draft.unBasketError = action.error;
        break;

        


        // case DIBS_REQUEST:
        //     draft.DibsLoading = true;
        //     draft.DibsDone = false;
        //     draft.DibsError = null;
        // break; 

        // case DIBS_SUCCESS: {
        //     const product = draft.mainInfo.find((v) => v.id === action.data.ProductId);
        //     product.Loves.push({ id: action.data.UserId });
        //     draft.DibsLoading = false;
        //     draft.DibsDone = true;
        // break;  
        // }
        // case DIBS_FALSE:
        //     draft.DibsLoading = false;
        //     draft.DibsError = action.error;
        // break;

        
        // case UNDIBS_REQUEST:
        //     draft.unDibsLoading = true;
        //     draft.unDibsDone = false;
        //     draft.unDibsError = null;
        //     break;
        //  case UNDIBS_SUCCESS: {
        //      const product = draft.mainInfo.find((v) => v.id === action.data.ProductId);
        //      product.Loves = product.Loves.filter((v) => v.id !== action.data.UserId);
        //     draft.unDibsLoading = false;
        //     draft.unDibsDone = true;
        //     break;
        //  }    
        // case UNDIBS_FALSE:
        //     draft.unDibsLoading = false;
        //     draft.unDibsError = action.error;
        // break;




        case PRODUCT_INFO_REQUEST:
            draft.productInfoLoading = true;
            draft.productInfoDone = false;
            draft.productInfoError = null;
            break;
        case PRODUCT_INFO_SUCCESS:
            draft.productInfoLoading = false;
            draft.productInfoDone = true;
            draft.productinfo = action.data;
            break;
        case PRODUCT_INFO_FALSE:
            draft.productInfoError = action.error;
            draft.productInfoLoading = false;
            break;




        case PRODUCT_REQUEST:
            draft.ProductLoading = true; 
            draft.ProductError = null;
            draft.ProductDone = false;
        break;
        case PRODUCT_SUCCESS:
            draft.ProductLoading = false;
            draft.ProductDone = true;
        break;
        case PRODUCT_FALSE:
            draft.ProductLoading = false;
            draft.ProductError = action.error;
        break;










        // 있다가 다시 해보자.
        // // name 가져 옴.
        case LOAD_INFO_NAMES_REQUEST:
            draft.loadNameLoading = true; 
            draft.loadNameError = null;
            draft.loadNameDone = false;
        break;
        case LOAD_INFO_NAMES_SUCCESS:
            draft.loadNameLoading = false;
            draft.loadNameDone = true;
            draft.mainInfo = draft.mainInfo.concat(action.data);
            draft.hasMoreInfo = action.data.length === 10;
        break;
        case LOAD_INFO_NAMES_FALSE:
            draft.loadNameLoading = false;
            draft.loadNameError = action.error;
        break;






        
        case IMAGE_REQUEST:
            draft.ImageLoading = true;
            draft.ImageError = null; 
            draft.ImageDone = false;
        break;

        case IMAGE_SUCCESS:
            draft.ImageLoading = false;
            draft.ImageDone = true;
            draft.imagePaths = action.data;
        break;

        case IMAGE_FALSE:
            draft.ImageLoading = false;
            draft.ImageError = action.error;
        break;


            default:
              break;
        }
})

export default reducer;