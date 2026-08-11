"use client"

import { useEffect, useState } from "react";
import { apiClient } from "../lib/api-client";
import { Role, User } from "../types";

type UserRow = Pick<User, "id" | "name" | "email" | "role" | "createdAt">;

const ROLE_STYLE: Record<Role, string> = {
    [Role.ADMIN]: "text-rose-300",
    [Role.MANAGER]: "text-indigo-300",
    [Role.USER]: "text-emerald-300",
    [Role.GUEST]: "text-zinc-400",
};

const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const Users = () => {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiClient.getUser();
                console.log(data.users);
                setUsers(data.users);
            }
            catch (error) {
                console.error("Error fetching users", error);
                setError("Could not load users.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const rows = users.filter((u) =>
       
        (u.name + u.email + u.role).toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black px-6 py-10 font-sans text-zinc-100 antialiased">
            <div className="mx-auto max-w-4xl">

                <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">Directory</p>
                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-zinc-50">Users</h1>
                <p className="mb-7 text-sm text-zinc-400">
                    Everyone you have access to see in the workspace.
                </p>

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">

                    <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
                        <p className="text-sm text-zinc-400">
                            <span className="font-semibold text-white">{rows.length}</span>{" "}
                            {rows.length === 1 ? "user" : "users"}
                        </p>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search&hellip;"
                            className="w-44 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-shadow focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                        />
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                <th className="px-5 py-3">User</th>
                                <th className="hidden px-5 py-3 sm:table-cell">Role</th>
                                <th className="hidden px-5 py-3 sm:table-cell">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/70">
                            {rows.map((u) => (
                                <tr key={u.id} className="transition-colors hover:bg-zinc-900/60">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-semibold text-white ring-1 ring-white/10">
                                                {initials(u.name)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-100">{u.name}</div>
                                                <div className="text-xs text-zinc-500">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden px-5 py-3 sm:table-cell">
                                        <span className={`inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium ${ROLE_STYLE[u.role] ?? "text-zinc-400"}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="hidden px-5 py-3 text-sm text-zinc-500 sm:table-cell">
                                        {formatDate(u.createdAt)}
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-5 py-10 text-center text-sm text-zinc-500">
                                        {loading
                                            ? "Loading users…"
                                            : error
                                                ? error
                                                : query
                                                    ? <>No users match &ldquo;{query}&rdquo;.</>
                                                    : "No users found."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Users;
