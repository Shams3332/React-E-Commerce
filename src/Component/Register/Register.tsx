import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Button, Alert, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet';


interface FormValues {
  userName: string;
  email: string;
  password: string;
  CPassword: string;
  addresses: string;
  phone: string;
  age:number
}

export default function Register() {

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | null>(null);

  async function registerUser(values: FormValues) {
    console.log('Register function called');
    try {
      const { data } = await axios.post('http://localhost:5000/users/signUp', values);
  
      if (data.status === 'success') {
        navigate('/loginUser');
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
    userName: Yup.string().min(3, 'Username is too short').max(20, 'Username is too long').required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must be strong  & start With capital letter').required('Password is required'),
    CPassword: Yup.string().oneOf([Yup.ref('password')], 'Password and Password Confirm should be the same').required(
      'Password Confirm is required'
    ),
    addresses:Yup.string().required('address is required'),
    phone: Yup.string().required('Phone is required'),
    age:Yup.number().required('age is required')
  });


  const registerForm = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      CPassword: '',
      addresses:'',
      age:0,
      phone: '',
    },
    validationSchema,
    onSubmit: registerUser, 
});


  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
      <Form className="w-50 mx-auto my-5" onSubmit={registerForm.handleSubmit}>

      {backendError && <Alert variant="danger">{backendError}</Alert>}


        <Form.Group controlId="userName" className="mb-1">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={registerForm.values.userName}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.userName && registerForm.touched.userName && (
            <Alert variant="danger">{registerForm.errors.userName}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="mb-1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.email && registerForm.touched.email && (
            <Alert variant="danger">{registerForm.errors.email}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mb-1">
  <Form.Label>Password</Form.Label>
  <FormControl
    type="password"
    name="password"
    value={registerForm.values.password}
    onBlur={registerForm.handleBlur}
    onChange={registerForm.handleChange}
  />
  {registerForm.errors.password && registerForm.touched.password ? (
    <Alert variant="danger">{registerForm.errors.password}</Alert>
  ) : null}
        </Form.Group>

        <Form.Group controlId="CPassword" className="mb-1">
          <Form.Label>Password Confirm</Form.Label>
          <FormControl
            type="password"
            name="CPassword"
            value={registerForm.values.CPassword}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.CPassword && registerForm.touched.CPassword ? (
            <Alert variant="danger">{registerForm.errors.CPassword}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="age" className="mb-1">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={registerForm.values.age}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.age && registerForm.touched.age && (
            <Alert variant="danger">{registerForm.errors.age}</Alert>
          )}
        
        </Form.Group>

        <Form.Group controlId="addresses" className="mb-1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="addresses"
            value={registerForm.values.addresses}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.addresses && registerForm.touched.addresses && (
            <Alert variant="danger">{registerForm.errors.addresses}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="phone" className="mb-1">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={registerForm.values.phone}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.phone && registerForm.touched.phone && (
            <Alert variant="danger">{registerForm.errors.phone}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-1">
        <Button type="submit" variant="success" className="d-block ms-auto">
          Register
        </Button>
      </Form.Group>
      </Form>
    </>
  );
}


