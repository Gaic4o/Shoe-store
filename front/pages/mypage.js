import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { END } from 'redux-saga';
import Header from '../components/Header'
import { PRODUCT_INFO_REQUEST } from '../reducers/product'
import { LOAD_MY_INFO_REQUESTS, CHANGE_NICKNAME_REQUEST, CHANGE_EMAIL_REQUEST, CHANGE_NAME_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'
import axios from 'axios';
import Router from 'next/router';
import Footer from '../components/Footer'
import styled from 'styled-components';



export const Modify = styled.div`
width: 1000px;
height: 650px;
margin: auto;
padding-top: 80px;
font-family: 'Noto Sans KR', sans-serif;
`

export const ModifyH1 = styled.h1`
margin: auto;
width: 250px;
height: 100px;
`


export const ModifyForm = styled.form`
width: 700px;
height: 150px;
margin: auto;
padding-left: 200px;
`

export const ModifyInput = styled.input`
width: 400px;
height: 45px;
border: 1px solid #D2D1D0;
border-radius: 5px;
`

export const ModifyButton = styled.button`
width: 100px;
height: 48px;
background: #1EC68C;
border: 1px solid #1EC68C;
border-radius: 5px;
color: #fff;
cursor: pointer;
font-family: 'Noto Sans KR', sans-serif;
`



function mypage(props) {


    const { me } = useSelector((state) => state.user);
    const [regid, onChangeRegid] = useInput(me?.regid || '');
    const [name, onChangeName] = useInput(me?.name || '');
    const [email, onChangeEmail] = useInput(me?.email || '');
    const dispatch = useDispatch();
    const {  changeNicknameLoading } = useSelector((state) => state.user);


 
    useEffect(() => {
      if (!(me && me.id)) {
          Router.push('/');
      }
  }, [me && me.id]);




    const NickSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch({ 
            type: CHANGE_NICKNAME_REQUEST,
            data: regid,
        })
}, [regid]);

    
    const NameSubmit = useCallback((e) => {
      e.preventDefault()
      dispatch({ 
          type: CHANGE_NAME_REQUEST,
          data: name,
      })
    }, [name]);





    const EmailSubmit = useCallback((e) => {
      e.preventDefault()
      dispatch({ 
          type: CHANGE_EMAIL_REQUEST,
          data: email,
      })
    }, [email]);




    return (
        <>
            <Header />


            <Modify>
              <ModifyH1>회원 정보 수정</ModifyH1>
            <ModifyForm onSubmit={NickSubmit}>
            <p>닉네임 수정</p>
                <ModifyInput type="text" value={regid} onChange={onChangeRegid} />
                <ModifyButton onClick={() => changeNicknameLoading}>수정</ModifyButton>
            </ModifyForm>

            <ModifyForm onSubmit={NameSubmit}>
            <p>이름 수정</p>
                <ModifyInput type="text" value={name} onChange={onChangeName} />
                <ModifyButton onClick={() => changeNameLoading}>수정</ModifyButton>
            </ModifyForm>

            <ModifyForm onSubmit={EmailSubmit}>
              
            <p>이메일 수정</p>
                <ModifyInput type="text" value={email} onChange={onChangeEmail} />
                <ModifyButton onClick={() => changeEmailLoading}>수정</ModifyButton>
            </ModifyForm>
            </Modify>


            <Footer />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: PRODUCT_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUESTS,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });
export default mypage


