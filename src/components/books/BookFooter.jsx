import { addToCart, bookExistsInCart, editCartCount, removeFromCart } from "../../redux/apiCalls/cartApiCall";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";



function BookFooter({book,books}) {
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)

    const AddToCart = (book) => {
        dispatch((addToCart(book)))
      }
  
      const removeBookFromCart = (book) => {
        dispatch((removeFromCart(book)))
      }
  
      const editCountCart = (e) => {
        e.preventDefault()
        dispatch((editCartCount(book, count)))
      }
  
      function bookExistsInCartFun(book) {
        return bookExistsInCart(books, book)
      }

  return (
        <div className="text-2xl space-x-2 flex justify-between mt-2 items-center">
             <Link to={`/books/${book._id}`} className="btn btn-sm" >
                <i className="bi bi-eye text-base"></i>
              </Link>
             <div className="flex items-center space-x-2">
                {bookExistsInCartFun(book) != -1 ?
                <form onSubmit={editCountCart} className="join w-18 md:w-32">
                    <input className="input input-sm input-bordered join-item w-3/4" onChange={(e) => setCount(e.target.value)} type="number" min={1} max={100} placeholder="count"/>
                    <button type="submit" className="btn btn-sm px-0 md:px-1 join-item">
                        <i className="bi bi-plus text-lg"></i>
                    </button>
                </form> :
                <button onClick={()=> AddToCart(book)} className="hover:text-red-700 btn btn-sm">
                    <i className="bi bi-cart2 text-base"></i>
                </button> 
                }
                {books[bookExistsInCartFun(book)] && <span className="badge px-1 md:px-2 badge-lg text-white badge-success rounded">{books[bookExistsInCartFun(book)].cartCount}</span>}
                {bookExistsInCartFun(book) != -1 && <button onClick={()=> removeBookFromCart(book)} className="hover:text-red-700 inline-flex items-center space-x-1 btn btn-sm">
                    <i className="bi bi-cart-x text-lg"></i>
                </button>}
             </div>

            </div>
  )
}

export default BookFooter