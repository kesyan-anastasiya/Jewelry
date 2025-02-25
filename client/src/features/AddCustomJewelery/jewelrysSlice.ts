import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCollectionFetch } from './api';
import type { State } from './type';

const initialState: State = { jewelrys: [], error: undefined };

export const addCustomJewelery = createAsyncThunk('jewelry/addCustomJewelry', (formData: FormData) =>
addCollectionFetch(formData),
);

const addCustomJewelerysSlice = createSlice({
name: 'jewelrys',
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(addCustomJewelery.fulfilled, (state, action) => {
state.jewelrys.push(action.payload);
state.error = undefined;
})
.addCase(addCustomJewelery.rejected, (state, action) => {
state.error = action.error.message;
});
},
});

export default addCustomJewelerysSlice.reducer;
