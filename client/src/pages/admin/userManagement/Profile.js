import "./profile.scss";

import Navbar from "../../../components/navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { moveTo } from "../../../utils/helperFunctions";

// import context
import { UserContext } from "../../../contexts/UserContext";

import Cookies from "js-cookie";

const Profile = (props) => {
    const { readOneUser } = useContext(UserContext);

    const [user, setUser] = useState({
        name: "",
        role: "", 
        user_id: ""
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



    return (
        <div className="profile">

            <Navbar></Navbar>

            <div className="wrapper">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>

                    <tr>
                        <td>{user.name}</td>
                        <td>{user.role === "0" ? "user": "admin"}</td>
                        <td className="btn" onClick={() => {
                            moveTo("/profile/edit/" + user.user_id)
                        }}>Edit</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Profile;