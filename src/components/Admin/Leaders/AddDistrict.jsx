import React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { addLeadersDistrict } from "@/firebase/firestore/leaders";
function AddDistrict({ open, setOpen }) {
  const [district, setDistrict] = useState();
  const handleOpen = () => setOpen(!open);
  const handleadd = async () => {
    await addLeadersDistrict(district);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi cursor-pointer">
        Add district
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
              Add District
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Enter the District
            </Typography>
            <input
              name="district"
              placeholder="Select District"
              onChange={(e) => setDistrict(e.target.value)}
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

export default AddDistrict;
