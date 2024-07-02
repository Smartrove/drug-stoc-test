import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getAllBooks: (state, { payload }) => {
      console.log("book payload", payload);

      state.book = payload;
    },
  },
});

export const { getAllBooks } = bookSlice.actions;

export default bookSlice.reducer;
