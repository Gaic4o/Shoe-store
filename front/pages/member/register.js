import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import useInput from '../../hooks/useInput';
import { SIGN_UP_REQUEST,} from '../../reducers/user';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUESTS } from '../../reducers/user';
import wrapper from '../../store/configureStore'
import axios from 'axios';
import { END } from 'redux-saga';
import Header from '../../components/Header'



export const Nameh1 = styled.p`
font-family: 'RixYeoljeongdo_Regular';
font-size: 25px;
cursor: pointer;
`

export const Register = styled.section`
display: flex;
align-items: center;
justify-content: center;
height: 850px;
`

export const NameLabel = styled.label`
font-size: 14px;
margin-right: 6px;
`
export const NameSpan = styled.span`
color: rgb(236, 4, 4);
`
export const InfoUser = styled.input`
width: 400px;
height: 40px;
background-color: white;
border-radius: 5px;
border: 1px solid rgb(187, 186, 186);
cursor: pointer;
margin: 10px 0 20px 0;
`
export const LoadingButton = styled.button`
width: 400px;
height: 70px;
background: #1EC68C;
border: 1px solid #1EC68C;
border-radius: 5px;
color: #fff;
font-size: 20px;
font-family: 'Noto Sans KR', sans-serif;
margin: 60px 0 60px 0;
cursor: pointer;
`

const Error = styled.div`
    color: red;
`;

const Success = styled.div`
    color: #2eb67d;
    font-weight: bold;
`


function register() {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    
    const [name, onChangeName] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const [regid, onChangeRegid] = useInput('');
    const [password, onChangePassword] = useInput('');

    const dispatch = useDispatch();
    const { signUpLoading, SignUpDone, SignUpError, me} = useSelector((state) => state.user);

    useEffect(() => {
        if (me && me.id) {
            Router.replace('/');
        }
      }, [me && me.id]);

    useEffect(() => { // ??????. 
        if (SignUpDone) {
            Router.replace('/');
        }
    }, [SignUpDone])

    useEffect(() => { // ??????. 
        if(SignUpError) {
            alert(SignUpError);
        }
    }, [SignUpError]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setMismatchError(password !== e.target.value);
    }, [password]);


    const onSubmit = useCallback((e) => {
        e.preventDefault()
        if (!regid || !regid.trim()) {
            return;
          }
        setSignUpError(false);
        setSignUpSuccess(true);
        console.log(regid, password);
    dispatch({
        type: SIGN_UP_REQUEST,
        data: {name, email, regid, password},
    })
}, [name, email, regid, passwordCheck, password]);


    return (
        <>  
        <Header />
       <Register>
           <div>
           
    
            <form  onSubmit={onSubmit}>
                <h1>????????????</h1>
                <p>(???????????? ??? main page ????????? ?????? ?????? ???)</p>
                <p>???????????? ????????? ????????? ?????? ????????? ?????????.</p>

                <div>

                <div>
                <NameLabel htmlFor="user-name">??????</NameLabel><NameSpan>*</NameSpan>
                </div>

                <InfoUser id="user-name" name="user-name" type="text" value={name} placeholder="2??? ?????? ??????" onChange={onChangeName} required />
                </div>
                

                <div>

                <div>
                <NameLabel htmlFor="user-email">?????????</NameLabel><NameSpan>*</NameSpan>
                </div>

                <InfoUser id="user-email" name="user-email" type="email" value={email} placeholder="?????????@??????????????? ??????" onChange={onChangeEmail} required />
                </div>


                <div>

                <div>
                <NameLabel htmlFor="user-regid">?????????</NameLabel><NameSpan>*</NameSpan>
                </div>

                <InfoUser id="user-regid" name="user-regid" type="text" value={regid} placeholder="?????? ?????????, ?????? ?????? 6~20???" onChange={onChangeRegid} required/>
                </div>



                <div>
                <NameLabel htmlFor="user-passowrd">????????????</NameLabel><NameSpan>*</NameSpan>
                </div>

                <div>
                <InfoUser id="user-password" name="user-password" type="password" value={password} placeholder="???????????? ?????? ??? ??????" onChange={onChangePassword} required />
                </div>

                
                <div>
                <NameLabel htmlFor="user-passowrd-check">???????????? ??????</NameLabel><NameSpan>*</NameSpan>
                </div>

                <div>
                <InfoUser id="user-password-check" name="user-password-check" type="password" value={passwordCheck} placeholder="???????????? ?????????" onChange={onChangePasswordCheck} required />
                </div>
             
                {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
                {!regid && <Error>???????????? ??????????????????.</Error>}
                {signUpError && <Error>?????? ????????? ??????????????????.</Error>}
                {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
                <LoadingButton type="primary" onClick={() => signUpLoading}>????????????</LoadingButton>
                
                
            </form>
      
            </div>
       </Register>
       </>
    )
};





export default register;
