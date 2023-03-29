import React, { useState } from 'react'
import Gallery from './Gallery'
import GenerateImage from './GenerateImage'

type Props = {}

const Main = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string>('')  
  return (
    <div className='flex-1 w-full flex flex-col lg:flex-row max-w-7xl md:max-h-[calc(99vh-88px)]'>
        <GenerateImage selectedImage={selectedImage}/>
        <Gallery setSelectedImage={setSelectedImage}/>
    </div>
  )
}

export default Main