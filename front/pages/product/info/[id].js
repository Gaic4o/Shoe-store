import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import Header from '../../../components/Header'
import axios from 'axios';
import wrapper from '../../../store/configureStore';
import { PRODUCT_INFO_REQUEST, BASKET_REQUEST } from '../../../reducers/product';
import { LOAD_MY_INFO_REQUESTS} from '../../../reducers/user';
import styled from 'styled-components';
import Footer from '../../../components/Footer';
import CommentForm from '../../../components/CommentForm';
import ShoppBasket from '../../../components/ShoppBasket';
import { List, Comment, Avatar } from 'antd';
import moment from 'moment'



moment.locale('ko');


export const Infomat = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  width: 1300px;
  margin: auto;
  padding: 30px 0 30px 0;
  font-family: 'Noto Sans KR', sans-serif;
  `
export const InfoImg = styled.div`
  background: #EBF0F5;
  margin-right: 70px;
  height: 500px;
  margin-top: 90px;
`

export const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 90px;
`

export const Price = styled.div`
font-size: 20px;

`

export const Img = styled.img`
height: 500px;
width: 500px;
`

export const InfopCard = styled.i`
  margin: 50px 0 50px 0;
`

export const InfoI = styled.i`
font-size: 20px;
`

export const Contents = styled.i`
  margin-bottom: 30px;  
`


export const InfoCard = styled.div`
  width: 370px;
`

export const InfoBorad = styled.div`
  border-top: 1px solid #8E8C8A;
  width: 100%;
  height: 370px;
`
export const InfoBasket = styled.div`

`

export const InfoaSect = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
`
export const Infoa = styled.i`
  border: 1px solid black;

`

export const InfoSecti = styled.button`
background-color: white;
border: 1px solid  #D2D1D0;
border-radius: 5px;
padding: 10px 30px 10px 30px;

`

export const InfoBuy = styled.button`
background-color: #FF5442;
border: 1px solid #D2D1D0;
border-radius: 5px;
padding: 10px 30px 10px 30px;
color: white;

`

export const ListComment = styled.div`
`
export const Comments = styled.div`
margin-bottom: 100px;
margin: auto;
padding: 30px;

`

export const Length = styled.i`
margin-left: 41px;
display: flex;
align-items: center;
justify-content: center;
margin-right: 320px;
`
export const CreateAt = styled.div`
display: flex;
align-items: center;
justify-content: center;

`
const CommentContent = styled(Comment)`
  font-size: 20px;
  `;

const DivConent = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin: auto;
width: 500px;
height: 60px;
border: 1px solid #dddddd;
`

function Product({  })  { 
    const { productinfo } = useSelector((state) => state.product);
    
    return (
      <>
      <Header />
    
        <Infomat>
      <InfoImg>
      <Img src={`http://localhost:3060/${productinfo.Images[0].src}`} />
      </InfoImg>

      <InfoCard>
      <Title>
      {productinfo.Title}
      </Title>
      <Price>
      {productinfo.Price}원
      </Price>
        
      <InfopCard>
      <InfoI>보기만 하지 말고 가입하고 구매 하세요!</InfoI>
      <InfoI>무료 배송</InfoI>
      <InfoI>판매자 주식회사 민수장터</InfoI>
      </InfopCard>
      
      
      <Contents>
      <p>{productinfo.Contents}</p>
      </Contents>

      <InfoBorad>
      <p>상품금액: {productinfo.Price}원</p>
      
      <InfoaSect>

      <ShoppBasket product={productinfo} />
      <InfoBuy>바로 구매</InfoBuy>
    
      </InfoaSect>
      </InfoBorad>
      



      </InfoCard>
      </Infomat>

      <ListComment>

      <Comments>
      <CommentForm product={productinfo}/>

    <Length>{`${productinfo.Comments.length}개의 댓글`}</Length>


  
       <List
            itemLayout="horizontal"
            dataSource={productinfo.Comments}
            renderItem={(item) => (
              <DivConent>            
                <CommentContent
                  author={item.User.regid} 
                  content={item.content}
                />
                  <CreateAt>{moment(Comments.createdAt).format('YYYY.MM.DD HH:mm')}</CreateAt>
              </DivConent>
            )}
          /> 

          
    </Comments>



    </ListComment>
  
  
      <Footer/>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: PRODUCT_INFO_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUESTS,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default Product