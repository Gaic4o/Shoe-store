import {useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import css from '../../styles/login.css';
import Head from 'next/head';
import Router from 'next/router';
import useInput from '../../hooks/useInput';
import { loginRequestAction } from '../../reducers/user';
import Header from '../../components/Header'
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUESTS } from '../../reducers/user';
import styled from 'styled-components';


export const LoginSection = styled.section`
display: flex;
justify-content: center;
align-items: center;
height: 700px;
`
export const loginForm = styled.div`
width: 600px;
height: 500px;
text-align: center;
`
export const LoginFormH1 = styled.h1`
font-size: 40px;
font-family: 'Noto Sans KR', sans-serif;
`
export const Member = styled.div`
margin-bottom: 15px;
`
export const MemberLabel = styled.label`
display: none;
`
export const MemberInput = styled.input`
width: 400px;
height: 45px;
border: 1px solid #D2D1D0;
border-radius: 5px;
`
export const LoginButtons = styled.button`
width: 400px;
height: 70px;
background: #1EC68C;
border: 1px solid #1EC68C;
border-radius: 5px;
margin-bottom: 20px;
color: #fff;
cursor: pointer;
font-size: 20px;
font-family: 'Noto Sans KR', sans-serif;
`
export const Kakao = styled.button`
width: 400px;
height: 40px;
background-color: white;
border-radius: 5px;
border: 1px solid rgb(187, 186, 186);
cursor: pointer;
margin-bottom: 20px;
`

function login() {
    const dispatch = useDispatch();
    const { logInLoading, logInError, me } = useSelector((state) => state.user);
    const [regid, onChangeRegid] = useInput('');
    const [password, onChangePassword] = useInput('');


    useEffect(() => {
        if (me && me.id) {
          Router.replace('/');
        }
      }, [me && me.id]);

    useEffect(() => {
        if(logInError) {
            alert(logInError);
        }
    }, [logInError])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault()
        console.log(regid, password);
        dispatch(loginRequestAction({ regid, password }))
    }, [regid, password]);
    
    return (
        <>
        <Head>
            <title>회원가입</title>
        </Head>
         <Header />
        
         <LoginSection>

        <loginForm>
        <LoginFormH1>로그인</LoginFormH1>


        <form onSubmit={onSubmitForm}>
        <Member>
            <MemberLabel>아이디</MemberLabel>
            <MemberInput id="user-regid" name="user-regid" value={regid} onChange={onChangeRegid} type="text" placeholder="아이디" required/>
        </Member>

        <Member>
            <MemberLabel>패스워드</MemberLabel>
            <MemberInput id="user-password" name="user-password" value={password} onChange={onChangePassword} type="password" placeholder="비밀번호" required />
        </Member>

        <LoginButtons type="primary" onClick={() => logInLoading} >로그인</LoginButtons>
        </form>


    

        </loginForm>

        </LoginSection>

         </>
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
  
export default login
