import React from 'react'
import Banner from '.'
import img1 from '../../assets/img/1.webp';
import img2 from '../../assets/img/2.webp';
import img3 from '../../assets/img/3.webp';
import img4 from '../../assets/img/4.webp';
import img5 from '../../assets/img/5.webp';



const defaultProps = {
  width: 520,
  height: 280,
  imgSrcs: [img1, img2, img3, img4, img5],
  autoDuration: 3000,
  duration: 500
};

const Test = () => {
  return (
    <div className='container'>
        <Banner {...defaultProps} />
    </div>
  )
}

export default Test