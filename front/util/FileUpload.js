import axios from 'axios';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'





const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    width: 1000px;
    margin: auto;
`;

const DropzoneSection = styled.section`
    border: 1px solid #dddddd;
    width: 300px;
    height: 240px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
`

const Confirm = styled.div`
    display: flex;
    width: 350px;
    height: 240px;
    overflow-X: scroll;
    border: 1px solid black;
    border: 1px solid #dddddd;
    margin-top: 70px;
`;

const ConfirmImg = styled.img`
    minWidth: 300px;
    width: 300px;
    height: 240px;
    overflow-X: scroll;
`;


function FileUpload(props) {

    const [Images, setImages] = useState([])

    const acceptedFiles = (files) => {

        let formData = new FormData(); // 파일 전송 할 떄 같이 보내 주어야 함.

        const config = {
            header: {'content-type': 'multipart/form-data'} // 어떤 파일 인지
        }
        formData.append("file", files[0])
        axios.post(`http://localhost:3060/product/image`, formData, config)
        .then(response => {
          if(response.data.success) {
            console.log(response.data)
            setImages([...Images, response.data.filePath])
            props.refreshFunction([...Images, response.data.filePath]) // 부모 컴포넌트도 같이 전달이 됩니다.
            
          } else {
            alert('파일 저장 실패');
          }
        })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        console.log('현제 값', currentIndex)

        let newImages = [...Images]
        newImages.splice(currentIndex, 1) // 하나의 아이템을 지움. 
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <>
        <Flex>
        <Dropzone onDrop={acceptedFiles}>
        {({getRootProps, getInputProps}) => (
          <DropzoneSection>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>이미지를 넣어주세요.</p>
              <p>사진은 한 장만 넣어주세요!</p>
            </div>
          </DropzoneSection>
        )}
      </Dropzone>
        
      <Confirm>
        {Images.map((image, index) => (
            <div onClick={() => deleteHandler(image)} key={index}>
                <ConfirmImg src={`http://localhost:3060/${image}`} />
            </div>
        ))}
      </Confirm>


      </Flex>
      </>
    )
}

export default FileUpload
