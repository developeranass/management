"use client"

import { useEffect, useState } from "react";
import { apiClient } from "../lib/api-client";

const users = () =>
{
    const [user, setUser] = useState([])
    useEffect(()=>{
        const fetchUsers= async() => {
            try{

               const data = await apiClient.getUser();
               setUser(data);
            }
            catch(error){

                console.error("Error fetching videos",error);
            }


        }
        fetchUsers();
    },[]);

    return (
        <>
        <div>
        <h1>Chai Code</h1>
        </div>
        
        </>
    )


}
export default users;