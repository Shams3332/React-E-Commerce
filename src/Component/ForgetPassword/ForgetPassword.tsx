import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

export default function ForgetPassword() {

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | null>(null);

  async function ForgetPassword(values : any) {
    try {
      const { data } = await axios.post('http://localhost:5000/users/forgetPassword', values);
      //const { data } = await axios.post('https://e-commercenodejs.onrender.com/users/forgetPassword', values);

      if (data.status === 'success') {
        navigate('/verifyCode');

      } else if (data.status === 'fail') {
        setBackendError(data.data.message);
      }
    } catch (error) {
      handleForgetPasswordError(error);
    }
  }

  const handleForgetPasswordError = (error: any) => {
    console.error('Error in ForgetPassword function:', error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      setBackendError('No response received from the server. Please try again.' as string | null);
    } else {
      setBackendError('An error occurred. Please try again.'as string | null);
    }
  };
;

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),

  });

  const forgetForm= useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: ForgetPassword,
  });

  return (
  <>
  <h1 className='text-center mt-5'>Forget Password </h1>
    <Form className="w-50 mx-auto my-5" onSubmit={forgetForm.handleSubmit}>
      {backendError && <Alert variant="danger">{backendError}</Alert>}

      <Form.Group controlId="email" className="mb-1">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={forgetForm.values.email}
          onBlur={forgetForm.handleBlur}
          onChange={forgetForm.handleChange}
        />
        {forgetForm.errors.email && forgetForm.touched.email ? (
          <Alert variant="danger">{forgetForm.errors.email}</Alert>
        ) : null}
      </Form.Group>


    <Form.Group className="mb-1">
        <Button type="submit" variant="success" className="d-block ms-auto">
    Send email
        </Button>
    </Form.Group>
    </Form>
    </>
  );
}



