import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/api/cosm/products');
    return response.data;
  }
);

export const addProduct = createAsyncThunk('products/addProduct',
async(products,ThunkAPI)=>{
    try{
        const res= await axios.post('http://localhost:8080/api/cosm/product/add',products)
       
        return res.data 

        }catch(error){
            ThunkAPI.rejectWithValue(error.res.data)
        }
    

})




const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      
        .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
        .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      
      
}});

export default productSlice.reducer;
// state.products = state.products.filter(  (product) => product._id !== action.payload.productId  );