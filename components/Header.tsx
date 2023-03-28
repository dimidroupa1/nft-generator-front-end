import Image from 'next/image'
import React from 'react'
import Logo from '../assets/logo.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='w-full border-b border-gray-500'>
        <div className='max-w-7xl py-6 px-10 2xl:px-0 mx-auto flex flex-col md:flex-row gap-5 items-center justify-between'>
            <div className=''>
                <Image src={Logo} alt="" className='max-w-[150px]'/>
            </div>
            <div className=''>
                <ConnectButton />
            </div>
        </div>
    </div>
  )
}

export default Header