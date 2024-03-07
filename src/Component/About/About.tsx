import React from 'react'
import { Helmet } from 'react-helmet'
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import aboutHeroImg from '../img/home.png';
import style from './About.module.css'
import brand1 from '../img/brand_01.png'
import brand2 from '../img/brand_02.png'
import brand3 from '../img/brand_03.png'
import brand4 from '../img/brand_04.png'

export default function About() {
return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>About</title>
            </Helmet>

            {/* <!-- Start Banner --> */}
            <section className={`${style.about} py-5 `}>
      <Container>
        <Row className="align-items-center py-5">
          <Col md={8} className="text-white">
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </Col>
          <Col md={4}>
            <img src={aboutHeroImg} alt="About Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
            {/* <!-- Close Banner --> */}

            {/*  start Our services */}
            <section className="container py-5">
      <Row className="text-center pt-5 pb-3">
        <Col lg={6} className={` m-auto `}>
          <h1 className="text-success fw-light">Our Services</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            Lorem ipsum dolor sit amet.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={3} className="pb-5" >
          <div className={` h-100 py-5 services-icon-wap shadow `}>
            <div className="h1 text-success text-center">
              <i className="fa fa-truck fa-lg"></i>
            </div>
            <h2 className="h5 mt-4 text-center">Delivery Services</h2>
          </div>
        </Col>

        <Col md={6} lg={3} className="pb-5">
          <div className="h-100 py-5 services-icon-wap shadow">
            <div className="h1 text-success text-center">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h2 className="h5 mt-4 text-center">Shipping & Return</h2>
          </div>
        </Col>

        <Col md={6} lg={3} className="pb-5">
          <div className="h-100 py-5 services-icon-wap shadow">
            <div className="h1 text-success text-center">
              <i className="fa fa-percent"></i>
            </div>
            <h2 className="h5 mt-4 text-center">Promotion</h2>
          </div>
        </Col>

        <Col md={6} lg={3} className="pb-5">
          <div className="h-100 py-5 services-icon-wap shadow">
            <div className="h1 text-success text-center">
              <i className="fa fa-user"></i>
            </div>
            <h2 className="h5 mt-4 text-center">24 Hours Service</h2>
          </div>
        </Col>
      </Row>
            </section>
             {/*  end Our services */}

            {/* Start Our Brand */}

            <section className="bg-light py-5">
      <Container className="my-4">
        <Row className="text-center py-3">
          <Col lg={6} className="m-auto">
            <h1 className="text-success fw-light">Our Brands</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              Lorem ipsum dolor sit amet.
            </p>
          </Col>
          <Col lg={9} className="m-auto tempaltemo-carousel">
            <Row className="d-flex flex-row">
             
              {/* Carousel Wrapper */}
              <Col>
                <Carousel id="templatemo-slide-brand" interval={1000}  className="carousel-multi-item pt-2 pt-md-0">
                  {/* Slides */}
                  <Carousel.Item>
                    <Row>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand1} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand2} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand3} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand4} alt="Brand Logo" /></a>
                      </Col>
                    </Row>
                  </Carousel.Item>
                  {/* End First slide */}

                  {/* Second slide */}
                  <Carousel.Item>
                  <Row>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand1} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand2} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand3} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand4} alt="Brand Logo" /></a>
                      </Col>
                    </Row>
                  </Carousel.Item>
                  {/* End Second slide */}

                  {/* Third slide */}
                  <Carousel.Item>
                  <Row>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand1} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand2} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand3} alt="Brand Logo" /></a>
                      </Col>
                      <Col md={3} className="p-md-5">
                        <a href="#"><img className="img-fluid brand-img" src={brand4} alt="Brand Logo" /></a>
                      </Col>
                    </Row>
                  </Carousel.Item>
                  {/* End Third slide */}
                </Carousel>
              </Col>
              {/* End Carousel Wrapper */}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>

            {/* End Our Brand */}
    
    </>
)
}
