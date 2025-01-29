import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

interface ImgContainerProps {
  imgScrcs: string[];
  imgWidth: number;
  imgHeight: number;
  duration: number;
}

const tick = 16; // 16ms per tick
let timer:number|undefined = undefined;


const ImgContainer = forwardRef(({ imgScrcs = [], imgWidth = 521, imgHeight = 281, duration = 2001 }: ImgContainerProps, ref) => {

  const divRef = useRef<HTMLDivElement>(null);

  const style ={
    width: imgWidth * imgScrcs.length,
    height: imgHeight,
  };

  const imgs = imgScrcs.map((src, index) => {
    return (
      <img key={index} src={src} style={{ width: imgWidth, height: imgHeight,float:'left' }} />
    );
  });

  /**
   * switch to the image at the given index, and there will be a transition of animation
   * @param index the index of the image to switch to
  */
  function switchToImgIndex(index: number) {

    if(index<0){
      index = 0;
    }
    if(index>imgScrcs.length-1){
      index = imgScrcs.length-1;
    }

    //1. get the left margin of the target image according to the index
    const targetLeftMargin = -index * imgWidth;
    //2 get the current left margin
    let currentLeftMargin = parseFloat(getComputedStyle(divRef.current!).marginLeft);

    
    //3 calculate the nmber of times the elemet to move
    const times = Math.ceil(duration / tick);
    let currentTimeNumber = 0;
    // 4 calculate the distance to move in each tick
    const toalDistance = targetLeftMargin - currentLeftMargin;
    const distancePerTick = toalDistance / times;

    //5 clear the previous timer if there are any
    clearInterval(timer);

    timer = setInterval(() => {
      currentTimeNumber++;

      currentLeftMargin += distancePerTick;

      divRef.current!.style.marginLeft = currentLeftMargin + 'px';
      if (currentTimeNumber === times) {
        divRef.current!.style.marginLeft = targetLeftMargin + 'px';
        clearInterval(timer);
      }
    }, tick);

  };

  useImperativeHandle(ref, () => ({
    switchToImgIndex
  }));

  return (
    <div style={style} ref= {divRef}>
      {imgs}
    </div>
  );
});

 
export default ImgContainer