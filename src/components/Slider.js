import React,{Component, useState} from 'react';
import RubberSlider from '@shwilliam/react-rubber-slider'
import '@shwilliam/react-rubber-slider/dist/styles.css'

export const Slider = () => {
    const [value, setValue] = useState(0.5)
  
    return <RubberSlider width={250} value={value} onChange={setValue} />
  }