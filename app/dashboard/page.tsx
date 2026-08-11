"use client"

import React, { useState } from "react";

const MEMBERS = [
  { name: "Amara Okafor", email: "amara@studio.co", role: "Design Lead",     status: "active",  projects: 8, active: "just now",  grad: "from-violet-500 to-indigo-600" },
  { name: "Rowan Vitale", email: "rowan@studio.co", role: "Frontend Eng",    status: "active",  projects: 5, active: "3m ago",    grad: "from-sky-500 to-blue-600" },
  { name: "Sana Qureshi", email: "sana@studio.co",  role: "Product Manager", status: "away",    projects: 6, active: "1h ago",    grad: "from-amber-500 to-orange-600" },
  { name: "Diego Mendes", email: "diego@studio.co", role: "Backend Eng",     status: "active",  projects: 4, active: "12m ago",   grad: "from-emerald-500 to-teal-600" },
  { name: "Noor Haddad",  email: "noor@studio.co",  role: "Data Analyst",    status: "offline", projects: 3, active: "yesterday", grad: "from-pink-500 to-rose-600" },
  { name: "Kai Andersen", email: "kai@studio.co",   role: "QA Engineer",     status: "invited", projects: 0, active: "\u2014",    grad: "from-orange-500 to-red-600" },
];

const STATUS = {
  active:  { label: "Active",  dot: "bg-emerald-400", text: "text-emerald-300" },
  away:    { label: "Away",    dot: "bg-amber-400",   text: "text-amber-300" },
  offline: { label: "Offline", dot: "bg-zinc-500",    text: "text-zinc-400" },
  invited: { label: "Invited", dot: "bg-indigo-400",  text: "text-indigo-300" },
};

const initials = (name) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const rows = MEMBERS.filter((m) =>
    (m.name + m.email + m.role).toLowerCase().includes(query.toLowerCase())
  );

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
              <span className="font-semibold text-white">{rows.length}</span>{" "}
              {rows.length === 1 ? "member" : "members"}
            </p>
            <div className="flex items-center gap-2.5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                <th className="px-5 py-3">Status</th>
                <th className="hidden px-5 py-3 text-right sm:table-cell">Projects</th>
                <th className="hidden px-5 py-3 sm:table-cell">Last active</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {rows.map((m) => {
                const s = STATUS[m.status];
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
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium ${s.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3 text-right text-sm font-medium tabular-nums text-zinc-200 sm:table-cell">{m.projects}</td>
                    <td className="hidden px-5 py-3 text-sm text-zinc-500 sm:table-cell">{m.active}</td>
                    <td className="px-5 py-3 text-right">
                      <button aria-label="Row actions" className="rounded-md px-2 py-1 text-lg leading-none text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300">
                        &#8943;
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
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