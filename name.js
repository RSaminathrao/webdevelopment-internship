import React from 'react';
import './external.css'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Name(){

        const navigate = useNavigate();
        return(
        <div class="container">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google Logo"/>
      <h1>Create your Google Account</h1>
      <input type="text" placeholder="First name" />
      <input type="text" placeholder="Last name" />
      
      <p>You can use letters,numbers & periods</p>
      <button onClick={() => navigate('/register')}>Next</button>
  </div>
            );
    }
    
export default Name;