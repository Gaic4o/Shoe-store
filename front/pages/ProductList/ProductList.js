import React, {useState, useEffect, useCallback} from 'react'
import axios from "axios"; 
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styled from 'styled-components';






export  const CardImg = styled.div`

`

export const CardItems = styled.div`

    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 1300px;
    font-family: 'Noto Sans KR', sans-serif;
    flex-wrap: wrap;
    padding: 80px 0 10px 0;

`
export const Inputfunction = styled.div`
  height: 300px;
  width: 300px;
  border: 1px solid red;
  margin: auto;
`

export const Filterfunction = styled.div`
  height: 300px;
  width: 1000px;
  border: 1px solid red;
  margin: auto;
`

export const Viewmore = styled.div`
  text-align: center;
`


export const ViewButton = styled.button`
margin-bottom: 50px;
background-color: #1EC68C;
border-radius: 6px;
border: 1px solid #1EC68C;
cursor: pointer;
padding: 5px 20px 5px 20px;
font-size: 14px;
color: white;
`













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
color: #605D5B;

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
`

export const Bottom = styled.div`
border-bottom: 1px solid #dddddd;
width: 1300px;
text-align: center;
margin: 100px 300px 100px 300px;
`














function ShoesNames() {
    
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0) // 더보기 버튼 더 이상 제품이 없을 떄 .


    useEffect(() => {
        
        let body = {
            skip: Skip,
            limit: Limit,
        }
      
        getProducts(body)
    }, [])




    const getProducts = (body) => {
        axios.post('/product/AllLists', body)
        .then(response => {
            if (response.data.success) {
                if(body.loadMore) { // 더보기 버튼 눌렀을 떄 
                    setProducts([...Products, ...response.data.productInfo ])
                } else { 
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize)
            } else {
                alert('상품 업로드 실패');
            }
        })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit  // 0 + 8 = 8   8 + 8 = 16 
    
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true, // 더보기 버튼을 눌렀을 떄 가는 request 
        }
        getProducts(body) 
        setSkip(skip)
    }

    

    const renderCards = Products.map((product, index) => {
        return (
            <div key={index}>

        
            <CardImg>
            <a href={`/product/info/${product.id}`} >
            <Img src={`http://localhost:3060/${product.Images[0].src}`} />
            </a>

            </CardImg>
         
            <H1>{product.Title}</H1>
            <P>{product.Price}</P>
            </div>
        )
    })






    return (
        <div>
            <Header />

            {/* 상품 아이템들. */}
            <CardItems>
            {renderCards}
            </CardItems>

            <br />
    
        
               {PostSize >= Limit &&
                <Viewmore>
               <ViewButton onClick={loadMoreHandler}>더보기</ViewButton>
               </Viewmore>
            }
          
            <Footer />
        </div>
    )
}

export default ShoesNames
