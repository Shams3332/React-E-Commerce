import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button , Card, Carousel } from 'react-bootstrap';
import categoryImg1 from '../img/category_img_01.jpg';
import categoryImg2 from '../img/category_img_02.jpg';
import categoryImg3 from '../img/category_img_03.jpg';
import feature1 from '../img/feature_prod_01.jpg';
import feature2 from '../img/feature_prod_02.jpg';
import feature3 from '../img/feature_prod_03.jpg';
import bannerImg1 from '../img/p1.png'
import bannerImg2 from '../img/p2.png'
import bannerImg3 from '../img/p3.png'
import style from './Home.module.css'
export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {/* <!-- Start Banner Hero --> */}
      <div className={`${style.bgcaursol}`}>
      <Carousel className="w-100">
        <Carousel.Item interval={2000}>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="w-50 p-4 text-center ">
              <h2 className="text-success"> Zay Shop<span className="text-success fw-light" > e-Commerce</span></h2>
              <p className=" fs-4 ">
              Excepteur sint occaecat cupidatat non proident,
              <br/>
              officia deserunt mollit anim id est laborum sunt .
              <br/>
              officia deserunt mollit anim id est laborum.
          </p>
            </div>
            <div className="w-50">
              <img
                src={bannerImg1}
                alt="slide"
                className="d-block w-75 "
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="w-50 p-4 text-center ">
            <h1 className="text-success">Proident occaecat</h1>
              <h3 className="text-success fw-light">Aliquip ex ea commodo consequat</h3>
              <p>
          You are permitted to use this Zay CSS template for your commercial websites. 
          <br/>
          You are <strong>not permitted</strong> to re-distribute the template ZIP file
                                </p>
            </div>
            <div className="w-50">
              <img
                src={bannerImg2}
                alt="slide"
                className="d-block w-75 "
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </Carousel.Item>

                <Carousel.Item interval={2000}>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="w-50 p-4 text-center ">
            <h1 className="text-success">Proident occaecat</h1>
              <h3 className="text-success fw-light">Aliquip ex ea commodo consequat</h3>
              <p>
          You are permitted to use this Zay CSS template for your commercial websites. 
          <br/>
          You are <strong>not permitted</strong> to re-distribute the template ZIP file
                                </p>
            </div>
            <div className="w-50">
              <img
                src={bannerImg3}
                alt="slide"
                className="d-block w-75 "
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </Carousel.Item>

      </Carousel>
    </div>
      {/* <!-- End Banner Hero --> */}
    


   {/* Start Categories of The Month */}
      <section className="container py-5">
      <Row className="text-center pt-3">
        <Col lg={6} className="m-auto">
          <h1 className="h1">Categories of The Month</h1>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="p-5 mt-3">
          <a href="#">
            <img src={categoryImg1} className="rounded-circle img-fluid border" alt="Watches" />
          </a>
          <h5 className="text-center mt-3 mb-3">Watches</h5>
          <p className="text-center">
            <Button variant="success">Go Shop</Button>
          </p>
        </Col>
        <Col md={4} className="p-5 mt-3">
          <a href="#">
            <img src={categoryImg2} className="rounded-circle img-fluid border" alt="Shoes" />
          </a>
          <h5 className="text-center mt-3 mb-3">Shoes</h5>
          <p className="text-center">
            <Button variant="success">Go Shop</Button>
          </p>
        </Col>
        <Col md={4} className="p-5 mt-3">
          <a href="#">
            <img src={categoryImg3} className="rounded-circle img-fluid border" alt="Accessories" />
          </a>
          <h5 className="text-center mt-3 mb-3">Accessories</h5>
          <p className="text-center">
            <Button variant="success">Go Shop</Button>
          </p>
        </Col>
      </Row>
    </section>

       {/* end Categories of The Month */}

       {/* <!-- Start Featured Product --> */}
        <section className="bg-light">
      <Container py-5>
        <Row className="text-center py-3">
          <Col lg={6} className="m-auto">
            <h1 className="h1">Featured Product</h1>
            <p>
              Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4} mb={4}>
            <Card className="h-100">
              <a href="shop-single.html">
                <Card.Img src={feature1} alt="Gym Weight" />
              </a>
              <Card.Body>
                <ul className="list-unstyled d-flex justify-content-between">
                  <li>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-muted fa fa-star"></i>
                    <i className="text-muted fa fa-star"></i>
                  </li>
                  <li className="text-muted text-right">$240.00</li>
                </ul>
                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                </p>
                <p className="text-muted">Reviews (24)</p>
              </Card.Body>
            </Card>
          </Col>
        
          <Col md={4} mb={4}>
            <Card className="h-100">
              <a href="shop-single.html">
                <Card.Img src={feature2} alt="Gym Weight" />
              </a>
              <Card.Body>
                <ul className="list-unstyled d-flex justify-content-between">
                  <li>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-muted fa fa-star"></i>
                    <i className="text-muted fa fa-star"></i>
                  </li>
                  <li className="text-muted text-right">$890.00</li>
                </ul>
                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Cloud Nike Shoes</a>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                </p>
                <p className="text-muted">Reviews (27)</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} mb={4}>
            <Card className="h-100">
              <a href="shop-single.html">
                <Card.Img src={feature3} alt="Gym Weight" />
              </a>
              <Card.Body>
                <ul className="list-unstyled d-flex justify-content-between">
                  <li>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-warning fa fa-star"></i>
                    <i className="text-muted fa fa-star"></i>
                  </li>
                  <li className="text-muted text-right">$678.00</li>
                </ul>
                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Summer Adidas Shoes</a>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                </p>
                <p className="text-muted">Reviews (87)</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
      </Container>
    </section>
       {/* <!-- end Featured Product --> */}
    </>
  );
}


