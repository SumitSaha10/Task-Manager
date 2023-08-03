import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
const SignUp = (props) => {
  const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  let navigate = useNavigate()

  const onSubmit = async ({ name, email, password }) => {
    // e.preventDefault();
    const response = await fetch(`http://localhost:6000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',

      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()

    if (json.success) {
      //Save the auth token and Redirect
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid", "danger")
    }

  }

  const onSubmitDemo = (data) => {
    onSubmit(data)
  }

  return (
    <>
      <div className='container mt-3'>
        <h2>Create an account to use Mynotebook</h2>
        <form onSubmit={handleSubmit(onSubmitDemo)}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="name" name='name' placeholder="Name" {...register("name")} />
            <p className='text-danger'>{errors.name ? "Name must be atleast 3 characters" : ""}</p>
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" {...register("email")} />
            <p className='text-danger'>{errors.email ? "Please enter a valid email" : ""}</p>
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" name='password' placeholder="Password" {...register("password")} />
            <p className='text-danger'>{errors.password ? "Password must be atleast 5 characters" : ""}</p>
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary my-2"  >Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default SignUp
