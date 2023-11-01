import React,{useState} from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import {auth} from './firebase'
import {  toast } from 'react-toastify';
import { NavLink } from "react-router-dom";

export default function (){
    const [registerEmail,setRegisterEmail]=useState('')
    const [registerPassword,setRegisterPassword]=useState("");
    const register= async()=>{
        try{
            if (!registerEmail || !registerPassword) {
                toast.error('All fields are required');
                return;
              }
        
              if (registerPassword.length < 6) {
                toast.error('Password should be at least 6 characters long');
                return;
              }
        const user= await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        )
        console.log(user)
        toast.success("Successfully register please login")
        setRegisterEmail('');
      setRegisterPassword('');
        }catch(error){
            toast.error("Email already exist please login")
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
     <h2 className="text-center">Register</h2>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setRegisterEmail(e.target.value)}} value={registerEmail} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e)=>{setRegisterPassword(e.target.value)}} value={registerPassword}/>
    </Form.Group>

   

    <Button variant="primary" onClick={register} className="d-block">
      Register
    </Button>
    <div className="mt-3 text-center">
      Already a user login here <NavLink to="/login">Login</NavLink>
    </div>
  </Form>
</div>

  );
}

