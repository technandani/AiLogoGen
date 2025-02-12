import React from 'react'

function HeadingDescription ({title, description}){
  return (
    <>
      <>
     <h1 className='text-4xl  max-sm:text-3xl text-orange-600 font-bold'>{title}</h1>
            <p className='text-lg  max-sm:text-md text-gray-500'>
              {description}
            </p>
      </>
    </>
  )
}

export default HeadingDescription
