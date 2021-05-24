import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LOAD_INFO_NAMES_REQUEST } from '../../reducers/product'
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUESTS } from '../../reducers/user';
import styled from 'styled-components';
import { backUrl } from '../../config/back/config';


export const SearchBox = styled.div`
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
    margin: auto;
    border: 1px solid #D2D1D0;
`

export const SearchImg = styled.img`
width: 270px;
height: 285px;
background: #F6EEED;
`
export const DivInfo = styled.div`
    padding: 15px;
    margin: 40px 0x 20px 0; 
`

export const SearchH1 = styled.h1`
    font-size: 15px;
    margin-left: 10px;
    width: 100%;
`


export const SearchP = styled.p`
    font-size: 14px;
    margin-left: 10px;
`

export const FooterMargin = styled.div`
 margin-top: 200px;
`

export const HeaderMargin = styled.div`
margin-bottom: 200px;
`

function Search() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { name } = router.query;
    const { mainInfo,hasMoreInfo, nameLoading } = useSelector((state) => state.product);

    useEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreInfo && !nameLoading) {
                    dispatch({
                        type: LOAD_INFO_NAMES_REQUEST, 
                        lastId: mainInfo[mainInfo.length - 1] && mainInfo[mainInfo.length - 1].id,
                        data: name,
                    });
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainInfo.length, hasMoreInfo, name]);
    console.log(mainInfo);
    return (
        <>
       <HeaderMargin>
       <Header />
       </HeaderMargin>

        <SearchBox>
        {mainInfo.map((c) => (
            <DivInfo key={c.id} product={c}>
             
                 <a href={`/product/info/${c.id}`} >
                 <SearchImg src={`${backUrl}/${c.Images[0].src}`} />
                 </a>
                 <SearchH1>{c.Title}</SearchH1>
                 <SearchP>{c.Price}</SearchP>
                 
            </DivInfo>
        ))}
        </SearchBox>
        

       <FooterMargin>
       <Footer />
       </FooterMargin>
       </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUESTS,
  });
  context.store.dispatch({
    type: LOAD_INFO_NAMES_REQUEST,
    data: context.params.name,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});
export default Search;