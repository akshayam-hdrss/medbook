"use client";
import React, { useEffect, useState } from "react";
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
  editDistrictLeaders,
  editStateLeaders,
  getDistrictLeaders,
  getStateLeaders,
} from "@/firebase/firestore/leaders";

function EditLeaderPopup({ open, setOpen, districts }) {
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [profilepic, setProfilepic] = useState(null);
  const [level, setLevel] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [editDistrict, setEditDistrict] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState();
  const [stateOptions, setStateOptions] = useState();
  const [filteredOptions, setFilteredOptions] = useState();
  const handleOpen = () => setOpen(!open);
  const handleedit = async () => {
    setOpen(!open);
    const updatedData = {
      ...(name && { name: name }),
      ...(mobileNumber && { mobile: mobileNumber }),
      ...(position && { position: position }),
    };

    if (level === "district") {
      editDistrictLeaders(
        editDistrict,
        selectedOption,
        updatedData,
        profilepic
      );
    } else if (level === "state") {
      editStateLeaders(selectedOption, updatedData, profilepic);
    }
    setLevel("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
        Edit
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <Card className="mx-auto w-full h-full font-inter">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit a leader details
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter details for the State Level Leader
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
            <Typography className="-mb-2" variant="h6">
              Name of the Leader
            </Typography>
            <Input
              label="Name"
              onChange={(e) => setName(e.target.value)}
              size="lg"
              required
            />
            <Typography className="-mb-2" variant="h6">
              Enter the Position
            </Typography>

            <Input
              type="text"
              size="lg"
              label="position"
              required
              onChange={(e) => setPosition(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              Enter Mobile Number
            </Typography>

            <Input
              type="number"
              size="lg"
              label="mobile"
              required
              onChange={(e) => setMobileNumber(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              Profile Picture (Should be 1:1 Aspect Ratio)
            </Typography>

            <Input
              type="file"
              size="lg"
              label="profilepic"
              accept="image/*"
              required
              onChange={(e) => setProfilepic(e.target.files[0])}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleedit}
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

export default EditLeaderPopup;
