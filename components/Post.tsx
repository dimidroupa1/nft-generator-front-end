import React from 'react'

type Props = {
    item: any
}

const Post = ({ item }: Props) => {
  return (
    <div className='flex flex-col w-[100%] p-5 gap-3 hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-md cursor-pointer'>
        <h1>{item.data().prompt}</h1>
        <img src={item.data().photo} className='w-[100%] object-cover rounded-md' />
    </div>
  )
}

export default Post