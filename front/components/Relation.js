import React, {useState } from 'react'

import Link from 'next/link';
import styled from 'styled-components';



export const Button = styled.button`
    background: white;
    border: none;
    margin-right: 50px;
    font-size: 17px;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
`

export const Relations = styled.div`
width: 1300px;
margin: auto;
font-family: 'Noto Sans KR', sans-serif;
`;

export const Box = styled.div`
display: flex;
justify-content: space-evenly;
text-align: center;
height: 100px;  
margin-bottom: 100px;
`

export const Img = styled.div`
width: 70px;
height: 70px;
border: 1px solid #CCCCCC;
border-radius: 50%;
`;

export const Imgsrc = styled.img`
width: 55px;
height: 45px;
padding: 4px;
margin-top: 6px;

`;

export const BoxFlex = styled.div`

`


export const ConMap = styled.div`
width: 1300px;
margin: auto;
padding: 90px 0 80px 0;

`

export const ConFont = styled.div`
    display: flex;
    padding: 0 0 15px 0;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 50px;
`


export const BrandP = styled.div`
 cursor: pointer;
 margin-top: 10px;
`





function Relation() {
   

    return ( 
        <>

        
    <Relations> 
        <Box>
            <BoxFlex>
                <Img>
                <Imgsrc src="/jordan.png" />
                </Img>
            <Link href="/search/조던"><BrandP>조던</BrandP></Link>
            </BoxFlex>

            <BoxFlex>
                <Img>
                <Imgsrc src="/canvas.png" />
                </Img>
                <Link href="/search/컨버스"><BrandP>컨버스</BrandP></Link>
            </BoxFlex>

            <BoxFlex>
            <Img>
                <Imgsrc src="/vans.png" />
                </Img>
                <Link href="/search/반스"><BrandP>반스</BrandP></Link>
            </BoxFlex>
            <BoxFlex>
            <Img>
                <Imgsrc src="/Like.png" />
                </Img>
                <Link href="/search/나이키"><BrandP>나이키</BrandP></Link>
            </BoxFlex>
            <BoxFlex>
            <Img>
                <Imgsrc src="/adias.png" />
                </Img>
                <Link href="/search/아디다스"><BrandP>아디다스</BrandP></Link>
            </BoxFlex>
            <BoxFlex>
            <Img>
                <Imgsrc src="/newban.png" />
                </Img>
                <Link href="/search/뉴발란스"><BrandP>뉴발란스</BrandP></Link>
            </BoxFlex>
        </Box>  
    </Relations>



    </>
    
    )
}

export default Relation
