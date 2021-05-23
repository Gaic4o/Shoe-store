import React, {useCallback} from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
import Loginbanner from './index/Loginbanner';
import Banner from './index/Banner';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GlobalFonts from '../fonts/fonts'
import Router from 'next/router';
import useInput from '../hooks/useInput'


export const Headers = styled.div`
    display: flex;
    height: 65px;
    align-items: center;    
    font-size: 19px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333333;
    border-radius: 10px;
    box-shadow:0px 3px 13px 0 rgba(0,0,0,0.11);
`
export const LeftFlex = styled.div`
    flex: 4;
    display: flex;
    justify-content: space-evenly;
    
`
export const RightFlex = styled.div`
    flex: 2;
    display: flex;
    justify-content: space-evenly;
    text-decoration: none;
`


export const A = styled.a`
    text-decoration: none;
    font-size: 19px;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    &:hover {
        color: #DF0000;
      }

    &:nth-child(1) {
        font-family: 'RixYeoljeongdo_Regular';
        font-size: 22px;
    }
    `

export const B = styled.a`
text-decoration: none;
font-size: 19px;
cursor: pointer;
font-family: 'Noto Sans KR', sans-serif;
`



export const Img = styled.img`
      cursor: pointer;
      width: 30px;
      height: 30px;
`
export const Search = styled.form`
`
export const SearchInput = styled.input`
position: relative;
border-bottom: 2px solid black;
border-top: none;
border-left: none;
border-right: none;
width: 270px;
height: 25px;
&:focus { outline: none; }
`

export const SearchButton = styled.button`
position: absolute;
height:35px;
border: none;
background-color: white;
cursor: pointer;
&:focus { outline: none; }
`
export const SearchImg = styled.img`
height: 14px;
width: 15px;
&:focus { 
    outline: none; 
      }
`


function Header() {
    const { me } = useSelector((state) => state.user);
    const [searchInput, onChangeSearchInput] = useInput('');

    

    const onSearch = useCallback((e) => {
        e.preventDefault();
        Router.push(`/search/${searchInput}`);
    }, [searchInput]);


    return (
        <>
            <Headers>

            <LeftFlex>
            <GlobalFonts />
            <Link href="/"><A>민수몰</A></Link>
            <Link href="/ProductList/ProductList"><A>제품 구매</A></Link>

       

            <Search onSubmit={onSearch}>
            <SearchInput 
            type="text"
            value={searchInput}
            onChange={onChangeSearchInput}
            />
            <SearchButton><SearchImg src="/searchpng.png"/></SearchButton>
            </Search>


            </LeftFlex>
            


            <RightFlex>
            <Link href="/mypage"><Img src="/user.png"/></Link>
            <Link href="/shoppbasket"><Img src="/basket.png"/></Link>
            {me ? <Loginbanner /> : <Banner />}
            </RightFlex>
          
   
            </Headers>
            </>
    )
}

export default Header
