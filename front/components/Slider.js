import React from 'react'
import Slider from 'react-slick';
import Head from "next/head"
import styled from 'styled-components';
import Image from 'next/image';

export const Sliders = styled.div`
  margin: 100px 0 100px 0;
`
export const SliderInner = styled.div`
  width: 1800px;
  margin: auto;
  height: 530px;
`
export const Bothone = styled.div`
  display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgb(113, 133, 183);
    font-family: 'MaruBuri-Regular';
    font-size: 25px;
    color: white;
`
export const BothoneH1 = styled.h1`
font-family: 'KOTRA_BOLD-Bold';
font-size: 40px;
`
export const BothoneP = styled.p`
font-family: 'Cafe24Oneprettynight';
font-size: 35px;
`

export const Abs = styled.div`
height: 530px;
`
export const AbsImg = styled.img`
height: 400px;
border-radius: 5px;
margin-top: 55px;
`
export const Bothrwo = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
background-color: rgb(37, 87, 98);
`
export const Reltwo = styled.div`
color: white;
`
export const ReltwoH1 = styled.h1`
font-family: 'KOTRA_BOLD-Bold';
font-size: 35px;
margin-bottom: 55px;
`


export const ReltwoP = styled.p`
font-family: 'Cafe24Oneprettynight';
font-size: 25px;
`

export const ReltwoH2 = styled.h2`
font-family: 'MaruBuri-Regular';
font-size: 30px;
`
export const ReltwoAbs = styled.div`
  height: 530px;
`

export const ReltwoAbsImg = styled.img`
width: 400px;
height: 370px;
border-radius: 10px;
margin-top: 50px;
`
export const Boththree = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
background-color: rgb(24, 23, 23);
`
export  const Relthree = styled.div`
color: #f8f8f8;
`

export const RelthreeH1 = styled.h1`
font-family: 'KOTRA_BOLD-Bold';
    font-size: 45px;
`
export const RelthreeP = styled.p`
font-family: 'Noto Sans KR', sans-serif;
font-size: 25px;
`
export const BoththreeAbs = styled.div`
height: 530px;
`
export const BoththreeAbsImg = styled.img`
width: 450px;
height: 310px;
margin-top: 120px;
`

export default function SimpleSlider()  {

    const settings = {

      infinite: true,
      fade: true,
      slidesToShow: 1,
      speed: 500,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      
    }
    return (
      <Sliders>
        <SliderInner>
        <Head>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        <Slider {...settings} >
     
        <section>
          <Bothone>
          

          <div>
          <BothoneH1>#??? ?????? ?????????</BothoneH1>
          <p>????????? ???????????? ?????? ?????? ????????????!</p>
          <BothoneP>????????? ????????? ????????? ?????? ??? ?????????!</BothoneP>
          </div>

          <Abs>
          <AbsImg src="/adi.png" />
          </Abs>


          </Bothone>
        </section>


        
        <section>
           <Bothrwo>

          <Reltwo>
          <ReltwoH1>????????? ???????????? ?????????</ReltwoH1>
          <ReltwoP>????????? ?????? ???????????? ????????? ?????????</ReltwoP>
          <ReltwoH2>???????????? ????????? ????????? ????????? ?????? ????????????</ReltwoH2>
          <ReltwoP>???????????? ??????????????????.</ReltwoP>
          </Reltwo>

          <ReltwoAbs>
          <ReltwoAbsImg src="/simple.png" />
          </ReltwoAbs>

          </Bothrwo>
        </section>

        
        <section>
         <Boththree>

        <Relthree>
        <RelthreeH1>???????????? ??????!</RelthreeH1>
        <RelthreeP>????????? ????????? ?????? ?????? ???????????????.</RelthreeP>
        </Relthree>

        <BoththreeAbs>
        <BoththreeAbsImg src="/box.png" />
        </BoththreeAbs>

        </Boththree>
        </section>

   
        </Slider>
        </SliderInner>
      </Sliders>
    );
  }
