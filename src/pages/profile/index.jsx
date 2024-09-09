import React, { useEffect, useState } from 'react'
import customAxios from '../../axios';
import AddBookModal from '../../components/modals/AddBookModal';
import { useSelector } from 'react-redux';
import UpdatePhoto from '../../components/modals/UpdatePhoto';
import BooksAndPagi from '../../components/books/BooksAndPagi';

function User() {
  const { user } = useSelector(state => state.auth)
  const [books, setBooks] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 8;

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
        <div className='w-20 md:w-32 mx-4 relative'>
          <div className="avatar">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img src={user.avatar.url} alt={user.firstName} />
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
            {user.isAdmin && <img src='/icons/check.png' className='absolute bottom-1.5 right-1 w-7 h-7' alt="Admin" />}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg md:text-xl mb-2">{user.firstName + ' ' + user.lastName}</div>
          </div>
          <p className="text-gray-500 text-sm md:text-base w-5/6">
            {user.bio}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          {user._id && user.isAdmin && <AddBookModal />}
          {user.isAdmin && (
            <span className="text-gray-600 text-sm ml-2">书籍数量: {books && books.length}</span>
          )}
        </div>
      </section>
      {user.isAdmin && <BooksAndPagi books={books} setPage={setPage} pageCount={pageCount} />}
    </div>
  ) : (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <h1 className='text-gray-400 font-bold text-2xl'>未找到用户</h1>
    </div>
  )
}

export default User