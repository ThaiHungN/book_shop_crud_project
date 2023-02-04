import "./cart.scss";

import Navbar from "../../components/navbar/Navbar";
import { useState, useContext, useEffect } from "react";

import { CartContext } from "../../contexts/CartContext";
import Cookies from "js-cookie";

const Cart = (props) => {
    const {cartState, removeProductFromCart, resetCart, payment } = useContext(CartContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(cartState.cart);
        
    }, [cartState]);


    const sum = (items) => {
        let total = 0;
        
        for(let item of items){
            total += parseInt(item.price) * parseInt(item.added);
        }

        return total;
    }

    const submitCart = async () => {
        const userId = Cookies.get("user-id");
        const token = Cookies.get("token");

        const response = await payment(userId, token);

        if(response.data.success === 0){
            if(response.data.message === "unauthorized"){
                alert("authentication is required");
                window.location.href = "/login";
            }
        }
        else{
            alert("payment is processed successfully");

            resetCart();
        }

        
    }


    return (
        <div className="cart">

            <Navbar></Navbar>

            <div className="wrapper">
                <table className="item-list">
                            <tr className="item">
                                <th className="left">Name</th>
                                <th className="right">Price</th>
                                <th> Number </th>
                                <th> Total Price </th>
                                <th></th>
                            </tr>

                    {data.map((item, idx) => {
                        return(
                            <tr className="item">
                                <td className="left">{item.name} </td>
                                <td className="right">{item.price} VND</td>
                                <td> {item.added} </td>
                                <td> {item.price * item.added } </td>
                                <td className="btn"
                                    onClick={() => removeProductFromCart(idx)}
                                >Remove</td>
                            </tr>
                        )
                    })}
                </table>
                <div className="total-price">
                    <div className="text">
                        Total
                    </div>

                    <div className="value">
                        {sum(data)} VND
                    </div>

                    <div className="btn"
                        onClick={() => resetCart()}
                    >Reset cart</div>
                </div>

                <div className="buy"
                    onClick={() => submitCart()}
                >
                    Buy
                </div>
            </div>
        </div>
    );
}

export default Cart