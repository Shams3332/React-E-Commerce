/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import FormatCurrency from './../../utilites/FormatCurrency';
import { cartContext } from "../context/cartContext";

export default function Shop() {
    const [productData, setProductData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
  let { addToCart, setNumOfCartItems } = useContext(cartContext);

  async function addProductToCart(productId: string) {
    try {
      let response = await addToCart([{ product: productId }]);
      if (response?.data?.status === "success") {
        setNumOfCartItems(response.data.numOfCartItems);
      }
      console.log(response);
    } catch (error) {
      console.error("Add Product to Cart Error:", error);
    }
  }
    

//   Get all Products
async function GetAllProducts(page: number) {
    try {
    const { data } = await axios.get(
        `http://localhost:5000/product?limit=9&page=${page}`
    );
    setProductData(data.data.allProduct);
    } catch (error) {
    console.error("Error fetching products:", error);
    }
}
useEffect(() => {
    GetAllProducts(currentPage);
}, [currentPage]);

const handlePageClick = (page: number) => {
    setCurrentPage(page);
};


 // get all Category 
const [CategoryData, setCategoryData] = useState<any[]>([]);

async function GetAllCategories() {
        try {
        let { data } = await axios.get(`http://localhost:5000/category`);
        setCategoryData(data.data.allCategories);
        } catch (error) {
        console.error("Error fetching user profile:", error);
        }
    }

useEffect(() => {
        GetAllCategories();
}, []);


// get only product in this category

const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

async function GetProductInCategory(categoryId: string) {
    try {
      let { data } = await axios.get(`http://localhost:5000/product/allProductsInCategory/${categoryId}`);
      setProductData(data.data.allCategoryProducts); 
    } catch (error) {
      console.error("Error fetching products in category:", error);
    }
  }
  
  useEffect(() => {
    if (selectedCategoryId) {
      GetProductInCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);


const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    GetProductInCategory(categoryId);
};

//  Add To Cart



return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Shop</title>
    </Helmet>


    <div className="container">
        <div className="row mt-5">
        <div className="col-md-3">
            <div className="bg-info text-center">
                <h1>Catagories</h1>
                <button onClick={()=> GetAllProducts(currentPage)}>All Product</button>
                {Array.isArray(CategoryData) &&
                    CategoryData.map((category) => (
                        <button 
                        key={category._id}
                        className="d-block  m-auto my-4 "
                        onClick={() => handleCategoryClick(category._id)}
                        >
                        {category.categoryName}
                        </button>
                    ))
                    }
            
            </div>
        </div>

        <div className="col-md-9">
            <div className="row">
              {Array.isArray(productData) &&
                productData.map((product) => (
                  <div
                    key={product._id}
                    className="col-md-4 mb-3 d-flex justify-content-between"
                  >
                    <Card style={{ width: "100%" }} className="shadow-lg">
                      <Card.Img
                        variant="top"
                        src={product.productImage}
                        className="h-100"
                      />
                      <Card.Body>
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>
                          <p> Price :{ FormatCurrency (product.productPrice)} </p>
                          {product.discount !== 0 ? (
                            <>
                              <p className="text-danger">
                                Discount: {product.discount}%
                                <br />
                                <span className="text-dark">
                                  Price After Discount :
                                  {FormatCurrency (product.priceAfterDiscount)}
                                </span>
                              </p>

                            </>
                          ) : (
                            <>
                              <p className="text-danger">
                                Discount:No discount
                              </p>
                            </>
                          )}
                        </Card.Text>
                              <Button
            variant="success"
            onClick={() => addProductToCart(product._id)}
          >
            Add to Cart{" "}
            <i className="fa-solid fa-cart-shopping text-white"></i>
          </Button>


                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          <div className="row mt-5">
            <ul className="pagination pagination-lg justify-content-end">
              {[1, 2, 3].map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active disabled" : ""
                  }`}
                >
                
                  <a
                    className={`page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 ${
                      currentPage === page
                        ? "bg-success text-white"
                        : "text-dark bg-success text-white"
                    }`}
                    href="#"
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}