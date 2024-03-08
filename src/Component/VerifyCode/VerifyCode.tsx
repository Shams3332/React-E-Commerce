import React, { useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';



export default function VerifyCode() {

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | null>(null);

  async function resetCode(values : any) {
    try {
      const { data } = await axios.post('http://localhost:5000/users/verifyCode', values);
      //const { data } = await axios.post('https://e-commercenodejs.onrender.com/users/verifyCode', values);

      if (data.status === 'success') {
        navigate('/resetPassword');
    
      } else if (data.status === 'fail') {
        setBackendError(data.data.message);
      }
    } catch (error) {
      handleresetCodeError(error);
    }
  }

  const handleresetCodeError = (error: any) => {
    console.error('Error in resetCode function:', error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      setBackendError('No response received from the server. Please try again.' as string | null);
    } else {
      setBackendError('An error occurred. Please try again.'as string | null);
    }
  };


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
  });

  const resetCodeForm = useFormik({
    initialValues: {
      email: '',
      resetCode: '',
    },
    validationSchema,
    onSubmit: resetCode,
  });

  return (
    <>

              <Helmet>
                <meta charSet="utf-8" />
                <title>Verify Code</title>
            </Helmet>
    
    <h1 className='text-center mt-5'>Verify Code email</h1>
    <p>Please check your email for the verification code</p>
    <Form className="w-50 mx-auto my-5" onSubmit={resetCodeForm.handleSubmit}>
      {backendError && <Alert variant="danger">{backendError}</Alert>}

      <Form.Group controlId="email" className="mb-1">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={resetCodeForm.values.email}
          onBlur={resetCodeForm.handleBlur}
          onChange={resetCodeForm.handleChange}
        />
        {resetCodeForm.errors.email && resetCodeForm.touched.email ? (
          <Alert variant="danger">{resetCodeForm.errors.email}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group controlId="resetCode" className="mb-1">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          name="resetCode"
          value={resetCodeForm.values.resetCode}
          onBlur={resetCodeForm.handleBlur}
          onChange={resetCodeForm.handleChange}
        />
        {resetCodeForm.errors.resetCode && resetCodeForm.touched.resetCode ? (
          <Alert variant="danger">{resetCodeForm.errors.resetCode}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-1">
        <Button type="submit" variant="success" className="d-block ms-auto">
          Verify
        </Button>
      </Form.Group>
    </Form>

    </>

  );
}






