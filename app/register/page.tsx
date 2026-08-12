"use client"

import { useState, type FormEvent } from "react";
import { apiClient } from "@/app/lib/api-client";
import { useRouter } from "next/navigation";

export default function register() {

    const router = useRouter();

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    

    async function handleSubmit(e: FormEvent<HTMLFormElement>)
    {

        e.preventDefault();
        setError(null);
        setLoading(true);


        try{
            const user = await apiClient.register({name,email,password});
            router.push("/login");

        }
        catch(error)
        {

            console.error(error);

        }
        finally{
            setLoading(false);
        }


    }



    return (
        <>
            <div className="flex justify-center items-center h-screen bg-indigo-600">
                <div className="w-96 p-6 shadow-lg bg-white rounded">
                    <h1 className="text-3xl block text-center font-semibold">Login</h1>


                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 shadow-lg">
                            <label htmlFor="name" className="block text-base mb-2">Full Name</label>
                            <input type="text" id="name" onChange={(e)=> setName(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter username..." />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="email" className="block text-base mb-2">Email</label>
                            <input type="email" id="username" onChange={(e)=> setEmail(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Email..." />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="password" className="block text-base mb-2">Password</label>
                            <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter username..." />
                        </div>

                        <div className="mt-3">
                            <button className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 bg-black text-white shadow-lg">

                            {loading ? "Creating..." : "Submit"}

                            </button>
                        </div>
                  </form>


                </div>
            </div>

        </>

    )







}