import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import customAxios from '../axios';
import Book from '../components/books/Book';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';


function Home() {
  const {user} = useSelector(state => state.auth)
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 8;
  const toPage = (event) => {  
    let i = event.selected + 1
    setPage((p) => {
      if (p === i) return p;
      return i
    })
  }

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
              <h1 className="text-5xl font-bold">Hello <span className='capitalize'>{user ? user.firstName : "Dear!"}</span></h1>
              <p className="py-6 text-lg">
              Welcome to our website, PDF Book Store! We are delighted to serve you and meet your electronic reading needs. We hope you have an enjoyable and beneficial experience with us. Enjoy browsing through many distinguished books and downloading them with ease. Thank you for trusting us!
              </p>
              {user ? <Link to="/profile"><button className='btn btn-primary'>Show Profile</button></Link> : <Link to="/login"><button className='btn btn-primary'>Get Login</button></Link>}
            </div>
          </div>
        </div>
        <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          <h2 className='text-2xl text-center md:col-span-full mb-8'><span className='border-b-2'>Books</span></h2>
          {books && books.map(e => {
            return <Book key={e._id} book={e} />
          })}
        </div>
        <div className='mt-10 container mx-auto flex justify-center'>
          <ReactPaginate 
              breakLabel="..."
              nextLabel="next"
              pageLinkClassName="join-item btn"
              previousLinkClassName="join-item btn"
              nextLinkClassName="join-item btn"
              breakLinkClassName="join-item btn"
              activeLinkClassName="bg-gray-300"
              disabledLinkClassName="opacity-50"
              containerClassName="join"
              onPageChange={toPage}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="previous"
              renderOnZeroPageCount={null}
          />
        </div>
    </div>
  )
}

export default Home
