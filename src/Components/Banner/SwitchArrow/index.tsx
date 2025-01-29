import React from 'react';
import './index.css';

interface SwitchArrowProps{
  onChange: (direction: 'left'| 'right')=>void;
}


const SwitchArrow = (props:SwitchArrowProps) => {
  return (
    <div className='arrow'>
        <span className='left' onClick={() => props.onChange('left')}>&lt;</span>
        <span className='right' onClick={() => props.onChange('right')}>&gt;</span>
    </div>
  )
}

export default SwitchArrow