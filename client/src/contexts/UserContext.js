import { createContext, useReducer, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

// import { authReducer } from '../reducers/authReducer'
import axios from 'axios'


import { domain } from './constant'
import Cookies from 'js-cookie'

export const UserContext = createContext()

// axios.defaults.withCredentials = true;

const UserContextProvider = ({ children }) => {


    const readAllUser = async () => {
        try {
            const url = domain + "user/read.php";

            const response = await axios.get(url);

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }

    const readOneUser = async (id) => {
        try {
            const url = domain + "user/readone.php";

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


    // const deleteProduct = async (id, token) => {
    //     try {
    //         const url = domain + "product/delete.php";

    //         const data = {
    //             id,
    //             token
    //         }

    //         // console.log("debug", data);

    //         const response = await axios.delete(url, { data: data });

    //         return response;

    //     } catch (error) {
    //         return { success: false, message: error };
    //     }
    // }

    const editUser = async (data) => {
        try {
            const url = domain + "user/update.php";

            const response = await axios.put(url, data);

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }



    const userContextData = { readAllUser, readOneUser, editUser }

    return (<UserContext.Provider value={userContextData}>{children}</UserContext.Provider>)

}

export default UserContextProvider;
