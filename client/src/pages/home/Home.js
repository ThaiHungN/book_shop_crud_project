/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useContext, useState } from "react";
import "./home.scss";

// import components
import Navbar from "../../components/navbar/Navbar";

const Home = (props) => {
    return (
        <div className="home">
            <div className="pageContentWrapper">
                <Navbar></Navbar>

                <div className="main">
                </div>
            </div>




        </div>
    );
};

export default Home;
