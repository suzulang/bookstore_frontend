import React, { useEffect, useState } from 'react'
import customAxios from '../../axios';
import { Link, useParams } from 'react-router-dom';

function BookDetails() {
  const {id} = useParams();
  const [book, setBook] = useState(null);

  const discount = (price,discount)=> {
    return Math.ceil((price - (price * (discount/100)))).toFixed(2)
  }

  useEffect(() => {
    (async () => {
      await customAxios.get(`/books/${id}`).then((res) => {
        setBook(res.data.book)
      })
    })();
  }, [id])
  return (
    <div className='mt-10 container max-w-6xl mx-auto p-8 min-h-[75vh] flex justify-center items-center'>
      {book ? <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 bg-red-00 shadow-md">
            <div className="overflow-hidden rounded-lg bg-gray-100 sm:col-span-full lg:col-span-3 h-full">
              <img  src={book.image.url} alt="Two each of gray, white, and black shirts arranged on table." className="w-full h-72 md:h-96" />            
            </div>
            <div className="sm:col-span-8 lg:col-span-9 p-4">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 sm:pr-12">{book.title}</h2>
              <section className="mt-2">
                <div className="text-xl md:text-2xl text-gray-900">
                  {
                    book.price > 0 && <span className="text-primary text-base flex justify-between"> 
                        <span>
                          <span className={`${book.discount ? 'line-through text-red-600 text-xs opacity-50' : ''}`}>{book.price > 0 ? "£" + book.price : "Free"}</span>
                          {book.discount > 0 && " - £" + discount(book.price, book.discount)}
                        </span>
                        {book.discount > 0 && <div className='badge text-success text-xs md:text-base'>
                          Discount {book.discount}%
                      </div>}
                  </span>
                  }
                </div>
                <p className='py-2 first-letter:capitalize text-gray-500 text-sm md:text-base'>{book.discription}</p>
                <table className="table table-zebra text-xs md:text-sm">
                <tbody>
                  <tr>
                    <td className='font-bold'>Author</td>
                    <td>{book.author}</td>
                  </tr>
                  <tr>
                    <td className='font-bold'>Pages</td>
                    <td>{book.pages}</td>
                  </tr>
                  <tr>
                    <td className='font-bold'>Posted by</td>
                    <td>
                          { book.user ? <Link to={`/profile/${book.user._id}`} className='link link-primary'>
                              {book.user.firstName + ' ' + book.user.lastName}
                          </Link> : 'Not found user'}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-bold'>Download</td>
                    <td>{book.file.url != 'book.pdf' ? <a className='btn btn-success btn-xs md:btn-sm' href={book.file.url}>Dwonload</a> : <span className='text-error'>Unavailable</span>}</td>
                  </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
      : <h1 className='text-gray-400 font-bold text-2xl'>Not found book</h1>}
    </div>
  )
}

export default BookDetails