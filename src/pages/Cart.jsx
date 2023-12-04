import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Book, { discount } from '../components/books/Book';


export const totalBooksCart = (books) => {
  return books.length
}

export const totalCopiesofBooks = (books) => {
  return books.reduce((prev, curr) => {
    return prev + parseInt(curr.cartCount)
  }, 0)
}

export const totalPriceofBooks = (books) => {
  return books.reduce((prev, curr) => {
    let price = curr.discount ? discount(curr.price, curr.discount) : curr.price;
    return prev + (curr.cartCount * price)
  }, 0)
}

function Cart() {
    const {books} = useSelector(state => state.cart)
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
      setTotal(() => {
        return totalPriceofBooks(books)
      })
    }, [books])
    
  return (
    <div>
      <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <h2 className='text-2xl text-center md:col-span-full mb-8'><span className='border-b-2'>Carts</span></h2>
        <div className="col-span-full flex flex-col items-center text-lg font-bold">
          <div>
            <span>Count Books: </span>
            <span className='text-gray-500'>{totalBooksCart(books)}</span>
          </div>
          <div>
            <span>total Copies of Books: </span>
            <span className='text-gray-500'>{totalCopiesofBooks(books)}</span>
          </div>
          <div>
            <span className='mr-s2'>Total Price of Books: </span>
            <span className='text-gray-500'>£{total}</span>
          </div>
        </div>
        {books.length > 0 ? books.map(e => {
          return <Book key={e._id + (Math.random()*10000)} book={e}/>
        }) : 
        <div className='col-span-full min-h-[60vh] flex justify-center items-center'>
          <h2 className='text-2xl text-gray-400 font-bold'>Cart is empty</h2>
        </div>}
      </div>
    </div>
  )
}

export default Cart