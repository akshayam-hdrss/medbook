"use client";
import ExecutiveGaurd from "@/components/Executive/ExecutiveGaurd";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getExecutive } from "@/firebase/firestore/user";

function executiveLayout({ children }) {
  const [executive, setExecutive] = useState();
  const [execData, setExecData] = useState();
 
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const data = await getExecutive(userId);
        setExecData(data);
        if (data && data.data?.execstatus === "active") {
          setExecutive(user);
        } else {
          setExecutive(null);
        }
      } else {
        setExecutive(null);
      }
    });
  }, []);

  if (!executive) return <ExecutiveGaurd />;
   const childrenWithProps = React.Children.map(children, (child) => {
     return React.cloneElement(child, { execData });
   });
  return <div>{childrenWithProps}</div>;
}

export default executiveLayout;
