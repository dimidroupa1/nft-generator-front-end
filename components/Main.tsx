import React from 'react'
import Gallery from './Gallery'
import GenerateImage from './GenerateImage'

type Props = {}

const Main = (props: Props) => {
  return (
    <div className='flex-1 w-full flex flex-col lg:flex-row max-w-7xl'>
        <GenerateImage />
        <Gallery />
    </div>
  )
}

export default Main