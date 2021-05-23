import React from 'react'
import Header from '../../components/Header'
// import css from '../../styles/join.css'
import Link from 'next/link';
import styled from 'styled-components';

export const Jogcontent = styled.section`
display: flex;
align-items: center;
justify-content: center;
height: 700px;
margin-top: 50px;
`
export const Joinlogin = styled.div`
height: 620px;
width: 420px;
`
export const Mainlogin = styled.div`
height: 100%;
text-align: center;
`
export const Mainloginh1 = styled.h1`
font-size: 37px;
`

export const MainloginP = styled.p`
font-size: 32px;
`

export const Mainlogina = styled.a`
font-size: 32px;
`
export const Snsform = styled.div`

`
export const Snsformbutton = styled.button`
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

export const KakaoButton = styled.button`
width: 400px;
height: 40px;
background-color: white;
border-radius: 5px;
border: 1px solid rgb(187, 186, 186);
cursor: pointer;
margin-bottom: 20px;
`
function join() {
    return (
       <>
            <Header />
            
            <Jogcontent>
            <Joinlogin>

            <Mainlogin>
            <Mainloginh1>회원가입</Mainloginh1>
            <MainloginP>환영합니다.</MainloginP>
            <Mainlogina>저희 쇼핑몰 엄청 싸요 싸!</Mainlogina>

            <Snsform>
            <Link href="/member/register"><Snsformbutton>가입하기</Snsformbutton></Link>
            </Snsform>


       

      

            </Mainlogin>
            </Joinlogin>
   

            </Jogcontent>

        </>
    )
}

  
export default join
