import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { Alert, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/Store";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import style from "./Admin.module.css";

interface FormValues {
  categoryName: string;
  categoryImage: File | null;
  createdBy: string;
}

export default function AdminCategory() {

  const [backendError, setBackendError] = React.useState<string | null>(null);
  const token = useSelector((state: RootState) => state.token.token);
  const [CategoryData, setCategoryData] = useState<any[]>([]);
  const [formMode, setFormMode] = useState<"add" | "update">("add");
  const [categoryToUpdate, setCategoryToUpdate] = useState<FormValues | null>(null);



  // Add category
  async function AddCategory(values: FormValues) {
    console.log("Register function called");
    try {
      const formData = new FormData();
      formData.append("categoryName", values.categoryName);
      formData.append("createdBy", values.createdBy);
      if (values.categoryImage) {
        formData.append("categoryImage", values.categoryImage);
      }

      const { data } = await axios.post(
        "http://localhost:5000/category",
        //"https://e-commercenodejs.onrender.com/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === "success") {
        alert("Category created successfully");
        categoryForm.resetForm();
        setBackendError(null);
        GetAllCategories();
      } else if (data.status === "fail") {
        setBackendError(data.data.message);
      }
    } catch (error) {
      handleLoginError(error);
    }
  }

  const handleLoginError = (error:any) => {
    console.error("Error in login function:", error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      setBackendError(
        "No response received from the server. Please try again." as
          | string
          | null
      );
    } else {
      setBackendError("An error occurred. Please try again." as string | null);
    }
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .min(3, "category is too short")
      .max(20, "category is too long")
      .required("category is required"),
    createdBy: Yup.string().required("ID is required"),
    categoryImage: Yup.mixed().required("Image is required"),
  });


  const categoryForm = useFormik({
    initialValues: {
      categoryName: '',
      categoryImage: null,
      createdBy: '',
    },
    validationSchema,
    onSubmit: AddCategory,
  });
  
  

  // get all Category in table

  async function GetAllCategories() {
    try {
      let { data } = await axios.get(`http://localhost:5000/category`);
      //let { data } = await axios.get(`https://e-commercenodejs.onrender.com/category`);
      setCategoryData(data.data.allCategories);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  useEffect(() => {
    GetAllCategories();
  }, []);



  // Delete Category
  async function handleDeleteCategory(id: string) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:5000/category/${id}`,
       // `https://e-commercenodejs.onrender.com/category/${id}`,
        config
      );
      if (data.status === "success") {
        alert("Category deleted successfully");
      }

      GetAllCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category. Please try again.");
    }
  }

  // update category

  async function UpdateCategory(category: any) {
    console.log("Update function called");
    try {
      const formData = new FormData();
      formData.append("categoryName", category.categoryName);
      formData.append("createdBy", category.createdBy);
      if (category.categoryImage) {
        formData.append("categoryImage", category.categoryImage);
      }
  
      const { data } = await axios.patch(
        `http://localhost:5000/category/${category._id}`,
        //`https://e-commercenodejs.onrender.com/category/${category._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (data.status === "success") {
        alert("Category updated successfully");
        setBackendError(null);
        GetAllCategories();
        setFormMode("add");
        setCategoryToUpdate(null);
        // Update form values using setValues
        categoryForm.setValues({
          categoryName: category.categoryName,
          categoryImage: null, // Assuming you want to reset the image field
          createdBy: category.createdBy,
        });
      } else if (data.status === "fail") {
        setBackendError(data.data.message);
      }
    } catch (error) {
      handleLoginError(error);
    }
  }
  


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AddCategory</title>
      </Helmet>

      <div className="w-75 mx-auto p-5 m-5 shadow-lg">
        <h1 className="text-success">Add Category</h1>
        {backendError && <Alert variant="danger">{backendError}</Alert>}
        <Form onSubmit={categoryForm.handleSubmit}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name:</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              value={
                categoryToUpdate
                  ? categoryToUpdate.categoryName
                  : categoryForm.values.categoryName
              }
              onChange={categoryForm.handleChange}
              onBlur={categoryForm.handleBlur}
            />

            {categoryForm.errors.categoryName &&
              categoryForm.touched.categoryName && (
                <Alert variant="danger">
                  {categoryForm.errors.categoryName}
                </Alert>
              )}
          </Form.Group>

          <Form.Group controlId="categoryImage">
            <Form.Label>Category Image:</Form.Label>
            <Form.Control
              type="file"
              name="categoryImage"
              onChange={(event) => {
                const fileInput = event.currentTarget as HTMLInputElement;
                const files = fileInput.files;
                if (files && files.length > 0) {
                  categoryForm.setFieldValue("categoryImage", files[0]);
                }
              }}
              onBlur={categoryForm.handleBlur}
            />
            {categoryForm.errors.categoryImage &&
              categoryForm.touched.categoryImage && (
                <Alert variant="danger">
                  {categoryForm.errors.categoryImage}
                </Alert>
              )}
          </Form.Group>

          <Form.Group controlId="createdBy">
            <Form.Label>Admin ID:</Form.Label>
            <Form.Control
              type="text"
              name="createdBy"
              value={
                categoryToUpdate
                  ? categoryToUpdate.createdBy
                  : categoryForm.values.createdBy
              }
              onChange={categoryForm.handleChange}
              onBlur={categoryForm.handleBlur}
            />

            {categoryForm.errors.createdBy &&
              categoryForm.touched.createdBy && (
                <Alert variant="danger">{categoryForm.errors.createdBy}</Alert>
              )}
          </Form.Group>
          <Button variant="success" type="submit" className="mt-4">
            {formMode === "add" ? "Add Category" : "Update Category"}
          </Button>
        </Form>
      </div>

      <h1 className="text-center text-success m-5">
        All Category In your Store
      </h1>

      <table className="table w-75 mx-auto">
        <thead>
          <tr>
            <th className="text-success fs-3">Category ID</th>
            <th className="text-success fs-3">categoryName</th>
            <th className="text-success fs-3">categoryImage</th>
            <th className="text-success fs-3">createdBy</th>
            <th className="text-success fs-3">createdAt</th>
            <th className="text-success fs-3">Update</th>
            <th className="text-success fs-3">Delete</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {Array.isArray(CategoryData) &&
            CategoryData.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.categoryName}</td>
                <td className="w-25 ">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-25 "
                  />
                </td>
                <td>{category.createdBy}</td>
                <td>{category.createdAt}</td>

                <td>
                  {" "}
                  <i
                    className={`${style.pointer} fa-solid fa-pen-to-square text-success text-center `}
                    onClick={() => {
                      setCategoryToUpdate(category);
                      setFormMode("update");
                    }}
                  ></i>{" "}
                </td>

                <td>
                  <i
                    className={`${style.pointer} fa-solid fa-trash text-success`}
                    onClick={() => handleDeleteCategory(category._id)}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
