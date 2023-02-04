/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, createRef, useContext, useState} from 'react';
import './register.scss';


// import components
import Navbar from "../../components/navbar/Navbar";
import AuthForm from '../../components/authForm/AuthForm';

const Register = (props)=>{
    return(
        <div className = 'register'>
            <Navbar></Navbar>

            <div className="main">
                <AuthForm
                    authType = "register"
                ></AuthForm>
            </div>
        </div>
    );
}

export default Register;