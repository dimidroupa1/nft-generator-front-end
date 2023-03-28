import Header from '@/components/Header'
import Main from '@/components/Main'
import { auth } from '@/firebase'
import React, { useEffect } from 'react'

type Props = {}

const Home = (props: Props) => {
  useEffect(() => {
    auth.signInAnonymously()
  }, [])
  return (
    <div className='w-full min-h-screen flex flex-col items-center text-white'>
      <Header />
      <Main />
    </div>
  )
}

export default Home