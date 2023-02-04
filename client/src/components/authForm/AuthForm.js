/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useContext, useState } from "react";
import "./authForm.scss";

import Button from "../button/Button";

// import context
import { AuthContext } from "../../contexts/AuthContext";

import { moveTo } from "../../utils/helperFunctions";

import Cookies from 'js-cookie'



const AuthForm = (props) => {
    const { registerUser, loginUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const handleOnKeyDown = (event, type) => {
        if (event.keyCode === 13) {
            // console.log('enter');
            if(type === "register"){
                // console.log("debug 3");
                submitRegisterForm();
            }
            else if(type === "login"){
                // console.log("debug 4");
                submitLoginForm();
            }
            
        }
    }

    const handleChange = (event, type) => {
        // console.log(event.target.value);
        if(type === "email"){
            // console.log("debug 1");
            setEmail(event.target.value);
        }
        else if(type === "name"){
            // console.log("debug 2");
            setName(event.target.value);
        }
        else if(type === "password"){
            // console.log("debug 2");
            setPassword(event.target.value);
        }
    }

    const submitRegisterForm = async () => {
        const data = {
            "email": email,
            "name": name,
            "password": password
        }

        // console.log("debug data", data);

        const response = await registerUser(data);

        console.log(response);
        if(response.data.success){
            moveTo("/login");
        }
        else{
            // console.log(response.data.errors);
            setErrors(response.data.errors);
        }
    }

    const submitLoginForm = async () => {
        const data = {
            "email": email,
            "password": password
        }

        // console.log("debug data", data);

        const response = await loginUser(data);

        console.log(response);
        if(response.data.success){
            // store token
            Cookies.set("token", response.data.token);
            Cookies.set("user", response.data.user);
            Cookies.set("user-id", response.data.user_id);
            Cookies.set("role", response.data.role);

            moveTo("/");
        }
        else{
            // console.log(response.data.errors);
            setErrors(response.data.errors);
        }
    }

    return (
        <div className="auth-form">
            {props.authType === "register" && (
                <>
                    <div className="header">New User Registration</div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Email Address"
                            value = {email} 
                            onChange = {(e) => handleChange(e, "email")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "register")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Name"
                            value = {name} 
                            onChange = {(e) => handleChange(e, "name")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="password" 
                            placeholder="password"
                            value = {password} 
                            onChange = {(e) => handleChange(e, "password")}
                            onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>
                    

                    <Button
                        styles={{
                            "border-radius": "5px",
                            "height": "1.8rem",
                            "width": "100%",
                            "background": "#2D5288",
                            "margin-right": "0",
                            "padding": "0.6rem 0",
                            "color": "#ffffff",
                        }}
                        content="Create Account"
                        handleClick = {() => submitRegisterForm()}
                    ></Button>

                    <>
                        {errors.map((error) => {
                            return (
                                <div className="error">
                                    {error}
                                </div>
                            )
                        })}
                    </>

                    <div className="auth-help">
                        <div className="login item">
                            Already have an account?{" "}
                            <a href="/login">Login here!</a>
                        </div>
                    </div>
                </>
            )}

            {props.authType === "login" && (
                <>
                    <div className="header">Login your account</div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Email Address"
                            value = {email} 
                            onChange = {(e) => handleChange(e, "email")}
                            onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="password" 
                            placeholder="Password"
                            // value = {password} 
                            onChange = {(e) => handleChange(e, "password")}
                            onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>

                    <Button
                        styles={{
                            "border-radius": "5px",
                            "height": "1.8rem",
                            "width": "100%",
                            "background": "#2D5288",
                            "margin-right": "0",
                            "padding": "0.6rem 0",
                            "color": "#ffffff",
                        }}
                        content="Login your account"
                        handleClick = {() => submitLoginForm()}
                    ></Button>

                    {errors.map((error) => {
                        return (
                            <div className="error">
                                {error}
                            </div>
                        )
                    })}

                    <div className="auth-help">
                        <div className="create-account item">
                            Do not have an account?{" "}
                            <a href="/register">Create your account here!</a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthForm;
