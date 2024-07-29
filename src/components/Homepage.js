import React, { useState } from 'react';

import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const HomePage = () => {

const [action,setAction] = useState("Sign Up");

    return (
     <div className='container fontt'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
      <div className='input'>
        <img src={email_icon} alt=''/>
        <input type='email' placeholder='Email Id' />
      </div>
      <div className='input'>
        <img src={password_icon} alt=''/>
        <input type='password' placeholder='Password'/>
      </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot password? <span>Click Here!</span> </div>}
      <div className='submit-container'>
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
      </div>
     </div>
    );
};
  
export default HomePage;