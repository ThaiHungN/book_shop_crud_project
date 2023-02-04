/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, createRef, useContext, useState} from 'react';
import './edit.scss';


// import components
import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';

// import context
import { ProductContext } from '../../../contexts/ProductContext';

import Cookies from 'js-cookie';


const Edit = (props)=>{
    const { readOneProduct, editProduct } = useContext(ProductContext);



    const [product, setProduct] = useState({
        name:"",
        author:"",
        price:null,
        thumbnail:"",
        number:null
    })


    useEffect(() => {
        const readProduct = async () => {
            const id = window.location.pathname.split("/").pop();

            const response = await readOneProduct(id);

            if(response.data.success){
                setProduct(response.data.product);
            }

        }

        readProduct();
    }, [])

    const handleChange = (event, type) => {
        setProduct({
            ...product,
            [type]: event.target.value
        })
    }

    const submit = async () => {
        const token = Cookies.get("token");

        const id = window.location.pathname.split("/").pop();

        const data = {
            ...product,
            id,
            token
        }

        const response = await editProduct(data);
        // console.log(response);

        if(response.data.success){
            window.location.href = "/admin/products";
        }
    }

    return(
        <div className = 'edit'>
            <Navbar></Navbar>

            <div className="main">
                <div className="form">
                    <div className="header">Edit book</div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Name"
                            value = {product.name} 
                            onChange = {(e) => handleChange(e, "name")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "register")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Author"
                            value = {product.author} 
                            onChange = {(e) => handleChange(e, "author")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Price"
                            value = {product.price} 
                            onChange = {(e) => handleChange(e, "price")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Thumbnail"
                            value = {product.thumbnail} 
                            onChange = {(e) => handleChange(e, "thumbnail")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input>
                    </div>

                    <div className="form-input">
                        <input 
                            type="text" 
                            placeholder="Number"
                            value = {product.number} 
                            onChange = {(e) => handleChange(e, "number")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "login")}
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