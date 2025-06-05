"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import {
  getLevel1ServiceProducts,
  getLevel2ServiceProducts,
  getLevel3ServiceProducts,
} from "@/firebase/firestore/servicesProducts";
import { addProduct } from "@/firebase/firestore/products";
import { useRouter } from "next/navigation";
import { addServicesAndProductsDoc } from "@/firebase/firestore/servicesProducts";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getExecutive } from "@/firebase/firestore/user";

function addClientPage() {
  const [userData, setUserData] = useState();
  const [clientData, setClientData] = useState({});
  const [profile, setProfile] = useState();
  const [backgroundImage, setBackgroundImage] = useState();
  const [photos, setPhotos] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]); //State for storing youtube links
  const [newLink, setNewLink] = useState(""); //State for current youtube link
  const [level1, setLevel1] = useState();
  const [level2, setLevel2] = useState();
  const [level3, setLevel3] = useState();

  const router = useRouter();

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setClientData({
      ...clientData,
      [id]: value,
    });
    if (id === "level1") {
      const selectedLevel1 = level1.find((level) => level.id === value);
      setClientData((prevData) => ({
        ...prevData,
        level1Name: selectedLevel1 ? selectedLevel1.name : "",
        level2: "", // Reset level2 and level3 when level1 changes
        level2Name: "",
        level3: "",
        level3Name: "",
      }));
    } else if (id === "level2") {
      const selectedLevel2 = level2.find((level) => level.id === value);
      setClientData((prevData) => ({
        ...prevData,
        level2Name: selectedLevel2 ? selectedLevel2.name : "",
        level3: "", // Reset level3 when level2 changes
        level3Name: "",
      }));
    } else if (id === "level3") {
      const selectedLevel3 = level3.find((level) => level.id === value);
      setClientData((prevData) => ({
        ...prevData,
        level3Name: selectedLevel3 ? selectedLevel3.name : "",
      }));
    }
  };

  const handleAddLink = () => {
    if (newLink) {
      setYoutubeLinks([...youtubeLinks, newLink]); // Add new link to the state
      setNewLink(""); // Clear the input field
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const id = clientData.name.replace(/\s+/g, "").toLowerCase();
    clientData.disabled = true;
    clientData.addedBy = userData.data.name;
    if (clientData.type === "services")
      await addServicesAndProductsDoc(
        clientData.level1,
        clientData.level2,
        clientData.level3,
        clientData,
        profile,
        backgroundImage,
        photos,
        "services",
        id
      );
    else if (clientData.type === "products")
      await addProduct(
        clientData.level1,
        clientData.level2,
        clientData.level3,
        clientData,
        profile,
        youtubeLinks,
        photos
      );
    router.back();
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getLevel1ServiceProducts(clientData.type);
      setLevel1(res);
    };
    fetch();
  }, [clientData.type]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getLevel2ServiceProducts(
        clientData.type,
        clientData.level1
      );
      setLevel2(res);
    };
    fetch();
  }, [clientData.level1]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getLevel3ServiceProducts(
        clientData.type,
        clientData.level1,
        clientData.level2
      );
      setLevel3(res);
    };
    fetch();
  }, [clientData.level2]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const data = await getExecutive(userId);
        setUserData(data);
      }
    });
  }, []);
  console.log(clientData);
  return (
    <div>
      <Header exec={true} />
      <div className="p-6">
        <h1 className="font-bold text-2xl">Add New Client</h1>
        <div className="my-4">
          <p className="text-lg mb-4">Select the Data Type</p>
          <select
            name="type"
            id="type"
            className="border border-kaavi px-4 py-2 mb-4"
            onChange={handleChange}
          >
            <option value=" ">Select Type</option>
            <option value="services">Services</option>
            <option value="products">Products</option>
          </select>
          <p className="text-lg mb-4">Select the Level 1</p>
          <select
            name="level1"
            id="level1"
            className="border border-kaavi px-4 py-2 mb-4"
            onChange={handleChange}
          >
            <option value=" ">Select Level 1</option>
            {level1 &&
              level1.map((levels) => (
                <option value={levels.id}>{levels.name}</option>
              ))}
          </select>

          <p className="text-lg mb-4">Select the Level 2</p>
          <select
            name="level2"
            id="level2"
            className="border border-kaavi px-4 py-2 mb-4"
            onChange={handleChange}
          >
            <option value=" ">Select Level 2</option>
            {level2 &&
              level2.map((levels) => (
                <option value={levels.id}>{levels.name}</option>
              ))}
          </select>

          <p className="text-lg mb-4">Select the Level 3</p>
          <select
            name="level3"
            id="level3"
            className="border border-kaavi px-4 py-2 mb-4"
            onChange={handleChange}
          >
            <option value=" ">Select Level 3</option>
            {level3 &&
              level3.map((levels) => (
                <option value={levels.id}>{levels.name}</option>
              ))}
          </select>
          <div className="flex flex-col justify-between items-start">
            <p className="text-xl font-medium mb-1">Name</p>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              placeholder="Name"
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            {clientData && clientData.type === "services" && (
              <>
                <p className="text-xl mt-2 font-medium mb-1">
                  Background Image (1920 * 1080 pixels)
                </p>
                <input
                  type="file"
                  onChange={(e) => setBackgroundImage(e.target.files[0])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />

                <p className="text-xl font-medium mb-1">Business Name</p>
                <input
                  type="text"
                  id="businessName"
                  onChange={handleChange}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
              </>
            )}
            <p className="text-xl font-medium mb-1">About</p>
            <textarea
              name="about"
              id="about"
              onChange={handleChange}
              rows={5}
              cols={30}
              className="border border-kaavi pl-4 py-3 mb-6"
            ></textarea>
            <p className="text-xl font-medium mb-1">Address Line 1</p>
            <input
              type="text"
              id="addLine1"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Address Line 2</p>
            <input
              type="text"
              id="addLine2"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            {clientData && clientData.type == "services" && (
              <>
                <p className="text-xl font-medium mb-1">Landmark</p>
                <input
                  type="text"
                  id="landmark"
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
              </>
            )}
            <p className="text-xl font-medium mb-1">Area</p>
            <input
              type="text"
              id="area"
              placeholder="Eg: RS Puram"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Pincode</p>
            <input
              type="text"
              placeholder="Eg: 641032"
              id="pincode"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">District</p>
            <input
              type="text"
              placeholder="District"
              id="district"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Mobile Number</p>
            <input
              type="number"
              id="mobile"
              onChange={handleChange}
              placeholder="Mobile Number"
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Whatsapp Number</p>
            <input
              type="text"
              id="whatsapp"
              onChange={handleChange}
              placeholder="Whatsapp Number"
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Google Maps Link</p>
            <input
              type="text"
              placeholder="Google Maps URL"
              id="mapurl"
              onChange={handleChange}
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">
              {clientData && clientData.type == "services"
                ? "Experience (in Years)"
                : "Since (Mention Year)"}
            </p>
            <input
              type="number"
              id="experience"
              onChange={handleChange}
              placeholder="Experience"
              className="border border-kaavi pl-4 py-3 mb-6"
            />
            <p className="text-xl font-medium mb-1">Profile Picture</p>
            <input
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
              className="border border-kaavi mb-6 w-60"
              accept="image/*"
            />

            <p className="text-xl font-medium mb-1">Photos</p>
            <input
              type="file"
              placeholder="photos"
              onChange={(e) => setPhotos([...e.target.files])}
              className="border border-kaavi mb-6 w-60"
              accept="image/*"
              multiple
            />
            {clientData && clientData.type == "services" && (
              <>
                <p className="text-xl font-medium mb-1">YouTube Link</p>
                <input
                  type="text"
                  id="video"
                  onChange={handleChange}
                  placeholder="Enter YouTube link"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
              </>
            )}
            {clientData && clientData.type == "products" && (
              <>
                <p className="text-xl font-medium mb-1">YouTube Links</p>
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)} // Update newLink state
                  placeholder="Enter YouTube link"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <button
                  onClick={handleAddLink}
                  className="my-4 bg-kaavi text-white px-4 py-2 rounded-md"
                >
                  Add Link
                </button>
                {youtubeLinks && (
                  <div className="text-black text-xl my-4">
                    <h1>Added Youtube Links</h1>
                    {youtubeLinks.map((link, index) => (
                      <p key={index}>{link}</p> // Display the added links
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="border border-black mr-2 p-2 px-14"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="text-white bg-kaavi p-2 px-14" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default addClientPage;
