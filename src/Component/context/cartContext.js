import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    const token = localStorage.getItem("token");


    async function addToCart(products) {
        try {
            console.log("Request Payload:", products); // Add this line for debugging
            const response = await axios.post(
                `http://localhost:5000/cart`,
                { cart: products },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(products);
            return response;
        } catch (error) {
            console.error("Add to Cart Error:", error);
            return error;
        }
    }
    

    async function getLoggedUserCart(productId) {
        try {
            const response = await axios
                .get(`http://localhost:5000/cart`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response;
        } catch (error) {
            return error;
        }
    }

    async function removeItem(productId) {
        try {
            const response = await axios
                .delete(
                    `http://localhost:5000/cart/${productId}`,

                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            return response;
        } catch (error) {
            return error;
        }
    }

    async function updateProductCount(productId, count) {
        try {
            const response = await axios
                .put(
                    `http://localhost:5000/cart/${productId}`,
                    {
                        count: count,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            return response;
        } catch (error) {
            return error;
        }
    }

    return (
        <cartContext.Provider
            value={{
                addToCart,
                getLoggedUserCart,
                removeItem,
                updateProductCount,
                cartId,
                numOfCartItems,
                setNumOfCartItems,
            }}
        >
            {props.children}
        </cartContext.Provider>
    );
}

    // async function getCart() {
    //     try {
    //     let response = await getLoggedUserCart();
    //     if (response?.data?.status === "success") {
    //         // you already have a cart
    //         setNumOfCartItems(response.data.numOfCartItems);
    //         setCartId(response.data.data._id);
    //     }
    //     console.log(response);
    //     } catch (error) {
    //     console.error("Get Cart Error:", error);
    //     }
    // }

    // useEffect(() => {
    //     getCart();
    // }, []);
