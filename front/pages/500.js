import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'


export const P500 = styled.p`

    text-align: center;
    margin-top: 300px;
    font-size: 50px;
`


export default function Error500() {
    return (
        <>
            <Header />
            <P500>404 페이지 입니다!</P500>
        </>
    )
}
