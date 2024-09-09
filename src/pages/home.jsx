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
              <h1 className="text-xl md:text-5xl font-bold">你好 <span className='capitalize'>{user ? user.firstName : "通达学生"}</span></h1>
              <p className="py-6 md:text-lg">
              欢迎来到我们的网站，PDF图书商店！我们很高兴为您服务，满足您的电子阅读需求。我们希望您能在这里获得愉快和有益的体验。请尽情浏览众多优秀的图书，并轻松下载。感谢您的信任！
              </p>
              {user ? <Link to="/profile"><button className='btn btn-primary btn-sm md:btn-md'>个人主页</button></Link> : <Link to="/login"><button className='btn btn-primary'>Get Login</button></Link>}
            </div>
          </div>
        </div>
        <BooksAndPagi books={books} setPage={setPage} pageCount={pageCount} />
    </div>
  )
}

export default Home
