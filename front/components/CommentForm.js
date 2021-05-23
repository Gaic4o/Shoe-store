import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { COMMENT_LOADING_REQUEST } from '../reducers/product';

import styled from 'styled-components';


export const FormComment = styled.form`
display: flex;
align-items: center;
justify-content: center;
margin: auto;
`

export const Commentinput = styled.input`
border: 1px solid  #D2D1D0;
height: 30px;
width: 410px;
`

export const Commentbutton = styled.button`
height: 30px;
margin-left: 10px;
border: none;
`


function CommentForm({ product }) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id); // user 안에 me 
    const {  CommentLoading, CommentDone } = useSelector((state) => state.product);
    const [commentText, onChangeComment,setCommentText ] = useInput('');

    useEffect(() => {
        if(CommentDone) {
            setCommentText('');
        }
    }, [CommentDone]);


    const onSubmit = useCallback((e) => {
        e.preventDefault()
    dispatch({
        type: COMMENT_LOADING_REQUEST,
        data: { content: commentText,  productId: product.id, userId: id },
    })
    }, [commentText, id]);
    

    return (
      <>
    
        <FormComment onSubmit={onSubmit}>
        <Commentinput id="user-comment" name="user-comment" type="text" value={commentText} onChange={onChangeComment} placeholder="댓글"/>
        <Commentbutton type="primary" loading={CommentLoading}>버튼</Commentbutton>  
        </FormComment>

      </>
    )
}



export default CommentForm
