import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const onChange = (e)=>{
      
        setCredentials({...credentials,[e.target.name]:e.target.value})
        // console.log("updating the note",note)
        
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:6000/api/auth/login`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
          });
          const json = await response.json()
          
          if(json.success){
            //Save the auth token and Redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in Successfully","success")
            navigate('/')
          }
          else{
            
            props.showAlert("Invalid","danger")
          }
          
    }
  return (
    <>
    <div className='container mt-2'>
    <h2>Login to continue to Mynotebook</h2>
    <form onSubmit={handleSubmit}>
      <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary my-2" onSubmit={handleSubmit} >Log in</button>
    </form>
    </div>
    </>
  )
}

export default Login
