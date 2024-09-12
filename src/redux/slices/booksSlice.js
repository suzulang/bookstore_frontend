import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    pageCount: 1
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    }
  }
});

export const { setBooks, setPageCount } = booksSlice.actions;
export default booksSlice.reducer;
