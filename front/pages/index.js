import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header'
import Slider from '../components/Slider'
import Relation from '../components/Relation'
import Promotion from '../components/index/Promotion'
import { LOAD_MY_INFO_REQUESTS } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import Footer from '../components/Footer'

function index() {
   const dispatch = useDispatch();
   const { me } = useSelector((state) => state.user)


    return (
        <div>
            <Header />
            <Slider />
            <Relation/>
            <Promotion/>
            <Footer />

        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUESTS,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });
  
export default index
