import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput'
import FileUpload from '../util/FileUpload'
import {  PRODUCT_REQUEST } from '../reducers/product'
import axios from 'axios';
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components';


export const ShoesForm = styled.form`
    width: 1200px;
    margin: auto;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
`
export const ShoesInfo = styled.div`
width: 530px;
margin: auto;
padding: 10px 0 10px 0;
`
export const ShoesInfoInput = styled.input`
width: 530px;
height: 40px;
background-color: white;
border-radius: 5px;
border: 1px solid rgb(187, 186, 186);
cursor: pointer;
margin: 10px 0 20px 0;
`
export const ShoesInfoLabel = styled.label`
font-size: 14px;
margin-right: 6px;
`
export const SelectInfo = styled.select`
border-radius: 5px;
border: 1px solid rgb(187, 186, 186);
width: 530px;
height: 40px;
`
export const ShoesButton = styled.button`
width: 400px;
height: 70px;
background: #1EC68C;
border: 1px solid #1EC68C;
border-radius: 5px;
color: #fff;
font-size: 20px;
cursor: pointer;
text-align: center; 
margin: 100px 0 100px 0;
`

const ShoesNames = [
    {key: 1, value:"나이키 스니커즈" },
    {key: 2, value:"나이키 에어맥스" },
    {key: 3, value:"조던 덩크" },
    {key: 4, value:"조던 하이" },
    {key: 5, value:"조던 미드" },
    {key: 6, value:"뉴발란스 990" },
    {key: 7, value:"뉴발란스 327" },
    {key: 8, value:"컨버스 하이" },
    {key: 9, value:"반스 스니커즈" },
    {key: 10, value:"아디다스 이지부스트" },
    {key: 11, value:"아디다스 사키이 줌" },
]

const Codys = [
    {key: 1, value: '캐쥬얼 신발'},
    {key: 2, value: '힙한 신발'},
    {key: 3, value: '운동 할 떄 신발'},
]

const Brands = [
    {key: 1, value: '나이키'},
    {key: 2, value: '조던'},
    {key: 3, value: '뉴발란스'},
    {key: 4, value: '컨버스 * 반스'},
    {key: 5, value: '아디다스'},
]

function uploadPage() {
    const dispatch = useDispatch();
    const { ProductLoading, ProductDone, ProductError, productinfo} = useSelector((state) => state.product);
    const {   imageInfo } = useSelector((state) => state.product);
    const [ Title, onChangeTitle ] = useInput('');
    const [ Contents, onChangeContents ] = useInput('');
    const [ Price, onChangePrice ] = useInput(''); 
    const [ ShoesName, setShoesName] = useState(1);
    const [ Cody, setCody ] = useState(1);
    const [ Brand, setBrand ] = useState(1);
    const [Images, setImages] = useState([])

    
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const ShoesChangeHandler = (e) => {
        setShoesName(e.currentTarget.value);
    }
    
    const CodeChangeHandler = (e) => {
        setCody(e.currentTarget.value);
    }

    const BrandChangeHandler = (e) => {
        setBrand(e.currentTarget.value);
    }

    const shoesonSubmit = useCallback((e) => {
  // setsubmitting(true);
    e.preventDefault()
    console.log(Title, Contents, Price,  ShoesName, Cody, Brand, Images);
    dispatch({
        type: PRODUCT_REQUEST,
        data: {Title, Contents, Price,  ShoesName, Cody, Brand, Images},
    })
    }, [Title, Contents, Price,  ShoesName, Cody, Brand, Images]);



        return (
        <>
        <Header />
    <ShoesForm onSubmit={shoesonSubmit}>
    <FileUpload refreshFunction={updateImages} />
 
    <ShoesInfo>
    <ShoesInfoLabel htmlFor="shoes-title">제목</ShoesInfoLabel>
    <ShoesInfoInput id="shoes-title" type="text" value={Title} onChange={onChangeTitle} required/>
    </ShoesInfo>

    <ShoesInfo>
    <ShoesInfoLabel htmlFor="shoes-content">내용</ShoesInfoLabel>
    <ShoesInfoInput id="shoes-content" type="text" value={Contents} onChange={onChangeContents} required/>
    </ShoesInfo>

    <ShoesInfo>
    <ShoesInfoLabel htmlFor="shoes-price">가격</ShoesInfoLabel>
    <ShoesInfoInput id="shoes-price" type="number" value={Price} onChange={onChangePrice} required/>
    </ShoesInfo>
    
    <ShoesInfo>
    <SelectInfo value={ShoesName} onChange={ShoesChangeHandler}>
        {ShoesNames.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
        ))}
    </SelectInfo>
    </ShoesInfo>

    <ShoesInfo>
    <SelectInfo value={Cody} onChange={CodeChangeHandler}>
        {Codys.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
        ))}
    </SelectInfo>
    </ShoesInfo>
    

    <ShoesInfo>
    <SelectInfo value={Brand} onChange={BrandChangeHandler}>
        {Brands.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
        ))}
    </SelectInfo>
    </ShoesInfo>
 
    <ShoesButton type="primary" onClick={() => ProductLoading}>등록</ShoesButton>
            
    </ShoesForm>

    <Footer/>
</>
          
        )
}
    

export default uploadPage

