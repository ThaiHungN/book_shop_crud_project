/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, createRef, useContext, useState} from 'react';
import './create.scss';


// import components
import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';

// import context
import { ProductContext } from '../../../contexts/ProductContext';
import { UploadContext } from '../../../contexts/UploadContext';

import Cookies from 'js-cookie';

import { domain } from '../../../contexts/constant';
import axios from 'axios';


const Create = (props)=>{
    const {createProduct} = useContext(ProductContext);
    const {uploadThumbnail} = useContext(UploadContext);

    const [product, setProduct] = useState({
        name:"",
        author:"",
        price:null,
        thumbnail:"",
        number:null
    })

    const handleChange = (event, type) => {
        setProduct({
            ...product,
            [type]: event.target.value
        })
    }

    const handleChangeThumbnail = async (event) => {
        try{
        
            const formData = new FormData();

            formData.append("file", event.target.files[0]);

            const response = await uploadThumbnail(formData);


            if(response.data.success){
                setProduct({
                    ...product,
                    thumbnail: response.data.url
                })
            }

        }catch(err){
            console.log(err);
        }
    }


    const submit = async () => {

        const token = Cookies.get("token");

        const data = {
            ...product,
            token
        }

        const response = await createProduct(data);
        // console.log(response);

        if(response.data.success){
            window.location.href = "/admin/products";
        }
    }

    return(
        <div className = 'create'>
            <Navbar></Navbar>

            <div className="main">
                <div className="form">
                    <div className="header">New book</div>

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

                    <div className="form-upload">
                        {/* <input 
                            type="text" 
                            placeholder="Thumbnail"
                            value = {product.thumbnail} 
                            onChange = {(e) => handleChange(e, "thumbnail")}
                            // onKeyDown={(e) => handleOnKeyDown(e, "login")}
                        ></input> */}
                        <span>Thumbnail </span>
                        <input 
                            type="file" 
                            name="thumbnail" 
                            onChange={handleChangeThumbnail} 
                        />
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
                        content="Create"
                        handleClick = {() => submit()}
                    ></Button>
                </div>
            </div>
        </div>
    );
}

export default Create;