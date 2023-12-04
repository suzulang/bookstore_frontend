import toast from "react-hot-toast";
import { cartActions, localStorageCartName } from "../slices/cartSlice";

// login user
export function addToCart(book){
    return (dispatch, getState) => {
        const isBook = bookExistsInCart(getState().cart.books, book)
        if (isBook === -1) {
            let newBook = {...book}
            newBook.cartCount = 1
            dispatch(cartActions.add(newBook));
            localStorage.setItem(localStorageCartName(), JSON.stringify(getState().cart.books))
            toast.success('Successfully added!');
        }
        else {
            let newBooks = [...getState().cart.books]
            let newBook = {...newBooks[isBook]}
            newBook.cartCount += 1
            newBooks[isBook] = newBook
            dispatch(cartActions.edit(newBooks));
            localStorage.setItem(localStorageCartName(), JSON.stringify(getState().cart.books))
            toast.success('Successfully added 1 count!')
        }
    }
}

export function editCartCount(book, count){
    return (dispatch, getState) => {
        const isBook = bookExistsInCart(getState().cart.books, book)
        if (isBook != -1) {
            if (count > 100) {
                return toast.error("Max 100")
            }
            if (count < 1) {
                return toast.error('Min 1')
            }
            let newBooks = [...getState().cart.books]
            let newBook = {...newBooks[isBook]}
            newBook.cartCount = count
            newBooks[isBook] = newBook
            dispatch(cartActions.edit(newBooks));
            localStorage.setItem(localStorageCartName(), JSON.stringify(getState().cart.books))
            toast.success('Successfully added 1 count! 11')
        }
    }
}

// logout user
export function removeFromCart(book){
    return (dispatch, getState) => {
        const index = bookExistsInCart(getState().cart.books, book)
        if (index != -1) {
            dispatch(cartActions.remove(index));
            localStorage.setItem(localStorageCartName(), JSON.stringify(getState().cart.books))
            toast.success('Successfully deleted!')
        } else toast.error('Book is not exists')
    }
}

export function bookExistsInCart(books, book) {
    return books.findIndex(e => e._id === book._id);
}