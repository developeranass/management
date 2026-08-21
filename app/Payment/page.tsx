"use client"
import { useEffect, useState } from "react"
import { columns, User } from "./columns"
import { DataTable } from "./data-table"
import { apiClient } from "../lib/api-client";







// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       email: "m@example.com",
//       name : "Anas Sartaj",
//       role : "User"
//     },
//     {
//       id: "489e1d42",
//       email: "example@gmail.com",
//       name : "Anas Sartaj",
//       role : "Admin"
//     },
//   ]
// }


export default function Payments() {

  const [data, setData] = useState<{ users: User[] }>({ users: [] });
  useEffect(() => {

    async function getUsers() {

      try {
        const data = await apiClient.getUser();
        setData(data);
        //console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getUsers();

  }, []);


  //const data = await getData()

  return (
    <div className="container mx-auto py-10">
       <DataTable columns={columns} data={data.users} /> 
    </div>
  )
}