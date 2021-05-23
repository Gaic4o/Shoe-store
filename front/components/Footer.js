import React from 'react'
import styled from 'styled-components';



export const Counseling = styled.div`
display: flex;
height: 70px;
background: #f2f2f2;
`
export const CouP= styled.p`
    width: 1300px;
    margin: auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
`


export const Footers = styled.div`
width: 1300px;
height: 180px;
font-family: 'Noto Sans KR', sans-serif;
display: flex;
margin: auto;
padding: 20px;
`

export const Name = styled.div`
    flex: 1;
`
export const Nameh1 = styled.p`
font-family: 'RixYeoljeongdo_Regular';
font-size: 25px;
`

export const Namep1 = styled.p`
font-size: 22px;
font-family: 'SLEIGothicTTF';
`
export const Namep2 = styled.p`
font-size: 22px;
font-family: 'SLEIGothicTTF';
`

export const FootInfo = styled.div`
    flex: 2;
    color: #8E8C8A;
    font-size: 15px;
`

function footer() {
    return (
        <div>
            


<Counseling>
    <CouP>
    톡톡상담 운영시간 오전 9:30 ~ 오후 6:00 (점심시간 12:30 ~ 1:30) 월요일과 휴일 다음날 오전은 상담 지연이 있을 수 있습니다.
    </CouP>
</Counseling>

    <Footers>
        <Name>
            <Nameh1>민수몰</Nameh1>
            <Namep1>신발을 싸게 사자</Namep1>
            <Namep2>민수장터</Namep2>
        </Name>
        <FootInfo>
            <p>상호: (주)민수장터 | 주소: 의정부시 의정부동 1120 (민수장터본부) | 대표 민수</p>
            <p>사업자등록번호: 123-456-7890[사업자정보확인] | 통신판매신고번호: 2021-민수-0427 | 개인정보관리자:김민수</p>
            <p>대표번호: 010-4951-5525 | 메일: alstntorl@naver.com</p>
            <p>CopyRight (c) minsuMall.com All Rights reservd. Hosting by 민수</p>
        </FootInfo>
    </Footers>
        </div>
    )
}

export default footer
