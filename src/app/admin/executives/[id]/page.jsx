"use client";
import React, { useState, useEffect } from "react";
import { getExecutive } from "@/firebase/firestore/user";
import BackButton from "@/components/ui/BackButton";
import { editExecutive } from "../../../../firebase/firestore/user";
function ExecutiveAdminPage({ params }) {
  const { id } = params;
  const [executive, setExecutive] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    // Update updatedData based on input type
    if (type === "radio") {
      setUpdatedData({
        ...updatedData,
        gender: value, // Set gender directly in updatedData
      });
    } else {
      setUpdatedData({
        ...updatedData,
        [id]: value,
      });
    }
  };

  const handleEdit = async () => {
    await editExecutive(id, updatedData);
    window.location.reload();
  };

  useEffect(() => {
    const fetchExecutive = async () => {
      const data = await getExecutive(id);
      setExecutive(data);
    };
    fetchExecutive();
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      {executive && (
        <div className="flex flex-col gap-y-4 px-20">
          <div className="flex justify-between items-center">
            <label className="font-semibold w-1/3 text-right mr-2">
              Membership Number:
            </label>
            <input
              type="text"
              id="membershipNo"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.membershipNo}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold w-1/3 text-right mr-2">
              User Name(for reference):
            </label>
            <input
              type="text"
              id="username"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold w-1/3 text-right mr-2">
              Member Name:
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Father/Husband Name:
            </label>
            <input
              type="text"
              id="fathername"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.fathername}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold w-1/3 text-right mr-2">
              Door No & Street:
            </label>
            <input
              type="text"
              id="address"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Village/Area:
            </label>
            <input
              type="text"
              id="area"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.area}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              District:
            </label>
            <input
              type="text"
              id="district"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.district}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Pincode:
            </label>
            <input
              type="text"
              id="pincode"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Mobile Number:
            </label>
            <input
              type="number"
              id="mobile"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Gender:
            </label>
            <div className="flex items-center w-2/3">
              <label className="mr-4">
                <input
                  type="radio"
                  value="male"
                  className="mx-2"
                  checked={
                    executive.data?.gender === "male" ||
                    updatedData?.gender === "male"
                  }
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value="female"
                  className="mx-2"
                  checked={
                    executive.data?.gender === "female" ||
                    updatedData?.gender === "female"
                  }
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  value="others"
                  className="mx-2"
                  checked={
                    executive.data?.gender === "others" ||
                    updatedData?.gender === "others"
                  }
                  onChange={handleChange}
                />
                Others
              </label>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <label className="font-semibold text-right mr-2 w-1/3">Age:</label>
            <input
              type="number"
              id="age"
              className="border border-gray-400 rounded-md p-2 w-20"
              defaultValue={executive.data?.age}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.dob}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, dob: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Educational Qualification:
            </label>
            <input
              type="text"
              id="education"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.education}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Occupation:
            </label>
            <input
              type="text"
              id="occupation"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.occupation}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Aadhar No:
            </label>
            <input
              type="number"
              id="aadhar"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.aadhar}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Voter ID No:
            </label>
            <input
              type="text"
              id="voterid"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              defaultValue={executive.data?.voterid}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Blood Group:
            </label>
            <select
              id="bloodGroup"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              value={updatedData.bloodGroup || executive.data?.bloodGroup || ""}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, bloodGroup: e.target.value })
              }
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-right mr-2 w-1/3">
              Data Type:
            </label>
            <select
              id="dataType"
              className="border border-gray-400 rounded-md p-2 w-2/3"
              value={updatedData.dataType || executive.data?.dataType || ""}
              onChange={handleChange}
            >
              <option value=" ">Select Data Type</option>
              <option value="services">Services</option>
              <option value="products">products</option>
            </select>
          </div>
          <div className="w-full">
            <button
              onClick={handleEdit}
              className="w-full bg-blue-gray-300 text-white py-2 rounded-md my-4"
            >
              Update Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExecutiveAdminPage;
