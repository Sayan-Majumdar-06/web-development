import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  snippits: localStorage.getItem("snippits") ? JSON.parse(localStorage.getItem("snippits")) : []
}

export const snippitsSlice = createSlice({
  name: 'snippit',
  initialState,
  reducers: {
    addToSnippits: (state, action) => {
        const snippit = action.payload;
        state.snippits.push(snippit);
        localStorage.setItem("snippits", JSON.stringify(state.snippits));

        toast.success('Snippit created successfully');
    },
    updateToSnippits: (state, action) => {
        const snippit = action.payload;
        const index = state.snippits.findIndex((item) => item._id === snippit._id);

        if(index >= 0) {
            state.snippits[index] = snippit;
            localStorage.setItem("snippits", JSON.stringify(state.snippits));

            toast.success('Snippit updated');
        }

        else {
            toast.error('Couldn\'t find Snippit');
        }
    },
    resetAllSnippits: (state, action) => {
        state.snippits = [];
        localStorage.removeItem("snippits");

        toast.success('All Snippits removed');
    },

    removeFromSnippits: (state, action) => {
        const id = action.payload;
        const index = state.snippits.findIndex((item) => item._id === id);

        if(index >= 0) {
            state.snippits.splice(index, 1);
            localStorage.setItem("snippits", JSON.stringify(state.snippits));

            toast.success('Snippit removed');
        }

        else {
            toast.error('Couldn\'t find Snippit');
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToSnippits, updateToSnippits, resetAllSnippits, removeFromSnippits } = snippitsSlice.actions

export default snippitsSlice.reducer