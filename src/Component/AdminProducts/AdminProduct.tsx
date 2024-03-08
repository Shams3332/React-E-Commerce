import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/Store';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import style from '../AdminCategory/Admin.module.css'

interface FormValues {
  productName: string;
  productPrice:number;
  discount:number;
  productImage: File | null;
  createdBy: string;
  category:string;
}

export default function AdminProduct() {

  const [backendError, setBackendError] = React.useState<string | null>(null);
  const token = useSelector((state: RootState) => state.token.token);

   // Add product
async function AddProduct(values: FormValues) {

  console.log('AddProduct function called');
    try {
      const formData = new FormData();
      formData.append('productName', values.productName);
      formData.append('createdBy', values.createdBy);
      formData.append('productPrice', values.productPrice.toString());  
      formData.append('discount', values.discount.toString());  
      formData.append('category', values.category);
      
      if (values.productImage) {
        formData.append('productImage', values.productImage);
      }

      const { data } = await axios.post(
      'http://localhost:5000/product',
     // 'https://e-commercenodejs.onrender.com/product',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log('Response from server:', data);

      if (data.status === 'success') {
        alert('product created successfully');
        productForm.resetForm();
        setBackendError(null);
        GetAllProduct();
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
    productName: Yup.string().min(3, 'Product is too short').max(20, 'Product is too long').required('Product is required'),
    createdBy: Yup.string().required('ID is required'),
    productImage: Yup.mixed().required('Image is required'),
    category: Yup.string().required('Category is required'),
    productPrice: Yup.number().required('Price is required'),
  });

  const productForm = useFormik({
    initialValues: {
      productName: '',
      productImage: null,
      createdBy: '',
      productPrice: 0,
      discount: 0,
      category: '', 
    },
    validationSchema,
    onSubmit: AddProduct,
  });

  // get all product in table

  const [ProductData, setProductData] = useState<any[]>([]);
  async function  GetAllProduct() {
      try {

        let { data } = await axios.get(`http://localhost:5000/product?limit=30&page=1`);
        //let { data } = await axios.get(`https://e-commercenodejs.onrender.com?limit=30&page=1`);
        setProductData(data.data.allProduct);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }

  }

  useEffect(() => {
    GetAllProduct();
  }, []);

// Delete product
async function  handleDeleteProduct(id: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`http://localhost:5000/product/${id}`, config);
   // const { data } = await axios.delete(`https://e-commercenodejs.onrender.com/product/${id}`, config);
    if (data.status === 'success') {
      alert('Product deleted successfully');
    }

    GetAllProduct();
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product. Please try again.');
  }
}

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Addproduct</title>
      </Helmet>

<div className="w-75 mx-auto p-5 m-5 shadow-lg">
        <h1 className="text-success">Add Product</h1>
        {backendError && <Alert variant="danger">{backendError}</Alert>}
    <Form onSubmit={productForm.handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>product Name:</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={productForm.values.productName}
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
            />
              {productForm.errors.productName && productForm.touched.productName && (
                <Alert variant="danger">{productForm.errors.productName}</Alert>
              )}
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label>product Price:</Form.Label>
            <Form.Control
              type="number"
              name="productPrice"
              value={productForm.values.productPrice}
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
            />
              {productForm.errors.productPrice && productForm.touched.productPrice && (
                <Alert variant="danger">{productForm.errors.productPrice}</Alert>
              )}
          </Form.Group>

          <Form.Group controlId="discount">
            <Form.Label>Discount:</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={productForm.values.discount}
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
            />
              {productForm.errors.discount && productForm.touched.discount && (
                <Alert variant="danger">{productForm.errors.discount}</Alert>
              )}
          </Form.Group>

          <Form.Group controlId="productImage">
            <Form.Label>product Image:</Form.Label>
            <Form.Control
              type="file"
              name="productImage"
              onChange={(event) => {
                const fileInput = event.currentTarget as HTMLInputElement;
                const files = fileInput.files;
                if (files && files.length > 0) {
                  productForm.setFieldValue('productImage', files[0]);
                }
              }}
              onBlur={productForm.handleBlur}
            />
              {productForm.errors.productImage && productForm.touched.productImage && (
                <Alert variant="danger">{productForm.errors.productImage}</Alert>
              )}
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category ID:</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={productForm.values.category}
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
            />

              {productForm.errors.category && productForm.touched.category && (
                <Alert variant="danger">{productForm.errors.category}</Alert>
              )}
          </Form.Group>

          <Form.Group controlId="createdBy">
            <Form.Label>Admin ID:</Form.Label>
            <Form.Control
              type="text"
              name="createdBy"
              value={productForm.values.createdBy}
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
            />

              {productForm.errors.createdBy && productForm.touched.createdBy && (
                <Alert variant="danger">{productForm.errors.createdBy}</Alert>
              )}
          </Form.Group>

          <Button variant="success" type="submit" className="mt-4">
          Addproduct
        </Button>

        </Form>
      </div>

<h1 className='text-center text-success m-5'>All product In your Store</h1>

<table className="table w-75 mx-auto">
  <thead>
    <tr>
      <th className="text-success fs-3"> ID</th>
      <th className="text-success fs-3">Name</th>
      <th className="text-success fs-3">Price</th>
      <th className="text-success fs-3">Discount</th>
      <th className="text-success fs-3">Category</th>
      <th className="text-success fs-3">Image</th>
      <th className="text-success fs-3">Update</th>
      <th className="text-success fs-3">Delete</th>
    </tr>
  </thead>

  <tbody className='text-center'>

  {Array.isArray(ProductData) &&
    ProductData.map((product) => (
    <tr key={product._id}>
    <td>{product._id}</td>
    <td>{product.productName}</td>
    <td>{product.productPrice}</td>
    <td>{product.discount}</td>
    <td>{product.category}</td>
    <td  className='w-25 '>
  <img src={product.productImage} alt={product.productName} className='w-25 ' />
  </td>


<td>
  <i className={`${style.pointer} fa-solid fa-pen-to-square  text-success text-center `}></i>
</td>

<td>
  <i className={`${style.pointer} fa-solid fa-trash text-success`}
    onClick={() =>  handleDeleteProduct(product._id)}></i>
</td>

  </tr>
))}
  </tbody>
</table>

    </>
  );
}
