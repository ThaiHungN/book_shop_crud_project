import "./product.scss";

import { useContext, useState, useEffect } from "react";

import Navbar from "../../components/navbar/Navbar";

import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

const Product = (props) => {
    const { readAllProduct, deleteProduct } = useContext(ProductContext);
    const { updateCart } = useContext(CartContext);

    const [data, setData] = useState([]);
    
    
    
    useEffect(() => {
        const getAllProduct = async () => {
            
            const response = await readAllProduct();

            let tmpData = response.data.product_list;

            

            for(let i = 0; i < tmpData.length; i++){
                tmpData[i].added = 0;
            }


            setData(tmpData)
        }

        getAllProduct();
    }, [])




    const inc = (idx) => {
        const newData = data.map((product, i) => {
            if (i === idx && product.added < product.number) {
              // Increment the clicked counter
              return {
                ...product,
                added: product.added + 1
              };
            } else {
              // The rest haven't changed
              return product;
            }
          });


        setData(newData);
       
        
        
    }

    const dec = (idx) => {
        const newData = data.map((product, i) => {
            if (i === idx && product.added > 0) {
              // Increment the clicked counter
              return {
                ...product,
                added: product.added - 1
              };
            } else {
              // The rest haven't changed
              return product;
            }
          });


        setData(newData);
       
        
    }


    


    return (
        <div className="product">

            <Navbar></Navbar>

            <div className="wrapper">
                {data.map((product, idx) => {
                    return (
                        <div className="item">
                            <div className="top">
                                <img src={product.thumbnail} alt="thumbnail"></img>
                            </div>

                            <div className="footer">
                                <div className="info">
                                    <div className="name-author">{product.name} - {product.author}</div>
                                    <div className="price">{product.price} VND</div>

                                    <div class="number">
                                        <span class="minus"
                                            onClick={() => dec(idx)}
                                        >-</span>

                                        <input type="text" value={product.added}/>

                                        <span class="plus"
                                            onClick={() => inc(idx)}
                                        >+</span>
                                    </div>
                                </div>

                                
                                
                                <div className="add-to-cart"
                                    onClick={() => {
                                        updateCart(product);
                                        alert("Add successfully.");
                                    }}
                                >Add to cart</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Product