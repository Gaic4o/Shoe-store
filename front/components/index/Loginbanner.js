import React, {useCallback} from 'react'
import Link from 'next/link';
import { useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components'
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { logoutRequestAction } from '../../reducers/user';


export const Logbutton = styled.button`
    background: white;
    border: none;
`

export const A = styled.a`
    text-decoration: none;
    padding-right: 30px;
    cursor: pointer;
    font-size: 19px;
    font-family: 'Noto Sans KR', sans-serif;
 
    &:hover {
      color: #DF0000;
    }
`
function loginbanner() {

  const dispatch = useDispatch();
  const { logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

    return (
        <div>
           <Logbutton onClick={onLogOut} loading={logOutLoading}><A>로그아웃</A></Logbutton>
        </div>
    )
}


export default loginbanner
