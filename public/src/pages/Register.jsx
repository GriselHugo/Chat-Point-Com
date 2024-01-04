import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/api';

import Logo from '../assets/logo.svg';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('chat-app-user');
    if (user) {
      navigate('/');
    }
  });

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if ( !username || !email || !password || !confirmPassword ) {
      toast.error('Please fill in all fields', toastOptions);
      return false;
    }

    if (username.length < 3) {
      toast.error('Username must be at least 3 characters long', toastOptions);
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long', toastOptions);
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords and confirm password must be the same', toastOptions);
      return false;
    }

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(values);
      console.log('in validation:', registerRoute)
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      console.log(data);

      if (data.status === false) {
        console.log('in if');
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/setAvatar');
      }
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h1>Chat Point Com</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name='username'
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content:center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
    }


  }
  button {
    background-color: #997af0;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: #fff;
    text-transform: uppercase;
    text-align: center;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
