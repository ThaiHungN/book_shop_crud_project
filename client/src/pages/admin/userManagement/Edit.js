/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, createRef, useContext, useState} from 'react';
import './edit.scss';


// import components
import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';

// import context
import { UserContext } from "../../../contexts/UserContext";

import Cookies from 'js-cookie';


const Edit = (props)=>{
    const { editUser, readOneUser } = useContext(UserContext);

    const [user, setUser] = useState({
        name: "",
        role: "", 
        id: ""
    })


    
    useEffect(() => {
        const getUser = async () => {
            const id = window.location.pathname.split("/").pop();

            const response = await readOneUser(id);

            if(response.data.success){
                setUser(response.data.user);
            }
            
        }

        getUser();
    }, [])



    const handleChange = (event, type) => {
        setUser({
            ...user,
            [type]: event.target.value
        })
    }

    const submit = async () => {
        const token = Cookies.get("token");

        const id = window.location.pathname.split("/").pop();

        const data = {
            ...user,
            id,
            token
        }

        const response = await editUser(data);
        // console.log(response);

        if(response.data.success){
            window.location.href = "/profile/" + Cookies.get("user-id");
        }
    }

    return(
        <div className = 'edit'>
            <Navbar></Navbar>

            <div className="main">
                <div className="form">
                    <div className="header">Edit user</div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Name"
                            value = {user.name} 
                            onChange = {(e) => handleChange(e, "name")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "register")}
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
                        content="Edit"
                        handleClick = {() => submit()}
                    ></Button>
                </div>
            </div>
        </div>
    );
}

export default Edit;