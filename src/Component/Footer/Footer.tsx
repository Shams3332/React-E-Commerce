import React from 'react'
import { Container, Row, Col, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import style from  './Footer.module.css';

export default function Footer() {
return (
        <>
            <footer className={`${style.footer_backColor} pt-5 mt-5 `} >
                <Container>
                    <Row>
                        <Col md={4} pt={5}>
                            <h2 className="h2 text-success border-bottom pb-3 border-light logo">Zay Shop</h2>
                            <ListGroup variant="flush" className="text-light footer-link-list">
                                <ListGroup.Item className={`${style.footer_item}`}>

                                    123 Consectetur at ligula 10660
                                </ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>

                                    010-020-0340
                                </ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>

                                    info@company.com
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4} pt={5}>
                            <h2 className={`${style.footer_color}  border-bottom pb-3 `}>Products</h2>
                            <ListGroup className="text-light footer-link-list" >
                                <ListGroup.Item className={`${style.footer_item}`}>Luxury</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Sport Wear</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Men's Shoes</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Women's Shoes</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Popular Dress</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Sport Shoes</ListGroup.Item>

                            </ListGroup>
                        </Col>

                        <Col md={4} pt={5}>
                            <h2 className={`${style.footer_color} border-bottom pb-3 `}>Further Info</h2>
                            <ListGroup variant="flush" className="text-light footer-link-list">
                                <ListGroup.Item className={`${style.footer_item}`}>Home</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>About Us</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Shop Locations</ListGroup.Item>
                                <ListGroup.Item className={`${style.footer_item}`}>Contact</ListGroup.Item>

                            </ListGroup>
                        </Col>
                    </Row>

                    <Row className="text-light mb-4">
                        <Col className="mb-3">
                            <div className="w-75 my-3 border-top border-light"></div>
                            <ul className={`list-inline footer-icons ${style.iconList}`}>
                                <li className={`${style.icons} list-inline-item border border-light rounded-circle d-flex justify-content-center align-items-center`}>
                                    <i className="fa-brands fa-facebook-f" />
                                </li>
                                <li className={`${style.icons} list-inline-item border border-light rounded-circle d-flex justify-content-center align-items-center`}>
                                    <a className="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li className={`${style.icons} list-inline-item border border-light rounded-circle d-flex justify-content-center align-items-center`}>
                                    <a className="text-light text-decoration-none" target="_blank" href="https://twitter.com/">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li className={`${style.icons} list-inline-item border border-light rounded-circle d-flex justify-content-center align-items-center`}>
                                    <a className="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <InputGroup className="mb-2 mt-5  justify-content-end">
                                <FormControl type="text" className="form-control border-light text-white bg-transparent" placeholder="Email address" />
                                <InputGroup.Text className="btn btn-success">Subscribe</InputGroup.Text>
                            </InputGroup>
                        </Col>


                    </Row>
                </Container>

                <div className="w-100  py-3">
                    <Container>
                        <Row className="pt-2">
                            <Col>
                                <p className={`${style.footer_color} text-left`}>
                                    Copyright &copy; 2021 Company Name | Designed by Shams
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    )
}
