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
  addDistrictLeader,
  addStateLeader,
} from "@/firebase/firestore/leaders";
import { getMaxSnoDistrict } from "@/firebase/firestore/leaders";

function AddLeaderPopup({ open, setOpen, maxSnoState, districts }) {
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [profilepic, setProfilepic] = useState();
  const [level, setLevel] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [district, setDistrict] = useState();
  const [maxSnoDistrict, setMaxSnoDistrict] = useState();
  let id;
  let districtlower;
  const handleOpen = () => setOpen(!open);

  const handleadd = async () => {
    setOpen(!open);

    if (name) {
      id = name.replace(/\s+/g, "").toLowerCase();
    }
    if (level === "district") {
      districtlower = district.toLowerCase();
      addDistrictLeader(
        id,
        districtlower,
        district,
        {
          name: name,
          position: position,
          ...(mobileNumber && { mobile: mobileNumber }),
          sno: maxSnoDistrict,
        },
        profilepic
      );
    } else if (level === "state") {
      addStateLeader(
        id,
        {
          name: name,
          position: position,
          ...(mobileNumber && { mobile: mobileNumber }),
          sno: maxSnoState,
        },
        profilepic
      );
    }
    setLevel("");
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getMaxSnoDistrict(district);
      setMaxSnoDistrict(data);
    };

    fetch();
  }, [district]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi cursor-pointer">
        Add
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
              Add Leader
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
                  Enter the District
                </Typography>
                <select
                  name="district"
                  id="district"
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">Select District</option>
                  {districts &&
                    districts.map((district) => (
                      <option value={district.id}>{district.data.name}</option>
                    ))}
                </select>
              </>
            )}
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
              Enter the S.No.
            </Typography>

            <Input
              type="number"
              size="lg"
              label="position"
              required
              value={level === "state" ? maxSnoState : maxSnoDistrict}
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
              Profile Picture (Should be 4:5 Aspect Ratio)
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
              onClick={handleadd}
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

export default AddLeaderPopup;
