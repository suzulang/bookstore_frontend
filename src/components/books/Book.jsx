import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditBookModal from "../modals/EditBookModal";
import DeleteModal from "../modals/DeleteModal";
import UpdatePhoto from "../modals/UpdatePhoto";
import BookFooter from "./BookFooter";
import BookRating from "./BookRating";

export const discount = (price,discount)=> {
  return Math.ceil((price - (price * (discount/100)))).toFixed(2)
}

const Book = ({book}) => {
    const {user} = useSelector(state => state.auth)
    const {books} = useSelector(state => state.cart)
    
    return <div>
        <div className="group relative bg-white p-2 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-[18rem] md:max-w-lg border">
        {book.image && <img key={book._id} className="bg-slate-400 h-64 md:h-96 w-full" src={book.image.url} />}
        <div className="px-2 pt-3">
         <div>
              <h1 className="text-red-400 text-xs uppercase">{book.author}</h1>
              <h1 className="text-base text-gray-800">{book.title}</h1>
              {
                book.user && 
                  <Link to={book.user._id === (user ? user._id : '') ? '/profile' : '/profile/' + book.user._id} className="text-gray-500">{book.user.firstName}</Link>
              }
          </div>
          <div className="pt-2 space-x-1">
            {book.price > 0 ? <span className="text-lg font-bold">£{discount(book.price, book.discount)}</span> : <span className="text-success font-bold">Free</span>}
            {book.discount > 0 && book.price > 0 && <span className="text-gray-500 line-through">£{book.price}</span>}
            {book.discount > 0 && book.price > 0 && <span className="text-success float-right">%{book.discount}</span>}
          </div>
          <div className="pt-2 ">
            <BookRating rating={book.rating} review="3,482" />
            <BookFooter book={book} books={books}/>
          </div>
       </div>
       {
        user && (user.isAdmin || (book.user._id || book.user) === user._id) && 
          <div className="absolute top-3 right-3 px-1 flex flex-row-reverse text-2xl items-center bg-white rounded">
            <EditBookModal  book={book} />
            <UpdatePhoto  book={book} />
            <DeleteModal book={book} />
          </div>
       }
      { book.status === "private" &&
        <div className="absolute top-3 left-3 px-1 text-2xl bg-white rounded">
          <span className="bi bi-lock-fill text-gray-400"></span>
        </div>
      }
      </div>
    </div>
}


export default Book;