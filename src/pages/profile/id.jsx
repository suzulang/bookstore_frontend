import React, { useEffect, useState } from 'react'
import customAxios from '../../axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../components/modals/DeleteModal';
import BooksAndPagi from '../../components/books/BooksAndPagi';


function Profile() {
  const { user } = useSelector(state => state.auth)
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState(null);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 8;

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
        <div className='w-20 md:w-32 mx-4 relative'>
        <div className="avatar">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
            <img src={profile.avatar.url} />
          </div>
        </div>
          <div>
            {profile.isAdmin && <img src='/icons/check.png' className='absolute bottom-1.5 right-1 w-7 h-7' />}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg md:text-xl mb-2">{profile.firstName + ' ' + profile.lastName}</div>
            {user.isAdmin &&
              <div>
                <DeleteModal profile={profile}/>
              </div>
            }
          </div>
          <p className="text-gray-500 text-sm md:text-base w-5/6">
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
      <BooksAndPagi books={books} setPage={setPage} pageCount={pageCount} />
    </div>
  ) : <div className='min-h-[80vh] flex justify-center items-center'>
    <h1 className='text-gray-400 font-bold text-2xl'>Not found user</h1>
  </div>
}

export default Profile