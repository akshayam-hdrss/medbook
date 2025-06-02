"use client";
import React, { useEffect, useState } from "react";
import { getExecutive,getExecutives, updateExecutiveStatus } from "@/firebase/firestore/user";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import Link from "next/link";

function executivesPageAdmin() {
  const [executives, setExecutives] = useState();
  const [toggleStatus, setToggleStatus] = useState({}); // Add a state to track toggle status

  const handleToggle = async (id) => {
    setToggleStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    const executive = await getExecutive(id);
    const newStatus =
      executive.data.execstatus === "active" ? "inactive" : "active";
    await updateExecutiveStatus(newStatus, id);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getExecutives();
      setExecutives(data);
      const initialToggleStatus = {};
      data.forEach((exec) => {
        initialToggleStatus[exec.id] = exec.data.execstatus === "active";
      });
      setToggleStatus(initialToggleStatus);
    };
    fetch();
  }, [toggleStatus]);

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6">Executives</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 w-[30px]">S.No.</th>
            <th className="px-4 py-2 border border-gray-300">User Name</th>
            <th className="px-4 py-2 border border-gray-300">Mobile</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Details</th>
          </tr>
        </thead>
        <tbody>
          {executives &&
            executives.map((exec, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {exec.data.username}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {exec.data.mobile}
                </td>
                <td className="px-4 flex items-center gap-x-6 py-2 border border-gray-300">
                  {toggleStatus[exec.id] ? (
                    <BsToggleOn
                      fontSize={30}
                      onClick={() => handleToggle(exec.id)}
                    />
                  ) : (
                    <BsToggleOff
                      fontSize={30}
                      onClick={() => handleToggle(exec.id)}
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Link href={`/admin/executives/${exec.id}`}>
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default executivesPageAdmin;
