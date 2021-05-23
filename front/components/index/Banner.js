import React from 'react'
import Link from 'next/link';
import styled from 'styled-components'

export const A = styled.a`
    text-decoration: none;
    padding-right: 30px;
    cursor: pointer;
`


function banner() {
    return (
        <div>
            <Link href="/member/login"><A>로그인</A></Link>
            <Link href="/member/join"><A>회원가입</A></Link>
        </div>
    )
}

export default banner
