/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, createRef, useContext, useState} from 'react';
import './login.scss';


// import components
import Navbar from "../../components/navbar/Navbar";
import AuthForm from '../../components/authForm/AuthForm';


const Login = (props)=>{
    return(
        <div className = 'login'>
            <Navbar></Navbar>

            <div className="main">
                <AuthForm
                    authType = "login"
                ></AuthForm>
            </div>
        </div>
    );
}

export default Login;