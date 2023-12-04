import { createSlice } from "@reduxjs/toolkit";

export const localStorageCartName = () => {
    // console.log(JSON.parse(localStorage.getItem('user')));
    if (JSON.parse(localStorage.getItem('user'))) {
        return `cart-${JSON.parse(localStorage.getItem('user'))._id}`;
    }
    else return "cart"
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        books: JSON.parse(localStorage.getItem(localStorageCartName())) || []
    },
    reducers: {
        add(state, action){
            state.books.push(action.payload);
        },
        edit(state, action){
            state.books = action.payload;
        },
        remove(state, action){
            state.books.splice(action.payload, 1);
        }
    }
})

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;
export {cartReducer, cartActions};