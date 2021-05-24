import React from 'react';

  function ImageSlider(props) {
    return (
      <div>
         {props.images.map((image, index) => (
             <div key={index}>
                 <img style={{ width: '100%', maxHeight: '150px' }}
                  src={`http://localhost:3060${image}`} />
             </div>
         ))}
      </div>
  )
  }

export default ImageSlider