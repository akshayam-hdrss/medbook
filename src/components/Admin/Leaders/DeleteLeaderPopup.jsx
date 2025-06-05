"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  deleteDistrictLeaders,
  deleteStateLeaders,
  editDistrictLeaders,
  getDistrictLeaders,
  getStateLeaders,
} from "@/firebase/firestore/leaders";

function DeleteLeaderPopup({ open, setOpen, districts }) {
  const [editDistrict, setEditDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [level, setLevel] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  let id;
  const handleOpen = () => setOpen(!open);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handledelete = async () => {
    setOpen(!open);
    setEditDistrict("");
    setSearchTerm("");
    setLevel("");
    setSelectedOption("");
    setOptions([]);
    setStateOptions([]);
    setFilteredOptions([]);
    if (level === "district") {
      await deleteDistrictLeaders(editDistrict, selectedOption);
    } else if (level === "state") {
      await deleteStateLeaders(selectedOption);
    }
    setLevel("");
  };
  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        const data = await getDistrictLeaders(editDistrict);
        setOptions(data);
        const data2 = await getStateLeaders();
        setStateOptions(data2);
      }
    };
    fetchData();
  }, [editDistrict, open]);
  useEffect(() => {
    const fetchData = () => {
      if (open) {
        if (level === "district") {
          if (searchTerm == " ") {
            setFilteredOptions(
              options && options.filter((option) => option.data.name)
            );
          } else {
            setFilteredOptions(
              options &&
                options.filter((option) =>
                  option.data.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
            );
          }
        } else if (level === "state") {
          setFilteredOptions(
            stateOptions &&
              stateOptions.filter((option) =>
                option.data.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
          );
        }
      }
    };
    fetchData();
  }, [searchTerm, level, options, stateOptions, open]);
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 cursor-pointer">
        Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Card className="mx-auto w-full max-w-[24rem] font-inter">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Delete a Leader
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Enter the Level
            </Typography>

            <select
              name="Level"
              id="level"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value=" ">Select level</option>
              <option value="district">District Level</option>
              <option value="state">State Level</option>
            </select>

            {level === "district" && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Enter the district of the member you want to edit
                </Typography>
                <select
                  name="district"
                  id="selectdistrict"
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                >
                  <option value=" ">Select district</option>
                  {districts &&
                    districts.map((doc, index) => (
                      <option key={index} value={doc.id}>
                        {doc.data.name}
                      </option>
                    ))}
                </select>
              </>
            )}

            <Typography className="-mb-2" variant="h6">
              Select a Leader
            </Typography>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="" disabled>
                Select an option
              </option>
              {filteredOptions &&
                filteredOptions.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.data.name}
                  </option>
                ))}
            </select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handledelete}
              fullWidth
            >
              Enter
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default DeleteLeaderPopup;
