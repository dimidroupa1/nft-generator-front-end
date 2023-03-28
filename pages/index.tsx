import Header from '@/components/Header'
import Main from '@/components/Main'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center text-white'>
      <Header />
      <Main />
    </div>
  )
}

export default Home