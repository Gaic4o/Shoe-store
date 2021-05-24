import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';
import {LOAD_MY_INFO_REQUESTS } from '../reducers/user'
import { PRODUCT_INFO_REQUEST } from '../reducers/product'
import Header from '../components/Header'
import Footer from '../components/Footer';
import useSWR from 'swr';
import styled from 'styled-components';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);




export const Tr = styled.tr`

`

export const Th = styled.th`
font-size: 30px;

`

export const Td = styled.td`
font-size: 20px;
border: 1px solid #dddddd;
padding: 50px;
`
export const Table = styled.table`
margin: auto;
border: 1px solid #D2D1D0;
padding: 150px;
margin-bottom: 30px;
font-family: 'Noto Sans KR', sans-serif;
margin-top: 30px;
`

export const Tbody = styled.tbody`
text-align: center;

`

export const Thead = styled.thead`

`

function shoppbasket() {
    const { me } = useSelector((state) => state.user);

    const { data: CartData, error: CartError } = useSWR(`${backUrl}/user/Carts`, fetcher)

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);


    if (CartError) {
        console.error(CartError);
        return '장바구니 상품 로딩 중 에러 발생'
    }
    if (!me) {
        return '내 정보 로딩 중';
    }

    console.log(CartData);

    const renderItems = () => (
       CartData?.Cartd?.map((list, index) => (
         <Tr key={index}>
           <Td>
             {list.Title} 
           </Td>
           <Td>
             $ {list.Price}
           </Td>
           <Td>
             {list.Contents}
           </Td>
         </Tr>
       ))
    )


  



    return (
        <>
            <Header />

         
         
           {/* <TitleP>{CartData?.Cartd?.map((list) => list.Title)}</TitleP>  */}

            <Table>
              <Thead>
                <Tr>
                  <Th>이름</Th>
                  <Th>가격</Th>
                  <Th>민수의 생각 후기</Th>
                </Tr>
              </Thead>
      

            <Tbody>
              {renderItems()}
            </Tbody>

            </Table>

            <Footer />
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


export default shoppbasket
