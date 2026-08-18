"use client"

import { useState, type FormEvent } from "react";
function test() {
    const [email, setEmail] = useState("");
    // const handleSubmit = (e) =>{

    //     alert("Here");

    // }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        alert(email);
    }


    return (
        <>
            <div className="min-h-screen bg-black px-6 py-10 font-sanc text-zinc-100 antialiased">
                <div className="mx-auto max-w-4xl">
                    <div className="flex items-center justify-between pb-11">
                        <div className="text-lg font-bold tracking-tight text-white">
                            Anas<span className="text-indigo-400">.</span>
                        </div>
                        <nav className="flex gap-6 text-sm text-zinc-500">
                            <a href="#" className="transition-colors hover:text-zinc-200">Overview</a>
                            <a href="#" className="transition-colors hover:text-zinc-200">Members</a>
                            <a href="#" className="transition-colors hover:text-zinc-200">Settings</a>
                        </nav>


                    </div>


                </div>
            </div>

        </>



    )

}
export default test;
