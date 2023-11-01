



import React, { useState } from 'react';
import { useCart } from './cart';
import {  toast } from 'react-toastify';
import {NavLink,useNavigate} from 'react-router-dom'

const Cart = () => {
  const { cart } = useCart(); // Assuming useCart returns the cart data correctly.
  const [updatedCart, setUpdatedCart] = useState(cart); // Create a state for the cart.

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item !== product);
    alert("Do you want remove this item from cart")
    setUpdatedCart(updatedCart);
    toast.success("Item Removed Successfully")
  };

  return (
    <div className="container">
       
      <h1 className="my-4">Cart</h1>
     
    <div className='w-25'>
    <NavLink to='/productlist'>
           <button className="btn btn-dark w-50">
              Back to Products
            </button>
           </NavLink>
    </div>
           <br/>
      {updatedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {updatedCart.map((product, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card mb-4">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <button className="btn btn-danger" onClick={() => removeFromCart(product)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

