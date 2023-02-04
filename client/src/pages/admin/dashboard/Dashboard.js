/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useContext, useState } from "react";
import "./dashboard.scss";

// import components
import Navbar from "../../../components/navbar/Navbar";

const Dashboard = (props) => {
    return (
        <div className="dashboard">
            <div className="pageContentWrapper">
                <Navbar></Navbar>

                <div className="main">
                </div>
            </div>




        </div>
    );
};

export default Dashboard;
