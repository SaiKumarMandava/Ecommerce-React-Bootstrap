import React, { useEffect, useState } from "react";
import { useCart } from './cart'
import {  toast } from 'react-toastify';
import { useParams,NavLink,useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const nav=useNavigate()

  const handleAddToCart = () => {
    addToCart(product);
    nav('/cart1')
    toast.success("Item Added to Cart")
  };
  

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setLoading(false); // Set loading to false when data is loaded
        } else {
          console.error("Error fetching product:", response.status);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId && productId !== "") {
      fetchProductDetail(productId);
    }
  }, [productId]);
  const Success=()=>{
    toast.success("Product Purchased Successfully Happy Shopping......!")
    // nav('/productlist')
    // toast.success("Happy Shopping")
    
  }

  return (
    <div className="container">
      {Object.keys(product).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img className="img-fluid" src={product.image} alt={product.title} />
          </div>
          <div className="col-md-6">
            <h1>{product.title}</h1>
            <h2>${product.price}</h2>
            <h3>{product.category}</h3>
            <p>{product.description}</p>
           <div className="d-flex justify-content-between"> 
           <button className="btn btn-primary w-25" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <br/>
          
           <br/>
           <button className="btn btn-success w-25" onClick={Success}>
              Buy this Product
            </button>
           </div>
           <br/>
           <NavLink to='/productlist'>
           <button className="btn btn-dark w-25">
              Back to Products
            </button>
           </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
