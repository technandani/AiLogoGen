import React from 'react'

const loading = () => {
  return (
    <div className='h-full w-screen'>
      <div className='grid grid-cols-2'>
        <div className='animate-pulse bg-gray-200'></div>
        <div className='animate-pulse bg-gray-200'></div>
      </div>
    </div>
  )
}

export default loading
