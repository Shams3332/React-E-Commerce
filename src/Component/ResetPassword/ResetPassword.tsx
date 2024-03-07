import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';


export default function ResetPassword() {

    const navigate = useNavigate();
    const [backendError, setBackendError] = useState<string | null>(null);

    async function reset(values: any) {
        try {
            const { data } = await axios.post('http://localhost:5000/users/resetPassword', values);
            console.log('data', data);

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
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must be strong').required('Password is required'),
    });

    const resetForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: reset,
    });

    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>

            <h1 className='text-center mt-5'>Reset Password</h1>
            <Form className="w-50 mx-auto my-5" onSubmit={resetForm.handleSubmit}>
                {backendError && <Alert variant="danger">{backendError}</Alert>}

                <Form.Group controlId="email" className="mb-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={resetForm.values.email}
                        onBlur={resetForm.handleBlur}
                        onChange={resetForm.handleChange}
                    />
                    {resetForm.errors.email && resetForm.touched.email ? (
                        <Alert variant="danger">{resetForm.errors.email}</Alert>
                    ) : null}
                </Form.Group>

                <Form.Group controlId="password" className="mb-1">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={resetForm.values.password}
                        onBlur={resetForm.handleBlur}
                        onChange={resetForm.handleChange}
                    />
                    {resetForm.errors.password && resetForm.touched.password ? (
                        <Alert variant="danger">{resetForm.errors.password}</Alert>
                    ) : null}
                </Form.Group>


                <Form.Group className="mb-1">
                    <Button type="submit" variant="info" className="d-block ms-auto">
                        Reset Password
                    </Button>
                </Form.Group>
            </Form>

        </>

    );
}
