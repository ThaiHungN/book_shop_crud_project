import "./productManagement.scss";

import Navbar from "../../../components/navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { moveTo } from "../../../utils/helperFunctions";

// import context
import { ProductContext } from "../../../contexts/ProductContext";

import Cookies from "js-cookie";

const ProductManagement = (props) => {
    const { readAllProduct, deleteProduct } = useContext(ProductContext);

    const [thumbnail, setThumbnail] = useState("");
    const [displayThumbnail, setDisplayThumbnail] = useState(false);
    const [data, setData] = useState([])

    const showThumbnail = (img) => {
        setThumbnail(img);
        setDisplayThumbnail(true)
    }



    useEffect(() => {
        const getAllProduct = async () => {
            const response = await readAllProduct();

            setData(response.data.product_list);
        }

        getAllProduct();
    }, [])

    const handleDelete = async (id) => {
        const token = Cookies.get("token");

        const response = await deleteProduct(id, token);


        if(response.data.success){
            window.location.href = "/admin/products";
        }


    }


    return (
        <div className="product-management">

            <Navbar></Navbar>

            <div className="wrapper">
                <table>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                        <th>Number</th>
                        <th colSpan={2}>
                            <div className="add-product btn"
                                onClick={() => {moveTo("/admin/products/create")}}
                            >New</div>
                        </th>
                    </tr>

                    {data.map((product, idx) => {
                        return (
                            <tr>
                                <td>{idx+1}</td>
                                <td>{product.name}</td>
                                <td>{product.author}</td>
                                <td>{product.price}</td>
                                <td className="btn"
                                    onClick={() => {showThumbnail(product.thumbnail)}}                                
                                >
                                    View
                                </td>
                                <td>{product.number}</td>
                                <td className="btn" onClick={() => {
                                    moveTo("/admin/products/edit/" + product.product_id)
                                }}>Edit</td>
                                <td className="btn" onClick={() => {
                                    handleDelete(product.product_id)
                                }}>Delete</td>
                            </tr>
                        )
                    })}
                </table>
                
                {displayThumbnail &&
                    <div className="thumbnail">
                        <div className="header">
                            <div className="close" onClick={() => {setDisplayThumbnail(false)}}>Close</div>
                        </div>

                        <div className="content">
                            <img src={thumbnail} alt = "thumbnail"></img>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductManagement;