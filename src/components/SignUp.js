import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate()
  const onChange = (e)=>{
      
    setCredentials({...credentials,[e.target.name]:e.target.value})
    // console.log("updating the note",note)
    
}
const {name,email,password} = credentials
const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:6000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          
        },
        body: JSON.stringify({ name,email,password })
      });
      const json = await response.json()
      
      if(json.success){
        //Save the auth token and Redirect
        localStorage.setItem('token',json.authtoken)
        navigate('/')
        props.showAlert("Account Created Successfully","success")
      }
      else{
        props.showAlert("Invalid","danger")
      }
      
}
  return (
    <>
    <div className='container mt-3'>
    <h2>Create an account to use Mynotebook</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
  <input type="text" className="form-control" id="name" name='name' value={credentials.name} placeholder="Name" onChange={onChange} minLength={3} required/>
  <label htmlFor="name">Name</label>
</div>
      <div className="form-floating mb-3">
  <input type="email" className="form-control" id="email" name='email' value={credentials.email} placeholder="name@example.com" onChange={onChange} minLength={5} required/>
  <label htmlFor="email">Email</label>
</div>
<div className="form-floating mb-3">
  <input type="password" className="form-control" id="password" name='password' value={credentials.password} placeholder="Password" onChange={onChange} minLength={5} required/>
  <label htmlFor="password">Password</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} placeholder="Confirm Password" onChange={onChange} minLength={5} required/>
  <label htmlFor="cpassword">Confirm Password</label>
</div>
<button type="submit" className="btn btn-primary my-2"  >Sign Up</button>
    </form>
    </div>
    </>
  )
}

export default SignUp
