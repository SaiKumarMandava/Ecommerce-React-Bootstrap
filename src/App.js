import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Button  from 'react-bootstrap/Button';
import Product from './components/productlist'
import {Routes,Route} from "react-router-dom";
import ProductDetails from './components/ProductDetails'
import { CartProvider } from './components/cart'
import Cart from './components/cart1'
import Register from './components/register';
import Login from './components/login'

function App() {
  return (
    <div >
    
    <CartProvider>
    <Routes>
    <Route exact path='/' element={<Register/>}/>
      <Route path='/productlist' element={<Product/>}/>
      <Route path="/product/:productId" element={<ProductDetails/>} />
      <Route path="/cart1" element={<Cart/>} />
      <Route path='/productlist' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     
    </Routes>
    </CartProvider>
    {/* <Product/> */}
    </div>
  );
}

export default App;
