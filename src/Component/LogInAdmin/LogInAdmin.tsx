// Redux

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../Redux/TokenSlice';
import { useState } from 'react';
import { RootState } from '../Redux/Store';
import { Helmet } from 'react-helmet';

export default function LogInAdmin() {

  const dispatch = useDispatch();
  
  useSelector((state: RootState) => state.token.token);

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | null>(null);

  async function login(values: any) {
    try {
      const { data } = await axios.post('http://localhost:5000/admin/signIn', values);
      //const { data } = await axios.post('https://e-commercenodejs.onrender.com/admin/signIn', values);

      if (data.status === 'success') {
        navigate('/adminProduct');

        dispatch(setToken(data.data.token));
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('role', data.data.role);
      
      } else if (data.status === 'fail') {
        setBackendError(data.data.message);
      }
    } catch (error) {
      handleLoginError(error);
    }
  }

  const handleLoginError = (error: any) => {
    console.error('Error in login function:', error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      setBackendError('No response received from the server. Please try again.' as string | null);
    } else {
      setBackendError('An error occurred. Please try again.' as string | null);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>LogIn Admin</title>
            </Helmet>
      <h1 className='text-center mt-5'>logIn Admin</h1>
      <Form className="w-50 mx-auto my-5" onSubmit={loginForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="email" className="mb-1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={loginForm.values.email}
            onBlur={loginForm.handleBlur}
            onChange={loginForm.handleChange}
          />
          {loginForm.errors.email && loginForm.touched.email ? (
            <Alert variant="danger">{loginForm.errors.email}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="password" className="mb-1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginForm.values.password}
            onBlur={loginForm.handleBlur}
            onChange={loginForm.handleChange}
          />
          {loginForm.errors.password && loginForm.touched.password ? (
            <Alert variant="danger">{loginForm.errors.password}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-1">
          <Button type="submit" variant="success" className="d-block ms-auto">
            LogIn
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}