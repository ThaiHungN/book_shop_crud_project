import { createContext, useReducer, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

// import { authReducer } from '../reducers/authReducer'
import axios from 'axios'


import { domain } from './constant'
import Cookies from 'js-cookie'

export const ProductContext = createContext()

// axios.defaults.withCredentials = true;

const ProductContextProvider = ({ children }) => {
    // const [authState, dispatch] = useReducer(authReducer, {
    //     authLoading: true,
    //     isAuthenticated: false,
    //     // role: userRole.USER
    // })


    const createProduct = async (data) => {
        try {
            const url = domain + "product/create.php";

            const response = await axios.post(url, data, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }

    const readAllProduct = async () => {
        try {
            const url = domain + "product/read.php";

            const response = await axios.get(url);

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }

    const readOneProduct = async (id) => {
        try {
            const url = domain + "product/readone.php";

            const response = await axios.get(url, {
                params: {
                    id: id
                }
            });

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }


    const deleteProduct = async (id, token) => {
        try {
            const url = domain + "product/delete.php";

            const data = {
                id,
                token
            }

            // console.log("debug", data);

            const response = await axios.delete(url, { data: data });

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }

    const editProduct = async (data) => {
        try {
            const url = domain + "product/update.php";

            const response = await axios.put(url, data);

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }



    const productContextData = { createProduct, readAllProduct, readOneProduct, deleteProduct, editProduct }

    return (<ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>)

}

export default ProductContextProvider
