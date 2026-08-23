"use client"
import { useEffect, useState } from "react"
import { columns, User } from "./columns"
import { DataTable } from "./data-table"
import { apiClient } from "../../lib/api-client";


export default function users() {

  const [data, setData] = useState<{ users: User[] }>({ users: [] });
  const [page , setPage] = useState(1);
  useEffect(() => {

    async function getUsers() {

      try {
        const data = await apiClient.getUser(page);
        setData(data);
        //console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getUsers();

  }, [page]);

  // async function myclick(page:number)
  // {
  //   alert(`Clicked page: ${page}`);
  //   console.log("page value:", page);
  // }





  //const data = await getData()

  return (
    <div className="container mx-auto py-10">
       <DataTable columns={columns} data={data.users} onPaginationClick={setPage} /> 
    </div>
  )
}