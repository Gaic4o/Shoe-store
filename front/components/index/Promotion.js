import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { backUrl } from '../../config/config';

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
  const newrespoon = await axios.get(`${backUrl}/product/new`);
  const heaprespon = await axios.get(`${backUrl}/product/heap`);
  const Casualrespon = await axios.get(`${backUrl}/product/Casual`)
  const Exerciserespon = await axios.get(`${backUrl}/product/Exercise`)
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

  if (loading) return <div>?????????..</div>
  if (error) return <div>????????? ??????????????????.</div>
  if (!Heap) return null;


//   const renderCards = Datas.map((data, index) => {
//     console.log('datas', data);
    
  const NewCard = New.map((product, index) => {
    return <Data key={index}>
        <Box>
            <a href={`/product/info/${product.id}`} >
      <Img src={`${backUrl}/${product.Images[0].src}`} />
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
      <Img src={`${backUrl}/${product.Images[0].src}`} />
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
      <Img src={`${backUrl}/${product.Images[0].src}`} />
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
                  <Img src={`${backUrl}/${product.Images[0].src}`} />
              </a>
              <H1>{product.Title}</H1>
              <P>{product.Price}</P>
          </Box>
      </Data>
  })
  


  return (
     <>

    
    <NewInfo>
    <h1>?????????</h1>
    <NewCards>
    {NewCard}
    </NewCards>
    </NewInfo>

    <Bottom />


    <Tibal>
    <Text>
    <p>????????? ??? ????????????<br /> <B>?????? ??????</B></p>
    </Text>
    {HeapCard}
    </Tibal>

    <Bottom />

<Tibal>
<Text>
<p>????????? ???????????? <br /> <B>????????? ??????</B></p>
</Text>
{CasualCard}
</Tibal>

<Bottom />


<Tibal>
<Text>
<p>???????????? ?????? ????????? <br /> <B>?????????</B></p>
</Text>
{ExerciseCard}
</Tibal>

<FooterBox>
    <Account>
    <h1>????????????</h1>
    <p>???????????? 267302-04-286474 | ???????????? 1028-01-3929 | ???????????? 1029-1093-1020</p>
    <a>????????? ????????????(??????) ?????????</a>
    </Account>

    <Store>
    <h1>????????? ????????????</h1>
    <a href="https://blog.naver.com/alstntorl"><b>????????? ?????????</b></a>
    </Store>
</FooterBox>
</>
  )
}

export default Promotion
