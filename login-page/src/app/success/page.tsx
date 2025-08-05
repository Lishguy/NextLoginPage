import Link from 'next/link'
import React from 'react'

const Success = () => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-orange-300/20'>
      <h1 className='text-center m-auto justify-center text-4xl font-bold text-gray-700'>Your Login was Succesful👍</h1>  
      <Link href='/login' className='text-center m-auto justify-center p-2 rounded-md shadow-4xl bg-amber-200 text-gray-600'>Logout</Link>
    </div>
  )
}

export default Success
