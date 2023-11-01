import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase';
import {  toast } from 'react-toastify';
import { NavLink,useNavigate } from 'react-router-dom';

export default function () {
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    
    const nav=useNavigate()

    const login= async()=>{
  
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        const user = userCredential.user;
        console.log(user);
        toast.success('Login Success.Happy Shopping...!');
        nav('/productlist');
      } catch (error) {
        console.log(error)
        
            toast.error("Inavlid Email or Password");
      
      }

    }
  return (
    <div
  style={{
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Set your desired background color
  }}
>
  <Form
    style={{
      width: "400px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px", 
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
    }}
  >
     <h2 className="text-center">Login</h2>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setLoginEmail(e.target.value)}} value={loginEmail}  />
      <Form.Text className="text-muted">
     
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" required onChange={(e)=>{setLoginPassword(e.target.value)}} value={loginPassword}/>
    </Form.Group>

   

    <Button variant="primary" onClick={login} className="d-block">
      Login
    </Button>
    <div className="mt-3 text-center">
      Don't have account register here <a href="/register">Register</a>
    </div>
  </Form>
</div>
  )
}
