import React from 'react'
import BookEmpty from '../com-small/BookEmpty';
import Loading from '../com-small/Loading';
import Book from './Book';
import ReactPaginate from 'react-paginate';

function BooksAndPagi({books, pageCount, setPage}) {
    const toPage = (event) => {  
        let i = event.selected + 1
        setPage((p) => {
          if (p === i) return p;
          return i
        })
      }
  return (
    <>
        <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <h2 className='text-xl md:text-2xl text-center md:col-span-full mb-8'><span className='border-b-2'>Books</span></h2>
        {books ? books.length > 0 ? books.map(e => {
          return <Book key={e._id} book={e} />
        }) : <BookEmpty /> : <Loading />}
      </div>
      { books && books.length > 0 && <ReactPaginate
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
        />}
    </>
  )
}

export default BooksAndPagi