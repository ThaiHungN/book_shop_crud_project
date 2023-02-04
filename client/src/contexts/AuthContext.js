import { createContext, useReducer, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

// import { authReducer } from '../reducers/authReducer'
import axios from 'axios'


import { domain } from './constant'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

// axios.defaults.withCredentials = true;

const AuthContextProvider = ({ children }) => {
    // const [authState, dispatch] = useReducer(authReducer, {
    //     authLoading: true,
    //     isAuthenticated: false,
    //     // role: userRole.USER
    // })


    useEffect(() => {
        const auth = async () => {
            const response = await authUser();

            if(response.data.success){
                Cookies.set("user", response.data.user);
                Cookies.set("role", response.data.role);
            }
            else{
                logout();
            }
        }

        auth();
    }, []);

    // auth user
    const authUser = async () => {
        const token = Cookies.get("token");

        console.log("debug token", token);
        const data = {
            "token": token
        }
        const url = domain + "auth/session.php";

        const response = await axios.post(url, data, {
            headers:{
                'Content-Type': 'application/json'
            }
        })

        return response;
    }


    // Register
    const registerUser = async (userForm) => {
        try {
            const url = domain + "auth/register.php";

            const response = await axios.post(url, userForm, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            return response;

        } catch (error) {
            return { success: false, message: error };
        }
    }

    // login
    const loginUser = async (userForm) => {
        try {
            const url = domain + "auth/login.php";
            // console.log("check url", url);
            const response = await axios.post(url, userForm, {
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



    const logout = async () => {
        Cookies.remove("token", {path: "/"});
        Cookies.remove("user", {path: "/"});
        Cookies.remove("user-id", {path: "/"});
        Cookies.remove("role", {path: "/"});
    }



    const authContextData = { registerUser, loginUser, logout }

    return (<AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>)

}

export default AuthContextProvider
