import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Iterar sobre el array usando reduce para sumar el totalPrice de cada ítem
    const totalAmount = cart.reduce((cumulativeTotal, item) => {
        // Obtenemos el costo unitario y lo multiplicamos por la cantidad
        const unitCost = parseFloat(String(item.cost).replace('$', '')) || 0;
        return cumulativeTotal + (unitCost * item.quantity); 
    }, 0);

    return totalAmount.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    // Llama a la función pasada desde el padre (para cambiar la vista a la lista de productos)
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };



  const handleIncrement = (item) => {
    // Dispatch updateQuantity para aumentar la cantidad en 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // Si la cantidad es mayor que 1, decrementa.
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Si la cantidad es 1 y se decrementa, llama a removeItem (Task 3: eliminar el ítem)
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Asumimos que item.cost es el costo unitario (como número) y item.quantity es la cantidad.
    // Aunque en el Reducer ya actualizamos totalPrice, lo recalculamos para asegurar consistencia.
    
    // Asegurarse de que el costo unitario sea un número
    const unitCost = parseFloat(String(item.cost).replace('$', '')) || 0;
    
    // Devolvemos el total del ítem con dos decimales
    return (unitCost * item.quantity).toFixed(2);
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


