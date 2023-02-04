import "./navbar.scss";

import { useContext, useEffect, useState } from "react";

// import assets

// import functions
import { moveTo } from "../../utils/helperFunctions";
import Cookies from "js-cookie";

// import contexts
import { AuthContext } from "../../contexts/AuthContext";

// import components

const Navbar = (props) => {
    const {logout} = useContext(AuthContext);


    return (
        <div className="navbar-container">
            <ul>
                {Cookies.get("role") === "1" &&
                    <li onClick={() => moveTo("/admin/users")}>User management</li>
                }

                {Cookies.get("role") === "1" &&
                    <li onClick={() => moveTo("/admin/products")}>Product management</li>
                }

                {Cookies.get("role") !== "1" &&
                    <li onClick={() => moveTo("/products")}>Products</li>
                }
                
                {Cookies.get("role") !== "1" &&
                    <li onClick={() => moveTo("/cart")}>Cart</li>
                }

                {(Cookies.get("role") === "0" || Cookies.get("role") === "1") &&
                    <li onClick={() => moveTo("/profile/" + Cookies.get("user-id"))}>Profile</li>
                }


                {(Cookies.get("role") !== "0" && Cookies.get("role") !== "1") &&
                    <li onClick={() => moveTo("/login")}>Login</li>
                }

                {(Cookies.get("role") !== "0" && Cookies.get("role") !== "1") &&
                    <li onClick={() => moveTo("/register")}>Register</li>
                }

                {(Cookies.get("role") === "0" || Cookies.get("role") === "1") &&
                    <li onClick={() => {
                        logout();
                        moveTo("/");
                    }}>Logout</li>
                }
            </ul>
        </div>
    );
};

export default Navbar;
