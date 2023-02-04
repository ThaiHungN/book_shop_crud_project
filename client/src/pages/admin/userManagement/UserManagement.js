import "./userManagement.scss";

import Navbar from "../../../components/navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { moveTo } from "../../../utils/helperFunctions";

// import context
import { UserContext } from "../../../contexts/UserContext";

import Cookies from "js-cookie";

const UserManagement = (props) => {
    const { readAllUser } = useContext(UserContext);

    const [data, setData] = useState([])




    useEffect(() => {
        const getAllUser = async () => {
            const response = await readAllUser();

            setData(response.data.user_list);
        }

        getAllUser();
    }, [])



    return (
        <div className="user-management">

            <Navbar></Navbar>

            <div className="wrapper">
                <table>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>

                    {data.map((user, idx) => {
                        return (
                            <tr>
                                <td>{idx+1}</td>
                                <td>{user.name}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default UserManagement;