import React from "react";
import prisma from "./lib/db";
import createUser from "@/actions/actions";

// Server Action (Next.js 13+)

export default async function SimpleTable() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Simple Table</h1>

        {/* Form */}
        <form
          action={createUser}
          className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button className="bg-black text-white rounded-xl text-sm font-medium hover:opacity-90 transition">
            Add User
          </button>
        </form>

        {/* Table */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-600">ID</th>
                <th className="p-4 text-sm font-medium text-gray-600">Name</th>
                <th className="p-4 text-sm font-medium text-gray-600">Email</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-sm">{row.id}</td>
                    <td className="p-4 text-sm">
                      {row.first_name} {row.last_name}
                    </td>
                    <td className="p-4 text-sm">{row.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
