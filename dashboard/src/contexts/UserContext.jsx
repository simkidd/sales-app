import React, { createContext, useState, useEffect } from "react";
import apiConfig from "../utils/apiConfig";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [users, setUsers] = useState([]);

    const { base_url } = apiConfig;

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem("token"); // Read the token from local storage
    
            if (!token) {
              // Handle the case when the token is not available
              // For example, redirect the user to the login page
              return;
            }
    
            const res = await axios.get(`${base_url}/users`, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            });
            // console.log(res.data.users);
            setUsers(res.data.users);
          } catch (error) {
            console.log(error);
            setError(error.response.data.error);
          }
        };
        fetchUsers();
      }, []);

    return(
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider