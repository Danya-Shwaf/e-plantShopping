/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import './ProductList.jsx';

const CartItem = ({ onContinueShopping ,setAddedToCart }) => {
  /**/const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.quantity;
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };


  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    const price = parseFloat(item.cost.replace("$", ""));
    const newTotal = price * updatedQuantity;
    dispatch(updateQuantity({...item, quantity: updatedQuantity,cost : newTotal}));
  };

  const handleDecrement = (item) => {
    const updatedQuantity = item.quantity - 1;
    if(updatedQuantity == 0 ) {
      dispatch(
        removeItem(item)
      );
    }else {
      const price = parseFloat(item.cost.replace("$", ""));
      const newTotal = price * updatedQuantity;
      dispatch(
        updateQuantity({ ...item, quantity: updatedQuantity, cost: newTotal })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    setAddedToCart(prevPlant => ({
      ...prevPlant,
      [item.name]: false,     }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    const price = parseFloat(item.cost.replace("$", ""));
    totalCost = price * item.quantity;
    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


