import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-[#EAE0CF] h-[100vh] w-full flex flex-col place-content-center place-items-center p-2'>
        <h1 className='text-6xl sm:text-9xl font-bold'>404</h1>
        <h2 className='mt-4 text-xl sm:text-3xl text-center'>You broke the internet. Congratulations.</h2>
        <p className='text-sm sm:text-xl'>light mode activated as punishment</p>
    </div>
  )
}

export default NotFound