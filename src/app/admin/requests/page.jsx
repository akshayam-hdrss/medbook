"use client";
import React, { useEffect, useState } from "react";
import {
  approveServiceProducts,
  getFinalLevel4ServiceProducts,
} from "../../../firebase/firestore/servicesProducts";

function AdminRequestPage() {
  const [level4Data, setLevel4Data] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await getFinalLevel4ServiceProducts("services");
      // Filter the data to include only items with disabled set to true
      const filteredData = data.filter((item) => item.disabled === true);
      setLevel4Data(filteredData);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const handleApprove = async (id, type, level1, level2, level3) => {
    // Implement the approve functionality here
    await approveServiceProducts(id, type, level1, level2, level3);
    console.log(`Approved item with ID: ${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-medium my-6">Requests</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">S.No</th>
              <th className="px-4 py-2 border border-gray-300 w-[50px]">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300">Type</th>
              <th className="px-4 py-2 border border-gray-300">Level 1</th>
              <th className="px-4 py-2 border border-gray-300">Level 2</th>
              <th className="px-4 py-2 border border-gray-300">Level 3</th>
              <th className="px-4 py-2 border border-gray-300">Added By</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {level4Data.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.type}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.level1Name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.level2Name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.level3Name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.addedBy}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      handleApprove(
                        item.id,
                        item.type,
                        item.level1,
                        item.level2,
                        item.level3
                      )
                    }
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminRequestPage;
