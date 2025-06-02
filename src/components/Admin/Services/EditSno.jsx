import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  addSnoLevel1ServicesProducts,
  getSnoLevel1ServicesProducts,
  getSnoLevel2ServicesProducts,
  addSnoLevel2ServicesProducts,
  getSnoLevel3ServicesProducts,
  addSnoLevel3ServicesProducts,
} from "@/firebase/firestore/sno";
function EditSno({
  beforeprevious = null,
  previous = null,
  open,
  setOpen,
  type,
}) {
  const [sno, setSno] = useState();
  const [newSno, setNewSno] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewSno([]);
  };

  const handleSno = (e, id) => {
    const existingIndex = newSno.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      setNewSno((prevNewSno) => [
        ...prevNewSno.slice(0, existingIndex),
        { id, sno: e.target.value },
        ...prevNewSno.slice(existingIndex + 1),
      ]);
    } else {
      setNewSno((prevNewSno) => [...prevNewSno, { id, sno: e.target.value }]);
    }
  };

  const handleSubmit = async () => {
    if (beforeprevious != null) {
      await addSnoLevel3ServicesProducts(
        beforeprevious,
        previous,
        type,
        newSno
      );
    } else if (previous != null) {
      await addSnoLevel2ServicesProducts(previous, type, newSno);
    } else {
      await addSnoLevel1ServicesProducts(type, newSno);
    }
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      let data;
      if (beforeprevious != null) {
        data = await getSnoLevel3ServicesProducts(
          beforeprevious,
          previous,
          type
        );
      } else if (previous != null) {
        data = await getSnoLevel2ServicesProducts(previous, type);
      } else {
        data = await getSnoLevel1ServicesProducts(type);
      }
      setSno(data);
    };
    fetch();
  }, [open]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Edit Order
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className=" mx-auto w-full h-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Edit the Order of Services
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              {sno &&
                sno.map((doc, index) => (
                  <div className="flex justify-evenly my-2" key={index}>
                    <div>
                      <input
                        type="number"
                        className="border-kaavi border-2 p-2 w-1/3 text-2xl"
                        defaultValue={doc.sno}
                        onChange={(e) => handleSno(e, doc.id)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="border-kaavi border-2 p-2 pl-4 w-2/3"
                        value={doc.name}
                      />
                    </div>
                  </div>
                ))}
              <button
                className="p-3 text-white bg-kaavi rounded-lg w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditSno;
