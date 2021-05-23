import React from 'react';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import styeld from 'styled-components';
import {  createGlobalStyle } from '../fonts/fonts'


const MinGsuGo = ({ Component }) => (
    <>
    <createGlobalStyle/>
      <Head>
        <title>민수몰</title>
      </Head>
      <Component />
    </>
  );


export default wrapper.withRedux(MinGsuGo);
