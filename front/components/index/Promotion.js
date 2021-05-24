import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Data = styled.div`
    
`
export const Img = styled.img`
  width: 300px;
  height: 285px;
  background: #F4F4F4;
`
export const Box = styled.div`
width: 300px;
height: 400px;
overflow: hidden;
box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);
border-radius: 10px;
`

export const Text = styled.div`
width: 300px;
height: 400px;
font-size: 25px;
margin-top: 65px;
text-align: center;
`

export const H1 = styled.h1`
font-size: 15px;
margin-left: 10px;
font-family: 'Noto Sans KR', sans-serif;

`
export const P = styled.p`
font-size: 14px;
margin-left: 10px;
`


export const NewCards = styled.div`
display: flex;
justify-content: space-between;
font-family: 'Noto Sans KR', sans-serif;
`

export const NewInfo = styled.div`
margin: auto;
width: 1300px;
font-family: 'Noto Sans KR', sans-serif;
`

export const Tibal = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 1300px;
    font-family: 'Noto Sans KR', sans-serif;
    flex-wrap: wrap;
    padding-top: 100px;
`

export const Bottom = styled.div`
border-bottom: 1px solid #dddddd;
width: 1300px;
margin: auto;
padding-top: 100px;
`


export const FooterBox = styled.div`
width: 1300px;
margin: auto;
display: flex;
padding: 100px 0 100px 0;
justify-content: space-evenly;
font-family: 'Noto Sans KR', sans-serif;
font-size: 14px;
`

export const Account = styled.div`
width: 610px;
height: 160px;
border: 1px solid #dddddd;
border-radius: 10px;
padding: 0 0 0 10px;
`

export const Store = styled.div`
width: 610px;
height: 160px;
border: 1px solid #dddddd;
border-radius: 10px;
padding: 0 0 0 10px;
font-size: 15px;
`

export const B = styled.b`
font-size: 40px;
`



function Promotion() {
  const {   productinfo } = useSelector((state) => state.product);
  const [New, setNew] = useState(null);
  const [Heap, setHeap] = useState(null);
  const [Casual, setCasual] = useState(null);
  const [Exercise, setExercise] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
try {
  setError(null);
  setNew(null);
  setHeap(null);
  setCasual(null);
  setExercise(null);
  setLoading(true);
  const newrespoon = await axios.get(`http://localhost:3060/product/new`);
  const heaprespon = await axios.get(`http://localhost:3060/product/heap`);
  const Casualrespon = await axios.get(`http://localhost:3060/product/Casual`)
  const Exerciserespon = await axios.get(`http://localhost:3060/product/Exercise`)
  setNew(newrespoon.data);
  setHeap(heaprespon.data);
  setCasual(Casualrespon.data);
  setExercise(Exerciserespon.data);
//  .then(function (response) {
//     console.log(response);
//   })
} catch (e) {
  setError(e);
}
setLoading(false); 
    }
fetchUsers();

  }, []);

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!Heap) return null;


//   const renderCards = Datas.map((data, index) => {
//     console.log('datas', data);
    
  const NewCard = New.map((product, index) => {
    return <Data key={index}>
        <Box>
            <a href={`/product/info/${product.id}`} >
      <Img src={`http://localhost:3060/${product.Images[0].src}`} />
      </a>
      <H1>{product.Title}</H1>
      <P>{product.Price}</P>
      </Box>
    </Data>
  })

  const HeapCard = Heap.map((product, index) => {
    return <Data key={index}>
        <Box>
            <a href={`/product/info/${product.id}`} >
      <Img src={`http://localhost:3060/${product.Images[0].src}`} />
      </a>
      <H1>{product.Title}</H1>
      <P>{product.Price}</P>
      </Box>
    </Data>
  })
  const CasualCard = Casual.map((product, index) => {
      return <Data key={index}>
          <Box>
          <a href={`/product/info/${product.id}`} >
      <Img src={`http://localhost:3060/${product.Images[0].src}`} />
      </a>
      <H1>{product.Title}</H1>
      <P>{product.Price}</P>
      </Box>
      </Data>
  })
  const ExerciseCard = Exercise.map((product, index) => {
      return <Data key={index}>
          <Box>
              <a href={`/product/info/${product.id}`}>
                  <Img src={`http://localhost:3060/${product.Images[0].src}`} />
              </a>
              <H1>{product.Title}</H1>
              <P>{product.Price}</P>
          </Box>
      </Data>
  })
  


  return (
     <>

    
    <NewInfo>
    <h1>신상품</h1>
    <NewCards>
    {NewCard}
    </NewCards>
    </NewInfo>

    <Bottom />


    <Tibal>
    <Text>
    <p>어디든 잘 어울리는<br /> <B>힙한 신발</B></p>
    </Text>
    {HeapCard}
    </Tibal>

    <Bottom />

<Tibal>
<Text>
<p>민수가 추천하는 <br /> <B>캐쥬얼 신발</B></p>
</Text>
{CasualCard}
</Tibal>

<Bottom />


<Tibal>
<Text>
<p>푹신푹신 하고 멋나는 <br /> <B>운동화</B></p>
</Text>
{ExerciseCard}
</Tibal>

<FooterBox>
    <Account>
    <h1>계좌안내</h1>
    <p>국민은행 267302-04-286474 | 신한은행 1028-01-3929 | 민수은행 1029-1093-1020</p>
    <a>예금주 민수장터(대표) 김민수</a>
    </Account>

    <Store>
    <h1>온라인 매장안내</h1>
    <a href="https://blog.naver.com/alstntorl"><b>민수의 블로그</b></a>
    </Store>
</FooterBox>
</>
  )
}

export default Promotion
