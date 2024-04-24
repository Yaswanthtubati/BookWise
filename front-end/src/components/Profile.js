import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import ProfileCard from "./ProfileCard";

const Profile = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserDetails();
    }, []);

    async function getUserDetails() {
        try {
            // Include withCredentials: true to ensure cookies are sent with the request
            const response = await axios.get('http://localhost/bookwise_backend/accessController/profile.php', { withCredentials: true });
            setUserData(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex bg-blue-gray-50">
            <Sidebar />
            <div className="px-4 pt-4 mx-10 my-10">
                <ProfileCard {...userData} />
            </div>
        </div>
    );
}

export default Profile;
