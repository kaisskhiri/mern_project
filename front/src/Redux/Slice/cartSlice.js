// src/features/cart/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cosm/product/add', { productId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'cart/getAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8080/api/cosm/product/getAllProducts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (products, thunkAPI) => {
  
  try {
   
    const res = await axios.post(`http://localhost:8080/api/cosm/product/delete`,{product:products});
    return products
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      }).addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      }).addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((product)=>product._id !== action.payload._id)
       
        
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
  })
}});

export default cartSlice.reducer;
