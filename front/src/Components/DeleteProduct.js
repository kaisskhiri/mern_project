import { useDispatch } from 'react-redux';
import { deleteProduct } from '../Redux/Slice/cartSlice';

function DeleteProduct({product}) {
  const dispatch = useDispatch();

  const handleDeleteProduct=() => {
    dispatch(deleteProduct(product))
    
  }
  return (
    <button onClick={handleDeleteProduct}>Delete cart</button>
  );
}

export default DeleteProduct;
