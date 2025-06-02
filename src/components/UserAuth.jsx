import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function UserAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export default UserAuth;
