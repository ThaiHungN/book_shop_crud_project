import { createContext, useReducer, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

import { cartReducer } from '../reducers/cartReducer'

import { UPDATE_CART } from '../reducers/constants'

import axios from 'axios'


import { domain } from './constant'
import Cookies from 'js-cookie'

export const CartContext = createContext()

// axios.defaults.withCredentials = true;

const CartContextProvider = ({ children }) => {
    // state
    const [cartState, dispatch] = useReducer(cartReducer, {
        cart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
    })

    const updateCart = (product) => {
        let curCart = cartState.cart;
        curCart.push(product);

        dispatch({
            type: UPDATE_CART,
            payload: curCart
        })

        localStorage.setItem("cart", JSON.stringify(cartState.cart));
    }

    const removeProductFromCart = (productIndex) => {
        let curCart = cartState.cart;
        curCart.splice(productIndex, 1);

        dispatch({
            type: UPDATE_CART,
            payload: curCart
        })

        localStorage.setItem("cart", JSON.stringify(cartState.cart));
    }

    const resetCart = (productIndex) => {
        dispatch({
            type: UPDATE_CART,
            payload: []
        })

        localStorage.setItem("cart", JSON.stringify([]));
    }

    const payment = async (id, token) => {
        try {
            const url = domain + "cart/payment.php";
            
            const data = {
                id,
                token
            }

            const response = await axios.post(url, data, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            return response;

        } catch (error) {
            if (error.response.data)
                return error.response.data;
            else
                return { success: false, message: error.message };
        }
    }

   

    const cartContextData = { cartState, updateCart, removeProductFromCart, resetCart, payment }

    return (<CartContext.Provider value={cartContextData}>{children}</CartContext.Provider>)

}

export default CartContextProvider;
