import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex rounded-lg overflow-hidden bg-gray-400  bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0 max-sm:h-[450px] md:h-[550px]'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage