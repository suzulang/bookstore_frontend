import React from 'react'

function BookEmpty() {
  return (
    <div className='h-[50vh] flex justify-center items-center col-span-full'>
        <div className='text-lg md:text-xl font-medium text-gray-500'>
            <h4>Not found book</h4>
        </div>
    </div>
  )
}

export default BookEmpty