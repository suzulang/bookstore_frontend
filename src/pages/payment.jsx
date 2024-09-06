import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='h-[85vh] flex justify-center items-center'>
        <div className='text-2xl'>支付页面与接口<Link to='/' className='link link-primary'>Home</Link></div>
    </div>
  )
}

export default NotFound