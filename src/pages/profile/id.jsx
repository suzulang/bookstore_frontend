import React, { useEffect, useState } from 'react'
import customAxios from '../../axios';
import Book from '../../components/books/Book';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../components/modals/DeleteModal';
import ReactPaginate from 'react-paginate';


function Profile() {
  const { user } = useSelector(state => state.auth)
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState(null);
  const { id } = useParams();
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
      await customAxios.get(`/profile/${id}?page=${page}&limit=${limit}`).then((res) => {
        setProfile(res.data.user)
        setBooks(res.data.user.books)
        setPageCount(Math.ceil(res.data.pagination.count))
      }).catch(e => toast.error(e.message))
    })();
  }, [id, page])
  
  return profile ? (
    <div className='mt-10 container mx-auto px-4'>
      {user._id === profile._id && <div className='w-full text-center'><span className='badge badge-lg badge-ghost'>You see your account as others see it.</span></div>}
      <section className="max-w-5xl rounded overflow-hidden shadow-lg mx-auto pt-4">
        <div className='w-32 mx-4 relative'>
        <div className="avatar">
          <div className="w-32 h-32 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
            <img src={profile.avatar.url} />
          </div>
        </div>
          <div>
            {profile.isAdmin && <img src='/icons/check.png' className='absolute bottom-1.5 right-1 w-7 h-7' />}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl mb-2">{profile.firstName + ' ' + profile.lastName}</div>
            {user.isAdmin &&
              <div>
                <DeleteModal profile={profile}/>
              </div>
            }
          </div>
          <p className="text-gray-500 text-base w-5/6">
            {profile.bio}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <span className="badge badge-sm">{profile.email}</span>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <span className="text-gray-600 text-sm ml-2">books: {books.length}</span>
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

export default Profile