import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { cartContext } from '../context/cartContext';
import FormatCurrency from '../../utilites/FormatCurrency';

interface Product {
    product: any;
    _id: string;
    productImage: string;
    productName: string;
    productPrice: number;
    count: number;
}

interface CartDetails {
    _id: string;
    cart: Product[];
    orderBy: string;
    totalPrice: number;
    priceAfterDiscount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Cart() {
    let { getLoggedUserCart, removeItem, updateProductCount, setnumOfCartItems } =
        useContext(cartContext);
    const [cartDetails, setcartDetails] = useState<CartDetails | null>(null);

    async function getCart() {
        try {
            let response = await getLoggedUserCart();
            if (response?.data?.status === 'success') {
                setcartDetails(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }


    async function deleteItem(productId: string) {
        try {
            let response = await removeItem(productId);
            setcartDetails(response.data.data);
            setnumOfCartItems(response.data.numOfCartItems);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    async function updateCartQuantity(productId: string, count: number) {
        try {
            let response = await updateProductCount(productId, count);
            if (response?.data?.status === 'success') {
                setcartDetails((prevCartDetails) => {
                    if (!prevCartDetails) return null;

                    const updatedCart = prevCartDetails.cart.map((product) => {
                        if (product.product._id === productId) {
                            return {
                                ...product,
                                count: count,
                            };
                        }
                        return product;
                    });

                    return {
                        ...prevCartDetails,
                        cart: updatedCart,
                    };
                });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    useEffect(() => {
        getCart();
    }, [updateCartQuantity]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
            <div className="container">
                <div className="py-5 cart">
                    <div className="bg-main-light mt-4">
                        <h2 className=' text-success mb-5'>Shop Cart:</h2>
                        {cartDetails && (
                            <>
                                {cartDetails.cart.map((product) => (
                                    <div
                                        key={product._id}
                                        className="row py-2 border-bottom align-items-center"
                                    >
                                        <div className="col-md-1">
                                            <img
                                                src={product.product.productImage}
                                                className="w-100"
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-md-11 d-flex justify-content-between">
                                            <div>
                                                <h6>ProductName: {product.product.productName}</h6>
                                                <h6 className="text-dark">
                                                    Price:{FormatCurrency(product.product.productPrice)}
                                                </h6>
                                                <button
                                                    onClick={() => deleteItem(product._id)}
                                                    className="p-0 m-0 btn text-danger"
                                                >
                                                    <i className="fa-regular fa-trash-can text-danger"></i>
                                                    Remove
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            product._id,
                                                            product.count + 1
                                                        )
                                                    }
                                                    className="btn border-main btn-sm"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-2">{product.count}</span>
                                                <button
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            product._id,
                                                            product.count - 1
                                                        )
                                                    }
                                                    className="btn border-main btn-sm"
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <h4 className="text-success mt-3">
                                    Total Price: {FormatCurrency(cartDetails.totalPrice)}
                                </h4>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}