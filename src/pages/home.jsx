import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import customAxios from '../axios';
import { useSelector } from 'react-redux';
import BooksAndPagi from '../components/books/BooksAndPagi';


function Home() {
  const {user} = useSelector(state => state.auth)
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 8;

  useEffect(() => {
    const url = user && user.isAdmin ? 'books/admin' : 'books';
    (async() => {
      await customAxios.get(`/${url}?page=${page}&limit=${limit}`).then((res)=>{
        setBooks(res.data.books)
        setPageCount(Math.ceil(res.data.pagination.count))
      }).catch(e => toast.error(e.message))
    })();
  }, [page])

  return (
    <div className='min-h-[83vh] px-4'>
        <div className='hero py-40'>
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-xl md:text-5xl font-bold">Hello <span className='capitalize'>{user ? user.firstName : "Dear!"}</span></h1>
              <p className="py-6 md:text-lg">
              Welcome to our website, PDF Book Store! We are delighted to serve you and meet your electronic reading needs. We hope you have an enjoyable and beneficial experience with us. Enjoy browsing through many distinguished books and downloading them with ease. Thank you for trusting us!
              </p>
              {user ? <Link to="/profile"><button className='btn btn-primary btn-sm md:btn-md'>Show Profile</button></Link> : <Link to="/login"><button className='btn btn-primary'>Get Login</button></Link>}
            </div>
          </div>
        </div>
        <BooksAndPagi books={books} setPage={setPage} pageCount={pageCount} />
    </div>
  )
}

export default Home
