import React from "react";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom" ;
import './external.css';

function Register(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const registerUser = async(e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/register',{email,password});
        if(res.data.status === "ok"){
            alert("Register Sucessful!");
        }
        else{
            alert(res.data.error);
        }
        navigate('/');
    } 
    return(
        <div className = "container">
            <form onSubmit = { registerUser }>
                
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google Logo"/>
                <h1>Create your Username And Password</h1>
                <input type = "email"   placeholder="User name" onChange={(e)=>setEmail(e.target.value)}/>
                <input type = "password"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <p>Use 8 or more characters</p>
                <button type="submit" className="custom-button">Register</button>

            </form>
        </div>

        
    );
}
export default Register;