import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls/authApiCall';
import ResetPassword from '../modals/ResetPassword';
import UpdateProfile from '../modals/UpdateProfile';
import DeleteModal from '../modals/DeleteModal';
import { totalBooksCart } from '../../pages/Cart';

function NavBarCmp() {
    const {user} = useSelector(state => state.auth)
    const {books} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LinksCom = ({type}) => {
        return (
            <>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                {
                    user ? (
                        <>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <Link to='/cart'>Cart
                                    {totalBooksCart(books) > 0 ? <span className='badge badge-success'>{totalBooksCart(books)}</span> : ''}
                                </Link>
                            </li>
                        </>
                    ): (
                        <>
                            <li>
                                <Link to={'/login'}>Login</Link>
                            </li>
                        </>
                    )
                }
            </>
        )
    }
    const UserCom = () => {
        return (
            <>
                <div className="avatar">
                    <div className="w-8 rounded-full ring-2 ring-primary ring-offset-base-100">
                    <img src={user.avatar.url} />
                    </div>
                </div>
            </>
        )
    }

    const handelLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

  return (
    <>
        <div className='navbar'>
            <div className='navbar-start'>
                <div className='dropdown'>
                    <label tabIndex={0} className="lg:hidden btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <div className="dropdown-content w-52 menu-sm z-[1]">
                        <div className="px-1 menu menu-vertical bg-white border rounded divide-y space-y-2">
                            <LinksCom />
                        </div>
                    </div>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Book Store</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <LinksCom />
                </ul> 
            </div>
            <div className='navbar-end space-x-2'>
               {user && <>
                    <div className='dropdown dropdown-end'>
                        <label tabIndex={0} className='btn'>
                            {user.firstName}
                            <UserCom />
                        </label>
                        <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/profile'>
                                    <button className='flex space-x-2 items-center'>
                                        <i className="bi bi-person-square text-success text-lg"></i>
                                        <span>Profile</span>
                                    </button>                                    
                                </Link>
                            </li>
                            <li>
                                <ResetPassword profile={user} />
                            </li>
                            <li>
                                <UpdateProfile profile={user} />
                            </li>
                            <li>
                                <DeleteModal profile={user} />
                            </li>
                            <li>
                                <button onClick={handelLogout} className='flex space-x-2 items-center'>
                                    <i className="bi bi-box-arrow-in-left text-error text-lg"></i>
                                    <span>Logout</span>
                                </button>                                    
                            </li>
                        </div>
                    </div>
               </>
               }
            </div>
        </div>
    </>
  )
}

export default NavBarCmp