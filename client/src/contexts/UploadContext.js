import { createContext, useReducer, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

// import { authReducer } from '../reducers/authReducer'
import axios from 'axios'


import { domain } from './constant'
import Cookies from 'js-cookie'

export const UploadContext = createContext()

// axios.defaults.withCredentials = true;

const UploadContextProvider = ({ children }) => {

    const uploadThumbnail = async (formData) => {
        const url =  domain + 'upload/file.php';


        const response = await axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        return response;
    }


    const uploadContextData = { uploadThumbnail }

    return (<UploadContext.Provider value={uploadContextData}>{children}</UploadContext.Provider>)

}

export default UploadContextProvider;
