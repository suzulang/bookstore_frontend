import React, { useEffect, useState } from 'react'
import customAxios from '../../axios';
import Book from '../../components/books/Book';
import AddBookModal from '../../components/modals/AddBookModal';
import { useSelector } from 'react-redux';
import UpdatePhoto from '../../components/modals/UpdatePhoto';
import ReactPaginate from 'react-paginate';

function user() {
  const { user } = useSelector(state => state.auth)
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
    (async () => {
      await customAxios.get(`/profile?page=${page}&limit=${limit}`).then((res) => {
        setBooks(res.data.user.books);
        setPageCount(Math.ceil(res.data.pagination.count))
      }).catch(e => toast.error(e.message))
    })();
  }, [user, page])
  
  return user ? (
    <div className='mt-10 container mx-auto px-4'>
      <section className="max-w-5xl rounded overflow-hidden shadow-lg mx-auto pt-4">
        <div className='w-32 mx-4 relative'>
        <div className="avatar">
          <div className="w-32 h-32 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
            <img src={user.avatar.url} />
          </div>
        </div>
          <div>
            {user._id === user._id && 
            <div className="absolute bottom-0 left-full">
              <UpdatePhoto profile={user} />
            </div>
              }
          </div>
          <div>
            {user.isAdmin && <img src='/icons/check.png' className='absolute bottom-1.5 right-1 w-7 h-7' />}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl mb-2">{user.firstName + ' ' + user.lastName}</div>
          </div>
          <p className="text-gray-500 text-base w-5/6">
            {user.bio}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <span className="badge badge-sm">{user.email}</span>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          {user._id && <AddBookModal /> }
          <span className="text-gray-600 text-sm ml-2">books: {books && books.length }</span>
        </div>
      </section>
      <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <h2 className='text-2xl text-center md:col-span-full mb-8'><span className='border-b-2'>Books</span></h2>
        {books && books.map(e => {
          return <Book key={e._id} book={e} />
        })}
      </div>
      <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              pageLinkClassName="join-item btn"
              previousLinkClassName="join-item btn"
              nextLinkClassName="join-item btn"
              activeLinkClassName="bg-gray-300"
              disabledLinkClassName="opacity-50"
              containerClassName="join mt-10 w-full justify-center"
              onPageChange={toPage}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="previous"
              renderOnZeroPageCount={null}
          />
    </div>
  ) : <div className='min-h-[80vh] flex justify-center items-center'>
    <h1 className='text-gray-400 font-bold text-2xl'>Not found user</h1>
  </div>
}

export default user