"use client"

import React, { useEffect, useState } from "react";
import { apiClient } from "../lib/api-client";


type Member = {
  name: string;
  email: string;
  role: string;
  projects: number;
  active: string;
  grad: string;
};


const initials = (name: string) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

export default function Dashboard() {

  const [users, setUsers] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await apiClient.getUser();
        //console.log(data.users);
        setUsers(data.users);
      }
      catch (error) {
        console.error("Error fetching users", error);
      }
    }
    fetchUsers();

  }, []);

  // async function handleSearch(text: string) {

  //   if (!text.trim()) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   try {


  //     const search = await apiClient.search(query);
  //     setSearchResults(search.data);
  //     console.log(search.data);

  //   }
  //   catch (error) {
  //     throw new Error("Error searching users: " + (error instanceof Error ? error.message : "Unknown error"));

  //   }

  // }

  useEffect(() => {
   
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const search = await apiClient.search(query);
        if (!cancelled) setSearchResults(search.data);
      } catch (error) {
        console.error("Error searching users", error);
      }
    }, 300);

    return () => { cancelled = true; clearTimeout(id); };
  }, [query]);


  const isSearching = query.trim().length > 0;
  const displayed = isSearching ? searchResults : users;



  return (
    <div className="min-h-screen bg-black px-6 py-10 font-sans text-zinc-100 antialiased">
      <div className="mx-auto max-w-4xl">

        {/* top bar */}
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

        {/* section header */}
        <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">Overview</p>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-zinc-50">Team members</h1>
        <p className="mb-7 text-sm text-zinc-400">
          Everyone with access to the workspace and what they're working on.
        </p>

        {/* card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">

          {/* card head */}
          <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
            <p className="text-sm text-zinc-400">
              <span className="font-semibold text-white">{users.length}</span>{" "}
              {users.length === 1 ? "member" : "members"}
            </p>
            <div className="flex items-center gap-2.5">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); }}
                placeholder="Search\u2026"
                className="w-44 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-shadow focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
              />
              <button className="whitespace-nowrap rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 active:translate-y-px">
                + Add member
              </button>
            </div>
          </div>

          {/* table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-3">Member</th>
                <th className="hidden px-5 py-3 sm:table-cell">Role</th>


                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {displayed.map((m) => {

                return (
                  <tr key={m.email} className="transition-colors hover:bg-zinc-900/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${m.grad} text-xs font-semibold text-white ring-1 ring-white/10`}>
                          {initials(m.name)}
                        </div>
                        <div>
                          <div className="font-medium text-zinc-100">{m.name}</div>
                          <div className="text-xs text-zinc-500">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 text-sm text-zinc-300 sm:table-cell">{m.role}</td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-500">
                    No members match &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}