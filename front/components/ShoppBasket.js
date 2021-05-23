import React, {useCallback, useEffect} from 'react'
import { BASKET_REQUEST, UNBASKET_REQUEST } from '../reducers/product'
import { useDispatch,  useSelector } from 'react-redux'
import styled from 'styled-components';
import { Button } from 'antd';
import PropType from 'prop-types';

export const CartSection = styled.div`

`

export const CartButton = styled.button`
padding: 10px 30px 10px 30px;
background-color: #1EC68C;
border: 1px solid #D2D1D0;
border-radius: 5px;
color: white;
font-family: 'Noto Sans KR', sans-serif;
cursor: pointer;
`

ShoppBasket.propType = {
  product: PropType.shape({
    product: PropType.shape({
      id: PropType.number,
      data: PropType.number,
    })
  })
}

function ShoppBasket({ product }) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);


    const Basket = useCallback(() => {
        if(!id) {
          return alert('로그인이 필요합니다.');
        }
        return dispatch({
          type: BASKET_REQUEST,
          data: product.id,
        })
      }, [id]);
      
    const UnBasket = useCallback(() => {
      if(!id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: UNBASKET_REQUEST,
        data: product.id
      })
    }, [id]);

      console.log(product);
      
      const cart = product.Carts.find((v) => v.id === id);

    return (
        <CartSection>
          {
         cart 
         ? <CartButton onClick={UnBasket}>취소 상품</CartButton>
         : <CartButton onClick={Basket}>상품 구독</CartButton> 
          }

        </CartSection>
    )
}

export default ShoppBasket
